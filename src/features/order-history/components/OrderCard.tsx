// src/features/order-history/components/OrderCard.tsx
import React from 'react';
import { useRouter } from 'next/navigation';
import { Package, FileText, ChevronRight } from 'lucide-react';
import { OrderHistoryItem } from '../types';
import { formatHistoryDate, formatHistoryCurrency } from '../utils/formatters';
import { OrderStatusBadge } from './OrderStatusBadge';
import { ReorderButton } from './ReorderButton';
import { OrderActionsMenu } from './OrderActionsMenu';
import { APP_ROUTES } from '@/constants/routes';

interface OrderCardProps {
  order: OrderHistoryItem;
}

export const OrderCard = ({ order }: OrderCardProps) => {
  const router = useRouter();

  const handleCardClick = () => {
    // If it's active, go to active tracking. If history, go to history details (using active route for simplicity based on CTO instructions to maintain tracking view)
    router.push(APP_ROUTES.ORDERS.DETAILS(order.id));
  };

  return (
    <div 
      onClick={handleCardClick}
      className="bg-card border border-border rounded-2xl p-4 shadow-sm hover:border-primary/50 transition-all cursor-pointer flex flex-col gap-3 group"
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <Package className="w-5 h-5 text-primary" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-foreground">{order.id}</span>
            <span className="text-xs text-muted-foreground">{formatHistoryDate(order.createdAt)}</span>
          </div>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      <div className="flex flex-col gap-2 mt-1">
        {order.documentNames.map((name, i) => (
          <div key={i} className="flex items-start gap-2 text-sm text-foreground/90">
            <FileText className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
            <span className="line-clamp-1">{name}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-end border-t border-border/50 pt-3 mt-1">
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Total</span>
          <span className="font-bold text-foreground">{formatHistoryCurrency(order.totalAmount)}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <ReorderButton orderId={order.id} variant="icon" />
          <OrderActionsMenu 
            orderId={order.id} 
            onDownloadInvoice={() => router.push(`/app/orders/history/invoice/${order.id}`)} 
          />
          <div className="text-primary text-sm font-semibold flex items-center gap-0.5 group-hover:translate-x-1 transition-transform ml-1">
            Details
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};
