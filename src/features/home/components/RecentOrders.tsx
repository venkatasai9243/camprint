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
      <div className="flex flex-col items-center justify-center p-6 bg-white border border-gray-100 rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.05)] text-center">
        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-3 overflow-hidden">
          <span className="text-[52px] block translate-y-1">🖨️</span>
        </div>
        <h4 className="font-bold text-gray-900 text-[18px] mb-1">You're all caught up 🎉</h4>
        <p className="text-[13px] text-gray-500 max-w-[220px] leading-tight mb-5">Your completed print orders will appear here.</p>
        
        <hr className="w-full border-gray-100 mb-5" />
        
        <div className="flex flex-col gap-2.5 w-full">
          <button 
            className="w-full h-[52px] bg-[#FF6B00] text-white rounded-[18px] font-bold text-sm hover:scale-[0.98] transition-transform flex items-center justify-center gap-2 shadow-md shadow-orange-500/20" 
            onClick={() => window.location.href = '/app/services'}
          >
            Start Printing <span className="text-lg">→</span>
          </button>
          <button 
            className="w-full h-[52px] bg-white border border-gray-200 text-gray-900 rounded-[18px] font-bold text-sm hover:scale-[0.98] hover:bg-gray-50 transition-all flex items-center justify-center gap-2" 
            onClick={() => window.location.href = '/app/services/manuals'}
          >
            Browse Manuals <span className="text-lg">→</span>
          </button>
        </div>
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


