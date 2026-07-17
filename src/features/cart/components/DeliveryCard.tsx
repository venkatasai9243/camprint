import React from 'react';
import { DeliveryInfo } from '../types';

interface DeliveryCardProps {
  info?: DeliveryInfo;
  onEdit?: () => void;
}

export const DeliveryCard = ({ info, onEdit }: DeliveryCardProps) => {
  return (
    <div className="flex flex-col gap-3 bg-card p-5 rounded-2xl border border-border shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-lg">Delivery Details</h3>
        <button onClick={onEdit} className="text-sm font-semibold text-primary">Edit</button>
      </div>

      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0 mt-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
        </div>
        
        <div className="flex flex-col">
          {info ? (
            <>
              <span className="font-bold text-foreground">{info.location}</span>
              <span className="text-sm text-muted-foreground">{info.block}, {info.floor}</span>
              <span className="text-sm text-muted-foreground">Classroom: {info.classroom}</span>
            </>
          ) : (
            <>
              <span className="font-bold text-foreground text-opacity-50">No Location Selected</span>
              <span className="text-sm text-muted-foreground">Please select a delivery location</span>
            </>
          )}
        </div>
      </div>
      
      {info && (
        <div className="mt-2 bg-secondary/50 rounded-lg p-3 flex items-center gap-2">
          <span className="text-xs">⚡</span>
          <span className="text-xs font-medium text-muted-foreground">Standard Delivery (1-2 Hours)</span>
        </div>
      )}
    </div>
  );
};
