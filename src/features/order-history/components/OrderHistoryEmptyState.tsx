// src/features/order-history/components/OrderHistoryEmptyState.tsx
import React from 'react';
import { PackageSearch } from 'lucide-react';
import { Button } from '@/design-system/components/buttons/Button/Button';
import { useRouter } from 'next/navigation';
import { APP_ROUTES } from '@/constants/routes';

export const OrderHistoryEmptyState = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center min-h-[60vh]">
      <div className="w-24 h-24 rounded-full bg-primary/5 flex items-center justify-center mb-6 text-primary">
        <PackageSearch className="w-12 h-12" />
      </div>
      <h3 className="text-2xl font-bold text-foreground mb-2">No Orders Yet</h3>
      <p className="text-sm text-muted-foreground mb-8 max-w-[280px]">
        You haven&apos;t placed any printing orders with Blintzy yet. Your complete order history will appear here.
      </p>
      <Button 
        onClick={() => router.push(APP_ROUTES.HOME)} 
        className="w-full max-w-[240px] bg-primary text-primary-foreground font-bold rounded-xl py-4 shadow-md hover:shadow-lg transition-all hover:scale-[1.02]"
      >
        Start Printing
      </Button>
    </div>
  );
};
