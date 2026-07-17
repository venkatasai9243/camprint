import { Order } from '../types';

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-8923-4412',
    userId: 'user-123',
    status: 'printing',
    createdAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    updatedAt: new Date(Date.now() - 1800000).toISOString(), // 30 mins ago
    items: [
      {
        id: 'item-1',
        orderId: 'ORD-8923-4412',
        printConfig: {
          documentName: 'Data Structures Lab Manual',
          manualName: 'CS-301 DSA Lab',
          copies: 1,
          pages: 120,
          paperSize: 'a4',
          color: false,
          bindingType: 'spiral',
          singleSided: false,
          studentNotes: 'Please make sure binding is strong'
        },
        price: 240
      }
    ],
    deliveryInfo: {
      deliveryType: 'classroom',
      classroom: 'CS-302',
      department: 'Computer Science',
      building: 'Block A',
      floor: '3rd Floor',
      roomNumber: '302',
      estimatedArrival: new Date(Date.now() + 7200000).toISOString(), // 2 hours from now
      deliveryInstructions: 'Call me when you reach the building'
    },
    summary: {
      printingCost: 180,
      bindingCost: 50,
      paperCost: 0,
      colorCost: 0,
      platformFee: 10,
      gst: 43.2, // 18% of 240
      discount: 0,
      grandTotal: 283.2
    },
    timeline: [
      {
        eventId: 'evt-1',
        status: 'received',
        title: 'Order Received',
        description: 'We have received your order.',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        updatedBy: 'system',
        isCurrentStage: false
      },
      {
        eventId: 'evt-2',
        status: 'accepted',
        title: 'Order Accepted',
        description: 'Vendor has accepted the order and will start processing soon.',
        timestamp: new Date(Date.now() - 3000000).toISOString(),
        updatedBy: 'vendor',
        isCurrentStage: false
      },
      {
        eventId: 'evt-3',
        status: 'printing',
        title: 'Printing in Progress',
        description: 'Your document is currently being printed.',
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        updatedBy: 'vendor',
        isCurrentStage: true,
        estimatedCompletion: new Date(Date.now() + 1800000).toISOString()
      },
      {
        eventId: 'evt-4',
        status: 'binding',
        title: 'Binding',
        description: 'Your document will be bound next.',
        timestamp: '',
        updatedBy: 'system',
        isCurrentStage: false
      },
      {
        eventId: 'evt-5',
        status: 'quality_check',
        title: 'Quality Check',
        description: 'Checking for any print errors.',
        timestamp: '',
        updatedBy: 'system',
        isCurrentStage: false
      },
      {
        eventId: 'evt-6',
        status: 'packed',
        title: 'Packed & Ready',
        description: 'Your order is packed and ready for delivery.',
        timestamp: '',
        updatedBy: 'system',
        isCurrentStage: false
      },
      {
        eventId: 'evt-7',
        status: 'out_for_delivery',
        title: 'Out for Delivery',
        description: 'Delivery executive is on the way.',
        timestamp: '',
        updatedBy: 'system',
        isCurrentStage: false
      },
      {
        eventId: 'evt-8',
        status: 'delivered',
        title: 'Delivered',
        description: 'Enjoy your prints!',
        timestamp: '',
        updatedBy: 'system',
        isCurrentStage: false
      }
    ]
  }
];
