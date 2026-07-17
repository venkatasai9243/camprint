import { TrackingStatus } from '../types';
import { MOCK_ORDERS } from '../mock/mockOrders';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const trackingApi = {
  getTrackingStatus: async (orderId: string): Promise<TrackingStatus> => {
    await delay(400);
    const order = MOCK_ORDERS.find(o => o.id === orderId);
    if (!order) throw new Error('Order not found');
    
    return {
      orderId: order.id,
      currentStatus: order.status,
      estimatedDeliveryDate: order.deliveryInfo.estimatedArrival || new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    };
  }
};
