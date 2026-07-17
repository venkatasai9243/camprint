import { Order, OrderStatus } from '../types';
import { MOCK_ORDERS } from '../mock/mockOrders';

// Simulated latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const ordersApi = {
  getOrders: async (): Promise<Order[]> => {
    await delay(600);
    return MOCK_ORDERS;
  },
  
  getOrderById: async (id: string): Promise<Order> => {
    await delay(600);
    const order = MOCK_ORDERS.find(o => o.id === id);
    if (!order) {
      throw new Error('Order not found');
    }
    return order;
  },

  cancelOrder: async (id: string): Promise<{ status: OrderStatus }> => {
    await delay(800);
    const orderIndex = MOCK_ORDERS.findIndex(o => o.id === id);
    if (orderIndex === -1) {
      throw new Error('Order not found');
    }
    // Note: Since this is mock data and we want it to persist across calls during development,
    // we actually mutate the mock data array here.
    MOCK_ORDERS[orderIndex].status = 'cancelled';
    return { status: 'cancelled' };
  }
};
