// src/features/order-history/components/OrderActionsMenu.tsx
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { MoreVertical, Download, Share2, HelpCircle, Check, AlertCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface OrderActionsMenuProps {
  orderId: string;
  onDownloadInvoice: () => void;
}

export const OrderActionsMenu = ({ orderId, onDownloadInvoice }: OrderActionsMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'loading' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'loading', duration = 3000) => {
    setToast({ message, type });
    if (type !== 'loading') {
      setTimeout(() => setToast(null), duration);
    }
  };

  const handleDownload = async () => {
    setIsOpen(false);
    showToast('Generating PDF...', 'loading');
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In a real app, this would trigger a file download.
    // For now, we simulate success.
    try {
      showToast('✓ Invoice Downloaded', 'success');
      // If we wanted to actually call the parent:
      // onDownloadInvoice();
    } catch (e) {
      showToast('Unable to download invoice. Please try again.', 'error');
    }
  };

  const handleShare = async () => {
    setIsOpen(false);
    
    const shareData = {
      title: 'BLINTZY Order Details',
      text: `Order ID: ${orderId}\nStatus: Printing\nETA: Today • 4:30 PM\nBLINTZY Campus Printing`,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        // Native share handles its own UI, but we can still toast
        showToast('✓ Order Shared', 'success');
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(shareData.text);
        showToast('✓ Copied Successfully', 'success');
      }
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        showToast('Unable to share order. Please try again.', 'error');
      }
    }
  };

  const handleSupport = () => {
    setIsOpen(false);
    // Ideally this opens the same support bottom sheet, 
    // but for now we just show a toast as it's a placeholder.
    showToast('Opening support ticket...', 'loading');
    setTimeout(() => showToast('✓ Support request received', 'success'), 1000);
  };

  return (
    <>
      <button 
        onClick={(e) => { e.stopPropagation(); setIsOpen(true); }}
        className="w-10 h-10 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900 active:scale-95 transition-all shrink-0"
      >
        <MoreVertical className="w-5 h-5" strokeWidth={1.5} />
      </button>

      {/* Global Toast Overlay */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {toast && (
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="fixed bottom-safe left-0 right-0 z-[200] flex justify-center mb-6 px-4 pointer-events-none"
            >
              <div className="bg-gray-900 text-white px-5 py-3.5 rounded-[16px] shadow-2xl flex items-center gap-3">
                {toast.type === 'loading' && <Loader2 className="w-5 h-5 animate-spin text-orange-500" />}
                {toast.type === 'success' && <Check className="w-5 h-5 text-green-400" />}
                {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-red-400" />}
                <span className="font-semibold text-[15px]">{toast.message}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Dim Overlay */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-[2px]"
              />
              
              {/* Bottom Sheet Container */}
              <div className="fixed inset-0 z-[101] pointer-events-none flex justify-center items-end sm:items-center sm:p-4">
                <motion.div
                  drag="y"
                  dragConstraints={{ top: 0, bottom: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(_, info) => {
                    if (info.offset.y > 100 || info.velocity.y > 500) {
                      setIsOpen(false);
                    }
                  }}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                  className="w-full max-w-sm bg-white rounded-t-[32px] sm:rounded-[32px] shadow-2xl pointer-events-auto flex flex-col overflow-hidden pb-safe"
                  onClick={e => e.stopPropagation()} // prevent clicking card underneath
                >
                  {/* Drag Handle */}
                  <div className="w-full flex justify-center pt-4 pb-2">
                    <div className="w-12 h-1.5 bg-gray-200 rounded-full" />
                  </div>
                  
                  <div className="flex flex-col gap-1 px-4 pb-6 pt-2">
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleDownload(); }}
                      className="w-full flex items-center gap-4 p-4 min-h-[64px] rounded-2xl hover:bg-gray-50 active:scale-[0.98] transition-all text-left group"
                    >
                      <div className="w-12 h-12 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0">
                        <Download className="w-5 h-5 text-orange-500" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[16px] font-bold text-gray-900">Download Invoice</span>
                        <span className="text-[13px] font-medium text-gray-500">Get a PDF copy</span>
                      </div>
                    </button>
                    
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleShare(); }}
                      className="w-full flex items-center gap-4 p-4 min-h-[64px] rounded-2xl hover:bg-gray-50 active:scale-[0.98] transition-all text-left group"
                    >
                      <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                        <Share2 className="w-5 h-5 text-blue-500" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[16px] font-bold text-gray-900">Share Details</span>
                        <span className="text-[13px] font-medium text-gray-500">Send via WhatsApp</span>
                      </div>
                    </button>
                    
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleSupport(); }}
                      className="w-full flex items-center gap-4 p-4 min-h-[64px] rounded-2xl hover:bg-gray-50 active:scale-[0.98] transition-all text-left group"
                    >
                      <div className="w-12 h-12 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                        <HelpCircle className="w-5 h-5 text-gray-500" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[16px] font-bold text-gray-900">Report Issue</span>
                        <span className="text-[13px] font-medium text-gray-500">Need help with this order?</span>
                      </div>
                    </button>
                  </div>
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};
