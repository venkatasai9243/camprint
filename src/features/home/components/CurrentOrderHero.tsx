"use client";
import React from 'react';
import { CurrentOrder } from '../types';
import { OrderProgressTimeline } from './OrderProgressTimeline';
import { Button } from '@/design-system/components/buttons/Button/Button';
import { WidgetEmptyState } from './HomeEmptyState';

interface CurrentOrderHeroProps {
  order: CurrentOrder | null;
  onTrackOrder?: (id: string) => void;
}

export const CurrentOrderHero = ({ order, onTrackOrder }: CurrentOrderHeroProps) => {
  if (!order) {
    return (
      <WidgetEmptyState
        title="No Active Orders"
        description="Your print queue is empty."
        actionLabel="Start Your First Print"
      />
    );
  }

  return (
    <div className="w-full bg-card border border-border rounded-xl p-5 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{order.id}</span>
          <h3 className="text-lg font-bold text-foreground leading-tight mt-1">{order.documentName}</h3>
        </div>
        <div className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full flex-shrink-0 whitespace-nowrap">
          {order.status.replace(/([A-Z])/g, ' ').trim()}
        </div>
      </div>

      <OrderProgressTimeline status={order.status} progress={order.progress} />

      <div className="flex justify-between items-center mt-4 pt-4 border-t border-border">
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground">Estimated Arrival</span>
          <span className="text-sm font-semibold">{order.estimatedDeliveryTime || 'Calculating...'}</span>
        </div>
        <Button
          onClick={() => onTrackOrder?.(order.id)}
          className="px-6 py-2 bg-primary text-primary-foreground font-medium rounded-lg text-sm hover:bg-primary/90"
        >
          Track Order
        </Button>
      </div>

      {/* Future feature placeholders for QR, Delivery Person, etc. will integrate here */}
    </div>
  );
};

