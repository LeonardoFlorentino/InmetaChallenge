import { getRealm } from "../realm";
import {
	getWorkOrders,
	createWorkOrder,
	updateWorkOrder,
	deleteWorkOrder,
	syncWorkOrders,
	WorkOrder,
} from "../workOrderService";
import { useSyncStore } from "../../store/syncStore";
import { resolveOrderConflict } from "../../utils/conflict";

// Função para buscar ordens locais
export const getLocalOrders = async (): Promise<WorkOrder[]> => {
	const realm = await getRealm();
	const orders = realm.objects<WorkOrder>("Order");
	return Array.from(orders) as WorkOrder[];
};

// Função para salvar ordens localmente
import { BSON, UpdateMode } from "realm";

export const saveLocalOrders = async (orders: WorkOrder[]) => {
	const realm = await getRealm();
	realm.write(() => {
		orders.forEach((order) => {
			// Buscar registro existente pelo id
			const existing = realm.objects("Order").filtered("id == $0", order.id)[0];
			const _id: BSON.ObjectId = (existing && existing._id instanceof BSON.ObjectId)
				? existing._id
				: new BSON.ObjectId();
			realm.create(
				"Order",
				{ ...order, _id } as any,
				UpdateMode.Modified
			);
		});
	});
};

// Função principal de sincronização offline-first
export const syncOrders = async () => {
	const { lastSync, setLastSync, setSyncing } = useSyncStore.getState();
	setSyncing(true);
	try {
		// 1. Buscar ordens locais modificadas desde o último sync
		const localOrders = await getLocalOrders();
		const changedLocally = localOrders.filter(
			(o) => !o.synced || (lastSync && o.updatedAt > lastSync)
		);

		// 2. Enviar alterações locais para o servidor
		for (const order of changedLocally) {
			if (order.deleted) {
				await deleteWorkOrder(order.id);
			} else if (!order.synced) {
				await createWorkOrder(order);
			} else {
				await updateWorkOrder(order.id, order);
			}
			// Marcar como sincronizado localmente
			const realm = await getRealm();
			realm.write(() => {
				// Buscar registro existente pelo id
				const existing = realm.objects("Order").filtered("id == $0", order.id)[0];
				const _id: BSON.ObjectId = (existing && existing._id instanceof BSON.ObjectId)
					? existing._id
					: new BSON.ObjectId();
				realm.create(
					"Order",
					{ ...order, synced: true, _id } as any,
					UpdateMode.Modified
				);
			});
		}

		// 3. Buscar alterações do servidor desde o último sync
		const remoteOrders = await syncWorkOrders(lastSync || "");

		// Resolver conflitos entre ordens locais e remotas
		const localOrdersMap = new Map(localOrders.map((o) => [o.id, o]));
		const mergedOrders: WorkOrder[] = remoteOrders.map((remote) => {
			const local = localOrdersMap.get(remote.id);
			if (local) {
				return resolveOrderConflict(local, remote);
			}
			return remote;
		});
		// Adicionar ordens locais que não existem remotamente
		localOrders.forEach((local) => {
			if (!remoteOrders.find((r) => r.id === local.id)) {
				mergedOrders.push(local);
			}
		});
		await saveLocalOrders(mergedOrders);

		// 4. Atualizar data do último sync
		setLastSync(new Date().toISOString());
	} catch (e) {
		// Tratar erro de sync
		console.error("Sync error", e);
	} finally {
		setSyncing(false);
	}
};
