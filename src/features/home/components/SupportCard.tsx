"use client";
import React from 'react';
import { SupportAction } from '../types';
import { Button } from '@/design-system/components/buttons/Button/Button';

interface SupportProps {
  actions: SupportAction[];
}

export const SupportCard = ({ actions }: SupportProps) => {
  if (!actions || actions.length === 0) return null;

  return (
    <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 text-center flex flex-col gap-3">
      <h2 className="font-semibold text-primary">Need Help?</h2>
      <p className="text-sm text-muted-foreground mb-2">Our support team is always here for you.</p>
      <div className="flex flex-wrap justify-center gap-3">
        {actions.map((action, i) => (
          <Button
            key={i}
            onClick={() => {
              if (action.enabled) window.open(action.actionUrl, '_blank');
            }}
            isDisabled={!action.enabled}
            className="bg-background border-border text-foreground hover:bg-secondary"
          >
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  );
};


