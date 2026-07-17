// src/features/order-history/services/mockHistory.ts
import { OrderHistoryItem, Invoice } from '../types';
import { OrderStatus } from '@/features/orders/types';
import { generateInvoiceNumber } from '../utils/formatters';

const generateMockOrders = (count: number): OrderHistoryItem[] => {
  const statuses: OrderStatus[] = ['delivered', 'cancelled', 'refunded', 'pending', 'printing', 'binding', 'ready_for_pickup'];
  const subjects = ['Software Engineering', 'Data Structures', 'Operating Systems', 'Computer Networks', 'Machine Learning'];
  const types = ['Lab Manual', 'Notes', 'Assignment', 'Project Report'];

  return Array.from({ length: count }).map(() => {
    const id = `ORD-${Math.floor(Math.random() * 10000)}-${Math.floor(Math.random() * 10000)}`;
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 180)); // past 6 months
    
    const docNames = [
      `${subjects[Math.floor(Math.random() * subjects.length)]} ${types[Math.floor(Math.random() * types.length)]}`
    ];
    if (Math.random() > 0.7) {
      docNames.push(`${subjects[Math.floor(Math.random() * subjects.length)]} ${types[Math.floor(Math.random() * types.length)]}`);
    }

    const status = statuses[Math.floor(Math.random() * statuses.length)];

    return {
      id,
      documentNames: docNames,
      createdAt: date.toISOString(),
      status,
      totalCopies: Math.floor(Math.random() * 5) + 1,
      totalPages: Math.floor(Math.random() * 200) + 10,
      totalAmount: Math.floor(Math.random() * 500) + 50,
      deliveryDate: status === 'delivered' ? new Date(date.getTime() + 86400000 * 2).toISOString() : undefined,
    };
  }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

export const MOCK_HISTORY_ORDERS = generateMockOrders(45);

export const getMockInvoice = (orderId: string): Invoice => {
  const order = MOCK_HISTORY_ORDERS.find(o => o.id === orderId) || MOCK_HISTORY_ORDERS[0];
  
  return {
    invoiceNumber: generateInvoiceNumber(order.id),
    orderId: order.id,
    date: order.createdAt,
    studentName: 'Rahul Sharma',
    rollNumber: '21CS1045',
    department: 'Computer Science',
    items: order.documentNames.map((name, i) => ({
      id: `ITEM-${i + 1}`,
      documentName: name,
      pages: Math.floor(order.totalPages / order.documentNames.length),
      copies: order.totalCopies,
      price: (order.totalAmount * 0.8) / order.documentNames.length,
    })),
    printConfigSummary: 'A4 • Black & White • Spiral Binding',
    subtotal: order.totalAmount * 0.8,
    platformFee: 15,
    gst: order.totalAmount * 0.18,
    grandTotal: order.totalAmount,
    paymentStatus: order.status === 'cancelled' || order.status === 'rejected' ? 'refunded' : 'paid',
  };
};
