// src/features/order-history/components/OrderHistorySkeleton.tsx
import React from 'react';

export const OrderHistorySkeleton = () => {
  return (
    <div className="flex flex-col gap-4 p-4 animate-pulse">
      {/* Search Bar Skeleton */}
      <div className="h-12 w-full bg-border/40 rounded-xl" />
      
      {/* Filters Skeleton */}
      <div className="flex gap-2 overflow-hidden">
        <div className="h-8 w-20 bg-border/40 rounded-full shrink-0" />
        <div className="h-8 w-24 bg-border/40 rounded-full shrink-0" />
        <div className="h-8 w-20 bg-border/40 rounded-full shrink-0" />
        <div className="h-8 w-28 bg-border/40 rounded-full shrink-0" />
      </div>

      {/* Cards Skeleton */}
      <div className="flex flex-col gap-4 mt-2">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-card border border-border/50 rounded-2xl p-4 flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-2 w-1/2">
                <div className="h-4 bg-border/40 rounded w-2/3" />
                <div className="h-3 bg-border/40 rounded w-1/2" />
              </div>
              <div className="h-6 bg-border/40 rounded-full w-20" />
            </div>
            
            <div className="h-[1px] bg-border/40 w-full my-1" />
            
            <div className="flex justify-between items-center">
              <div className="h-6 bg-border/40 rounded w-16" />
              <div className="h-8 bg-border/40 rounded w-24" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const PaginationLoader = () => (
  <div className="w-full flex justify-center py-6 animate-pulse">
    <div className="flex items-center gap-2">
      <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: '0ms' }} />
      <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: '150ms' }} />
      <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: '300ms' }} />
    </div>
  </div>
);
