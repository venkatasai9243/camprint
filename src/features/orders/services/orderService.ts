import { Order, OrderStatus } from '../types';
import { ordersApi } from '../api/ordersApi';

export const orderService = {
  getOrders: async (): Promise<Order[]> => {
    return await ordersApi.getOrders();
  },

  getOrderById: async (id: string): Promise<Order> => {
    return await ordersApi.getOrderById(id);
  },

  cancelOrder: async (id: string): Promise<{ status: OrderStatus }> => {
    return await ordersApi.cancelOrder(id);
  }
};
