// src/features/order-history/components/OrderSort.tsx
import React, { useState } from 'react';
import { ArrowUpDown, Check } from 'lucide-react';
import { HISTORY_SORT_OPTIONS } from '../constants/filters';
import { useOrderHistory } from '../hooks/useOrderHistory';
import { BottomSheet } from '@/design-system/components/feedback/BottomSheet/BottomSheet';

export const OrderSort = () => {
  const { sort, setSort } = useOrderHistory();
  const [isOpen, setIsOpen] = useState(false);

  const currentLabel = HISTORY_SORT_OPTIONS.find(o => o.value === sort)?.label || 'Sort';

  return (
    <>
      <div className="px-4 pb-2 flex justify-end">
        <button 
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors bg-muted/50 px-3 py-1.5 rounded-full"
        >
          <ArrowUpDown className="w-3.5 h-3.5" />
          {currentLabel}
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-background/50 backdrop-blur-sm flex items-end">
          <BottomSheet 
            className="w-full bg-card rounded-t-3xl min-h-[300px] flex flex-col shadow-[0_-10px_40px_rgba(0,0,0,0.1)] border-t border-border overflow-hidden"
          >
            <div className="p-4 border-b border-border flex justify-between items-center">
              <h3 className="font-bold text-foreground">Sort Orders By</h3>
              <button onClick={() => setIsOpen(false)} className="text-muted-foreground text-sm font-medium p-2">
                Done
              </button>
            </div>
            
            <div className="flex flex-col p-2">
              {HISTORY_SORT_OPTIONS.map(opt => (
                <button 
                  key={opt.value}
                  onClick={() => {
                    setSort(opt.value);
                    setIsOpen(false);
                  }}
                  className="flex justify-between items-center w-full p-4 hover:bg-muted rounded-xl transition-colors text-left"
                >
                  <span className={`text-sm font-medium ${sort === opt.value ? 'text-primary' : 'text-foreground'}`}>
                    {opt.label}
                  </span>
                  {sort === opt.value && <Check className="w-5 h-5 text-primary" />}
                </button>
              ))}
            </div>
          </BottomSheet>
        </div>
      )}
    </>
  );
};
