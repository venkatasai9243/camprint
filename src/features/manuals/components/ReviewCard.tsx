import React from 'react';
import { Manual, PrintConfig } from '../types';
import { Button } from '@/design-system/components/buttons/Button/Button';
import { motion } from 'framer-motion';

interface ReviewCardProps {
  manual: Manual;
  config: PrintConfig;
  totalPrice: number;
  onAddToCart: () => void;
  isAddingToCart?: boolean;
}

export const ReviewCard = ({ manual, config, totalPrice, onAddToCart, isAddingToCart }: ReviewCardProps) => {
  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="bg-card rounded-2xl border border-border p-5 shadow-sm flex flex-col gap-4">
        <div className="flex flex-col gap-1 border-b border-border/50 pb-4">
          <h2 className="text-xl font-bold text-foreground leading-tight">{manual.name}</h2>
          <span className="text-sm text-muted-foreground">{manual.subjectId.toUpperCase()}</span>
        </div>

        <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm">
          <div className="flex flex-col">
            <span className="text-muted-foreground">Print Type</span>
            <span className="font-semibold text-foreground capitalize">
              {config.singleSided ? 'Single Sided' : 'Double Sided'}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground">Color Mode</span>
            <span className="font-semibold text-foreground capitalize">
              {config.color ? 'Color Print' : 'Black & White'}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground">Binding</span>
            <span className="font-semibold text-foreground capitalize">
              {config.bindingType === 'none' ? 'Stapled' : config.bindingType}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground">Copies</span>
            <span className="font-semibold text-foreground">{config.copies}x</span>
          </div>
        </div>
      </div>

      <div className="bg-primary/5 rounded-2xl p-5 flex items-center justify-between border border-primary/20">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-primary">Total Price</span>
          <span className="text-3xl font-black text-foreground">₹{totalPrice}</span>
        </div>
        <div className="text-right flex flex-col">
          <span className="text-xs text-muted-foreground">Est. Delivery</span>
          <span className="text-sm font-bold text-foreground">Today 4:00 PM</span>
        </div>
      </div>

      <Button
        onClick={onAddToCart}
        isDisabled={isAddingToCart}
        className="w-full bg-primary text-primary-foreground font-bold py-6 text-lg mt-4 shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform"
      >
        {isAddingToCart ? 'Adding to Cart...' : 'Add to Cart'}
      </Button>
    </div>
  );
};
