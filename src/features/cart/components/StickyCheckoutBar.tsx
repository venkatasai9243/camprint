"use client";
import React from 'react';
import { Button } from '@/design-system/components/buttons/Button/Button';

interface StickyCheckoutBarProps {
  total: number;
  itemCount: number;
  onCheckout: () => void;
  disabled?: boolean;
}

export const StickyCheckoutBar = ({ total, itemCount, onCheckout, disabled }: StickyCheckoutBarProps) => {
  return (
    <div className="fixed bottom-[72px] left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-background border-t border-border shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-40 p-4">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground font-medium">{itemCount} {itemCount === 1 ? 'Item' : 'Items'}</span>
          <span className="text-2xl font-black text-foreground leading-tight">₹{total.toFixed(2)}</span>
        </div>
        
        <Button 
          onClick={onCheckout}
          className={`px-8 py-4 bg-primary text-primary-foreground font-bold rounded-xl ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary/90 shadow-md hover:shadow-lg'}`}
        >
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
};
