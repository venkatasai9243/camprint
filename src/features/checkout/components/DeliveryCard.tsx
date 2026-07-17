// src/features/checkout/components/DeliveryCard.tsx
"use client";
import React, { useState } from 'react';
import { DeliveryDetails } from '../types';
import { DeliveryLocationSelector } from './DeliveryLocationSelector';
import { MapPin } from 'lucide-react';

interface DeliveryCardProps {
  details: DeliveryDetails | null;
  onUpdate: (details: DeliveryDetails) => void;
}

export const DeliveryCard = ({ details, onUpdate }: DeliveryCardProps) => {
  const [isEditing, setIsEditing] = useState(!details);

  return (
    <div className="bg-card border border-border rounded-2xl p-4 shadow-sm flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-foreground font-bold">
          <MapPin className="w-5 h-5 text-primary" />
          <h2>Delivery Location</h2>
        </div>
        {details && !isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="text-sm text-primary font-semibold hover:underline"
          >
            Change
          </button>
        )}
      </div>

      {isEditing ? (
        <DeliveryLocationSelector 
          selectedId={details?.locationId}
          onSelect={(d) => {
            onUpdate(d);
            setIsEditing(false);
          }}
        />
      ) : (
        <div className="flex flex-col bg-muted/30 p-3 rounded-xl border border-border/50">
          <span className="font-semibold text-sm">{details?.locationName}</span>
          <span className="text-xs text-muted-foreground mt-0.5">Est: {details?.estimatedTime}</span>
        </div>
      )}
    </div>
  );
};
