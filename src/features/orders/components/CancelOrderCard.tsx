import React, { useState } from 'react';
import { Button } from '@/design-system/components/buttons/Button/Button';
import { OrderStatus } from '../types';
import { isOrderCancellable } from '../constants/status';

interface CancelOrderCardProps {
  status: OrderStatus;
  onCancel: () => Promise<void>;
}

export const CancelOrderCard = ({ status, onCancel }: CancelOrderCardProps) => {
  const [isCancelling, setIsCancelling] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  
  const cancellable = isOrderCancellable(status);

  if (!cancellable) return null;

  const handleCancel = async () => {
    setIsCancelling(true);
    try {
      await onCancel();
    } catch (e) {
      // Handle error gracefully
    } finally {
      setIsCancelling(false);
      setShowConfirm(false);
    }
  };

  return (
    <div className="bg-card border border-red-100 rounded-2xl p-5 shadow-sm flex flex-col gap-4">
      {showConfirm ? (
        <div className="flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
          <h3 className="font-bold text-red-600">Cancel Order?</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Are you sure you want to cancel this order? This action cannot be undone.
          </p>
          <div className="flex gap-3">
            <Button 
              className="flex-1 bg-transparent border border-border text-foreground hover:bg-muted"
              onClick={() => setShowConfirm(false)}
              isDisabled={isCancelling}
            >
              No, Keep It
            </Button>
            <Button 
              className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              onClick={handleCancel}
              isLoading={isCancelling}
            >
              Yes, Cancel
            </Button>
          </div>
        </div>
      ) : (
        <Button 
          className="w-full bg-transparent border border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
          onClick={() => setShowConfirm(true)}
        >
          Cancel Order
        </Button>
      )}
    </div>
  );
};
