import { api } from "./api";

export type WorkOrder = {
  id: string;
  title: string;
  description: string;
  status: "Pending" | "In Progress" | "Completed";
  assignedTo: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  completed: boolean;
  deleted: boolean;
};

export const getWorkOrders = async (): Promise<WorkOrder[]> => {
  const { data } = await api.get<WorkOrder[]>("/work-orders");
  return data;
};

export const getWorkOrder = async (id: string): Promise<WorkOrder> => {
  const { data } = await api.get<WorkOrder>(`/work-orders/${id}`);
  return data;
};

export const createWorkOrder = async (
  order: Omit<
    WorkOrder,
    "id" | "status" | "createdAt" | "updatedAt" | "completed" | "deleted"
  >,
): Promise<WorkOrder> => {
  const { data } = await api.post<WorkOrder>("/work-orders", order);
  return data;
};

export const updateWorkOrder = async (
  id: string,
  order: Partial<WorkOrder>,
): Promise<WorkOrder> => {
  const { data } = await api.put<WorkOrder>(`/work-orders/${id}`, order);
  return data;
};

export const deleteWorkOrder = async (id: string): Promise<void> => {
  await api.delete(`/work-orders/${id}`);
};

export const syncWorkOrders = async (since: string) => {
  const { data } = await api.get(`/work-orders/sync`, { params: { since } });
  return data;
};
