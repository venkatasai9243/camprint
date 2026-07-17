// src/features/profile/components/DeliveryPreferencesCard.tsx
import React from 'react';
import { useSettings } from '../hooks/useSettings';
import { Truck, MapPin } from 'lucide-react';

export const DeliveryPreferencesCard = () => {
  const { deliveryPref } = useSettings();

  if (!deliveryPref) return null;

  const defaultRoom = deliveryPref.savedClassrooms.find(r => r.id === deliveryPref.defaultClassroomId) 
                      || deliveryPref.savedClassrooms.find(r => r.isDefault);

  return (
    <div className="bg-card border border-border rounded-2xl p-4 shadow-sm mt-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
            <Truck className="w-4 h-4 text-orange-600" />
          </div>
          <h3 className="font-bold text-foreground">Delivery Preferences</h3>
        </div>
        <button className="text-sm font-semibold text-primary hover:underline">Edit</button>
      </div>

      {defaultRoom ? (
        <div className="flex items-start gap-3 bg-muted/30 p-3 rounded-xl border border-border/50">
          <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div className="flex flex-col gap-1">
            <span className="text-sm font-bold text-foreground flex items-center gap-2">
              {defaultRoom.roomNumber}
              <span className="text-[10px] uppercase bg-primary text-primary-foreground px-1.5 py-0.5 rounded-sm">Default</span>
            </span>
            <span className="text-xs text-muted-foreground">{defaultRoom.building}, {defaultRoom.floor}</span>
            {defaultRoom.deliveryNotes && (
              <p className="text-xs text-muted-foreground mt-1 bg-background p-2 rounded-md border border-border/50">
                <span className="font-semibold block mb-0.5">Notes:</span>
                {defaultRoom.deliveryNotes}
              </p>
            )}
          </div>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">No default delivery location set.</p>
      )}
    </div>
  );
};
