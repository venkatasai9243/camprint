// src/features/checkout/hooks/usePlaceOrder.ts

import { useState, useRef } from 'react';
import { PlaceOrderRequest, CheckoutResponse, PaymentStatus } from '../types';
import { useCheckoutAnalytics } from './useCheckoutAnalytics';

export const usePlaceOrder = () => {
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
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
      
      const response: CheckoutResponse = {
        success: true,
        orderId: 'ORD-8923-4412',
        trackingId: 'TRK-' + Math.random().toString(36).substring(2, 9).toUpperCase(),
        estimatedDelivery: request.checkoutState.deliveryDetails?.estimatedTime,
        paymentStatus: request.checkoutState.paymentMethodId === 'pm_cod_1' ? PaymentStatus.PENDING : PaymentStatus.PAID,
      };

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
