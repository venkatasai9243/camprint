// src/features/order-history/components/OrderList.tsx
import React, { useRef, useEffect } from 'react';
import { useOrderHistory } from '../hooks/useOrderHistory';
import { OrderCard } from './OrderCard';
import { PaginationLoader, OrderHistorySkeleton } from './OrderHistorySkeleton';
import { OrderHistoryEmptyState } from './OrderHistoryEmptyState';
import { OrderHistoryErrorState } from './OrderHistoryErrorState';
import { NoSearchResultsState } from './NoSearchResultsState';

export const OrderList = () => {
  const { 
    orders, isLoading, isLoadingMore, error, hasMore, loadMore, refresh, 
    search, filter, setSearch, setFilter 
  } = useOrderHistory();
  
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !isLoading && !isLoadingMore) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [hasMore, isLoading, isLoadingMore, loadMore]);

  if (isLoading) {
    return <OrderHistorySkeleton />;
  }

  if (error) {
    return <OrderHistoryErrorState error={error} onRetry={refresh} />;
  }

  const hasActiveSearchOrFilter = !!(search?.query || filter?.status || filter?.dateRange);

  if (orders.length === 0) {
    if (hasActiveSearchOrFilter) {
      return <NoSearchResultsState onClear={() => { setSearch(undefined); setFilter(undefined); }} />;
    }
    return <OrderHistoryEmptyState />;
  }

  return (
    <div className="flex flex-col gap-4 px-4 pb-24">
      {orders.map(order => (
        <OrderCard key={order.id} order={order} />
      ))}
      
      <div ref={observerTarget} className="w-full h-10">
        {isLoadingMore && <PaginationLoader />}
      </div>
    </div>
  );
};
