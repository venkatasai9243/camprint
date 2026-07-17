import { TimelineEvent } from '../types';
import { MOCK_ORDERS } from '../mock/mockOrders';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const timelineApi = {
  getTimeline: async (orderId: string): Promise<TimelineEvent[]> => {
    await delay(400);
    const order = MOCK_ORDERS.find(o => o.id === orderId);
    if (!order) throw new Error('Order not found');
    
    return order.timeline;
  }
};
