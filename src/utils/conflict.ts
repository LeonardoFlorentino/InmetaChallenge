import { WorkOrder } from "../services/workOrderService";

/**
 * Resolve conflitos entre uma ordem local e uma ordem remota.
 * Estratégia: mantém a ordem com updatedAt mais recente.
 * Pode ser expandido para merge de campos ou resolução manual.
 */
export function resolveOrderConflict(local: WorkOrder, remote: WorkOrder): WorkOrder {
	if (new Date(local.updatedAt) > new Date(remote.updatedAt)) {
		return { ...local };
	} else {
		return { ...remote };
	}
}
