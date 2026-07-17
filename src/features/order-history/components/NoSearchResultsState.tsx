// src/features/order-history/components/NoSearchResultsState.tsx
import React from 'react';
import { SearchX } from 'lucide-react';
import { Button } from '@/design-system/components/buttons/Button/Button';

export const NoSearchResultsState = ({ onClear }: { onClear: () => void }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center min-h-[40vh]">
      <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4 text-muted-foreground">
        <SearchX className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-bold text-foreground mb-2">No Matches Found</h3>
      <p className="text-sm text-muted-foreground mb-6 max-w-[250px]">
        We couldn&apos;t find any orders matching your current search or filter criteria.
      </p>
      <Button onClick={onClear} className="bg-transparent border border-border text-foreground hover:bg-muted min-w-[120px]">
        Clear Filters
      </Button>
    </div>
  );
};
