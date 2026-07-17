import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/design-system/components/buttons/Button/Button';

interface OrderErrorStateProps {
  error: Error;
  onRetry: () => void;
}

export const OrderErrorState = ({ error, onRetry }: OrderErrorStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-6">
        <AlertCircle className="w-8 h-8 text-red-500" />
      </div>
      <h3 className="text-xl font-bold mb-2 text-foreground">Something went wrong</h3>
      <p className="text-muted-foreground mb-8 max-w-sm">
        {error.message || 'We encountered an error while fetching your order details.'}
      </p>
      <Button onClick={onRetry} className="min-w-[120px] bg-transparent border border-border text-foreground hover:bg-muted">
        Try Again
      </Button>
    </div>
  );
};
