// src/features/profile/components/HelpSupportCard.tsx
import React, { useEffect, useState } from 'react';
import { LifeBuoy, ChevronRight } from 'lucide-react';
import { supportApi } from '../api/supportApi';
import { SupportOption } from '../types';

export const HelpSupportCard = () => {
  const [options, setOptions] = useState<SupportOption[]>([]);

  useEffect(() => {
    supportApi.getSupportOptions().then(setOptions);
  }, []);

  return (
    <div className="bg-card border border-border rounded-2xl shadow-sm mt-4 overflow-hidden">
      <div className="flex items-center gap-2 p-4 pb-2">
        <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center shrink-0">
          <LifeBuoy className="w-4 h-4 text-teal-600" />
        </div>
        <h3 className="font-bold text-foreground">Help & Support</h3>
      </div>

      <div className="flex flex-col divide-y divide-border/50">
        {options.map((opt) => (
          <a
            key={opt.id}
            href={opt.actionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
          >
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-foreground">{opt.title}</span>
              <span className="text-xs text-muted-foreground">{opt.description}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </a>
        ))}
      </div>
    </div>
  );
};
