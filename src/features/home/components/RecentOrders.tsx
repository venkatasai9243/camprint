"use client";
import React from 'react';
import { CurrentOrder } from '../types';
import { Button } from '@/design-system/components/buttons/Button/Button';

interface RecentOrdersProps {
  orders: CurrentOrder[];
}

export const RecentOrders = ({ orders }: RecentOrdersProps) => {
  if (!orders || orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-card border border-border border-dashed rounded-xl text-center gap-3">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>
        </div>
        <p className="font-semibold text-foreground">No orders yet</p>
        <p className="text-sm text-muted-foreground max-w-[200px]">Start your first print to see your history here.</p>
        <Button className="mt-2" onClick={() => window.location.href = '/app/services'}>Explore Services</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {orders.map((order) => (
        <div key={order.id} className="flex justify-between items-center p-4 bg-card border border-border rounded-xl shadow-sm">
          <div className="flex flex-col gap-1">
            <span className="font-medium text-sm text-foreground">{order.documentName}</span>
            <span className="text-xs text-muted-foreground">{new Date(order.date).toLocaleDateString()}</span>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="font-semibold text-sm">$</span>
            <span className="text-[10px] uppercase px-2 py-0.5 bg-secondary text-secondary-foreground rounded-full">
              {order.status.replace(/([A-Z])/g, ' ').trim()}
            </span>
          </div>
        </div>
      ))}
      <Button  className="w-full mt-2">View All History</Button>
    </div>
  );
};


