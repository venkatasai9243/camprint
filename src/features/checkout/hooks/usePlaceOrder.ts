// src/features/checkout/hooks/usePlaceOrder.ts

import { useState, useRef } from 'react';
import { PlaceOrderRequest, CheckoutResponse, PaymentStatus } from '../types';
import { useCheckoutAnalytics } from './useCheckoutAnalytics';

import { MOCK_ORDERS } from '@/features/orders/mock/mockOrders';
import { Order } from '@/features/orders/types';

import { generateOrderId } from '@/features/orders/utils/sequence';
import { useStudent } from '@/features/student/providers/StudentProvider';

export const usePlaceOrder = () => {
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { academicRecord } = useStudent();

  // Idempotency: Prevent duplicate submissions
  const isRequestInFlight = useRef(false);
  const { trackOrderPlaced, trackCheckoutFailed } = useCheckoutAnalytics();

  const placeOrder = async (request: PlaceOrderRequest, totalValue: number): Promise<CheckoutResponse> => {
    if (isRequestInFlight.current) {
      return { success: false, errorMessage: 'Order is already being processed.' };
    }
    
    isRequestInFlight.current = true;
    setIsPlacingOrder(true);
    setError(null);

    try {
      // Mock backend API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const admissionYear = academicRecord?.admission_year || academicRecord?.roll_number?.substring(0, 2) || new Date().getFullYear().toString();
      const branchId = academicRecord?.branches?.code || '00';
      const orderId = generateOrderId(admissionYear, branchId);
      
      const response: CheckoutResponse = {
        success: true,
        orderId,
        trackingId: 'TRK-' + Math.random().toString(36).substring(2, 9).toUpperCase(),
        estimatedDelivery: request.checkoutState.deliveryDetails?.estimatedTime,
        paymentStatus: request.checkoutState.paymentMethodId === 'pm_cod_1' ? PaymentStatus.PENDING : PaymentStatus.PAID,
      };
      
      // Mutate MOCK_ORDERS so it appears in the Orders tab
      const newOrder: Order = {
        id: orderId,
        userId: 'user-123',
        status: 'printing',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        items: [], // Would normally be mapped from cart
        deliveryInfo: {
          deliveryType: 'classroom',
          classroom: 'Pending',
          department: 'Pending',
          building: 'Pending',
          floor: 'Pending',
          roomNumber: 'Pending',
          estimatedArrival: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          deliveryInstructions: request.checkoutState.studentNotes || ''
        },
        summary: {
          printingCost: 0,
          bindingCost: 0,
          paperCost: 0,
          colorCost: 0,
          platformFee: 0,
          gst: 0,
          discount: 0,
          grandTotal: totalValue
        },
        timeline: []
      };
      MOCK_ORDERS.unshift(newOrder);

      trackOrderPlaced(response.orderId!, totalValue);
      return response;

    } catch (err) {
      const errorMessage = 'Network error while placing order. Please try again.';
      setError(errorMessage);
      trackCheckoutFailed(errorMessage);
      return { success: false, errorMessage };
    } finally {
      setIsPlacingOrder(false);
      isRequestInFlight.current = false;
    }
  };

  return {
    placeOrder,
    isPlacingOrder,
    error
  };
};
