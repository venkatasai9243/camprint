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
      // For V2.2 prototype: synthetically generate an order so track order screen doesn't crash on history items
      return {
        id: 'ORD-2236-3159',
        userId: 'user-123',
        status: 'printing',
        createdAt: '2026-07-29T10:00:00.000Z',
        updatedAt: new Date(Date.now() - 1800000).toISOString(),
        items: [
          {
            id: 'item-1',
            orderId: 'ORD-2236-3159',
            printConfig: {
              documentName: 'Computer Networks Lab Manual',
              manualName: 'CS-401 CN Lab',
              copies: 1,
              pages: 100,
              paperSize: 'a4',
              color: false,
              bindingType: 'spiral',
              singleSided: false,
              studentNotes: 'Please make sure binding is strong'
            },
            price: 180
          }
        ],
        deliveryInfo: {
          deliveryType: 'classroom',
          classroom: 'CS-302',
          department: 'Computer Science',
          building: 'Block A',
          floor: '3rd Floor',
          roomNumber: '302',
          estimatedArrival: new Date(Date.now() + 7200000).toISOString(),
          deliveryInstructions: 'Call me when you reach the building'
        },
        summary: {
          printingCost: 100,
          bindingCost: 35,
          paperCost: 0,
          colorCost: 0,
          platformFee: 10,
          gst: 35,
          discount: 0,
          grandTotal: 180
        },
        timeline: []
      };
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
