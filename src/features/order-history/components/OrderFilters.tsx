// src/features/order-history/components/OrderFilters.tsx
import React from 'react';
import { HISTORY_FILTER_OPTIONS } from '../constants/filters';
import { useOrderHistory } from '../hooks/useOrderHistory';
import { twMerge } from 'tailwind-merge';

export const OrderFilters = () => {
  const { filter, setFilter } = useOrderHistory();

  const handleSelect = (val: typeof HISTORY_FILTER_OPTIONS[0]['value']) => {
    if (val === 'all') {
      setFilter(undefined);
    } else {
      setFilter({ status: val });
    }
  };

  const currentVal = filter?.status || 'all';

  return (
    <div className="w-full px-4 overflow-x-auto no-scrollbar py-3">
      <div className="flex gap-2 min-w-max">
        {HISTORY_FILTER_OPTIONS.map(opt => (
          <button
            key={opt.value}
            onClick={() => handleSelect(opt.value)}
            className={twMerge(
              "px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors border",
              currentVal === opt.value 
                ? "bg-primary text-primary-foreground border-primary shadow-sm"
                : "bg-background text-foreground border-border hover:bg-muted"
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
};
