import React from 'react';
import { OrderStatusBadge } from './OrderStatusBadge';
import { OrderStatus } from '../types';
import { formatDate } from '../utils/formatters';

interface OrderStatusCardProps {
  status: OrderStatus;
  date: string;
}

export const OrderStatusCard = ({ status, date }: OrderStatusCardProps) => {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 shadow-sm flex flex-col gap-3">
      <div className="flex justify-between items-start">
        <h2 className="text-lg font-bold text-foreground">Order Status</h2>
        <OrderStatusBadge status={status} />
      </div>
      <div className="flex flex-col">
        <span className="text-sm text-muted-foreground">Order Placed On</span>
        <span className="font-medium text-foreground">{formatDate(date)}</span>
      </div>
    </div>
  );
};
