// src/features/order-history/components/OrderSearch.tsx
import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useOrderHistory } from '../hooks/useOrderHistory';

export const OrderSearch = () => {
  const { search, setSearch } = useOrderHistory();
  const [inputValue, setInputValue] = useState(search?.query || '');

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue !== (search?.query || '')) {
        setSearch(inputValue ? { query: inputValue } : undefined);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [inputValue, search, setSearch]);

  return (
    <div className="relative w-full px-4 pt-4">
      <div className="relative flex items-center w-full bg-background border border-border rounded-xl focus-within:ring-2 focus-within:ring-primary/20 transition-all overflow-hidden shadow-sm">
        <Search className="absolute left-3 w-5 h-5 text-muted-foreground" />
        <input 
          type="text"
          placeholder="Search by Document Name, Order ID, Subject..."
          className="w-full bg-transparent outline-none py-3 pl-10 pr-10 text-sm font-medium text-foreground placeholder:text-muted-foreground/70"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        {inputValue && (
          <button 
            onClick={() => setInputValue('')}
            className="absolute right-3 w-6 h-6 flex items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-muted-foreground/20 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
