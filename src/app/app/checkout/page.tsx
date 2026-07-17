"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { APP_ROUTES } from '@/constants/routes';
import { useCart } from '@/features/cart/providers/CartProvider';
import { CheckoutProvider, useCheckout } from '@/features/checkout/providers/CheckoutProvider';
import { usePlaceOrder } from '@/features/checkout/hooks/usePlaceOrder';
import { CheckoutHeader } from '@/features/checkout/components/CheckoutHeader';
import { DeliveryCard } from '@/features/checkout/components/DeliveryCard';
import { PaymentMethodCard } from '@/features/checkout/components/PaymentMethodCard';
import { OrderNotesCard } from '@/features/checkout/components/OrderNotesCard';
import { CouponCard } from '@/features/checkout/components/CouponCard';
import { OrderSummaryCard } from '@/features/checkout/components/OrderSummaryCard';
import { TermsCard } from '@/features/checkout/components/TermsCard';
import { StickyCheckoutBar } from '@/features/checkout/components/StickyCheckoutBar';
import { SuccessAnimation } from '@/features/checkout/components/SuccessAnimation';
import { BottomSheet } from '@/design-system/components/feedback/BottomSheet/BottomSheet';

const CheckoutPageContent = () => {
  const router = useRouter();
  const { cart } = useCart();
  const { state, setDeliveryDetails, setPaymentMethodId, setCouponCode, setStudentNotes, setTermsAccepted, isValid, clearSession } = useCheckout();
  const { placeOrder, isPlacingOrder, error: orderError } = usePlaceOrder();
  
  const [successOrderId, setSuccessOrderId] = React.useState<string | null>(null);

  // If cart is empty, redirect back to cart
  useEffect(() => {
    if (!cart || cart.items.length === 0) {
      router.replace(APP_ROUTES.CART);
    }
  }, [cart, router]);

  const handlePlaceOrder = async () => {
    if (!cart) return;
    
    const response = await placeOrder({
      cartId: cart.cartId,
      checkoutState: state,
      idempotencyKey: Math.random().toString(36).substring(7)
    }, cart.summary.total);

    if (response.success && response.orderId) {
      clearSession();
      setSuccessOrderId(response.orderId);
    }
  };

  if (!cart || cart.items.length === 0) {
    return <div className="p-8 text-center text-muted-foreground">Cart is empty...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background relative">
      <CheckoutHeader />

      <main className="flex-1 flex flex-col gap-6 p-4 max-w-4xl mx-auto w-full pb-40">
        <DeliveryCard 
          details={state.deliveryDetails} 
          onUpdate={setDeliveryDetails} 
        />
        
        <PaymentMethodCard 
          selectedId={state.paymentMethodId}
          onSelect={setPaymentMethodId}
        />
        
        <OrderNotesCard 
          notes={state.studentNotes}
          onChange={setStudentNotes}
        />
        
        <CouponCard 
          appliedCode={state.couponCode}
          onApply={setCouponCode}
          onRemove={() => setCouponCode(null)}
        />
        
        <OrderSummaryCard cart={cart} />
        
        <TermsCard 
          accepted={state.termsAccepted}
          onToggle={setTermsAccepted}
        />
      </main>

      <StickyCheckoutBar 
        total={cart.summary.total}
        isValid={isValid}
        isPlacingOrder={isPlacingOrder}
        onPlaceOrder={handlePlaceOrder}
      />

      {successOrderId && (
        <SuccessAnimation 
          orderId={successOrderId}
          onTrack={() => {
            router.push(APP_ROUTES.ORDERS.DETAILS(successOrderId));
          }}
          onContinue={() => router.push(APP_ROUTES.HOME)}
        />
      )}

      {/* Error Bottom Sheet */}
      {orderError && (
        <div className="fixed inset-0 z-50 bg-background/50 flex items-end">
          <BottomSheet className="w-full bg-card rounded-t-3xl p-6 min-h-[200px] flex flex-col justify-center items-center gap-4 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] border-t border-border">
            <h3 className="text-xl font-bold text-destructive">Checkout Failed</h3>
            <p className="text-muted-foreground text-center max-w-xs">{orderError}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
            >
              Try Again
            </button>
          </BottomSheet>
        </div>
      )}
    </div>
  );
};

export default function CheckoutPage() {
  return (
    <CheckoutProvider>
      <CheckoutPageContent />
    </CheckoutProvider>
  );
}
