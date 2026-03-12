import { create } from "zustand";
import { Order } from "../models/Order";

interface OrdersState {
  orders: Order[];
  setOrders: (orders: Order[]) => void;
  addOrder: (order: Order) => void;
  updateOrder: (order: Order) => void;
  deleteOrder: (id: string) => void;
}

export const useOrdersStore = create<OrdersState>((set) => ({
  orders: [],
  setOrders: (orders: Order[]) => set({ orders }),
  addOrder: (order: Order) =>
    set((state) => ({ orders: [...state.orders, order] })),
  updateOrder: (order: Order) =>
    set((state) => ({
      orders: state.orders.map((o: Order) => (o.id === order.id ? order : o)),
    })),
  deleteOrder: (id: string) =>
    set((state) => ({
      orders: state.orders.filter((o: Order) => o.id !== id),
    })),
}));
