// src/features/order-history/components/OrderActionsMenu.tsx
import React, { useState } from 'react';
import { MoreVertical, Download, Share2, HelpCircle } from 'lucide-react';
import { BottomSheet } from '@/design-system/components/feedback/BottomSheet/BottomSheet';
import { useHistoryAnalytics } from '../hooks/useHistoryAnalytics';

interface OrderActionsMenuProps {
  orderId: string;
  onDownloadInvoice: () => void;
}

export const OrderActionsMenu = ({ orderId, onDownloadInvoice }: OrderActionsMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { trackOrderShared } = useHistoryAnalytics();

  const handleAction = (e: React.MouseEvent, action: () => void) => {
    e.stopPropagation();
    action();
    setIsOpen(false);
  };

  return (
    <>
      <button 
        onClick={(e) => { e.stopPropagation(); setIsOpen(true); }}
        className="w-8 h-8 flex items-center justify-center rounded-full text-muted-foreground hover:bg-muted transition-colors"
      >
        <MoreVertical className="w-5 h-5" />
      </button>

      {isOpen && (
        <div 
          className="fixed inset-0 z-50 bg-background/50 backdrop-blur-sm flex items-end"
          onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
        >
          <BottomSheet className="w-full bg-card rounded-t-3xl min-h-[250px] flex flex-col shadow-[0_-10px_40px_rgba(0,0,0,0.1)] border-t border-border overflow-hidden p-2">
            <div className="flex justify-center pt-2 pb-4">
              <div className="w-12 h-1 bg-border rounded-full" />
            </div>
            
            <div className="flex flex-col gap-1 px-4 pb-4">
              <button 
                onClick={(e) => handleAction(e, onDownloadInvoice)}
                className="w-full flex items-center gap-3 p-4 rounded-xl hover:bg-muted text-foreground font-medium transition-colors text-left"
              >
                <Download className="w-5 h-5 text-primary" />
                Download Invoice
              </button>
              
              <button 
                onClick={(e) => handleAction(e, () => trackOrderShared(orderId))}
                className="w-full flex items-center gap-3 p-4 rounded-xl hover:bg-muted text-foreground font-medium transition-colors text-left"
              >
                <Share2 className="w-5 h-5 text-blue-500" />
                Share Order Details
              </button>
              
              <button 
                onClick={(e) => handleAction(e, () => console.log('Support Ticket'))}
                className="w-full flex items-center gap-3 p-4 rounded-xl hover:bg-muted text-foreground font-medium transition-colors text-left"
              >
                <HelpCircle className="w-5 h-5 text-orange-500" />
                Report an Issue
              </button>
            </div>
          </BottomSheet>
        </div>
      )}
    </>
  );
};
