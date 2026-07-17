"use client";
import React from 'react';
import { Button } from '@/design-system/components/buttons/Button/Button';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const WidgetEmptyState = ({ title, description, actionLabel, onAction }: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center p-8 bg-card border border-border rounded-xl text-center">
    <div className="w-16 h-16 bg-secondary/50 rounded-full flex items-center justify-center mb-4">
      <span className="text-2xl">??</span>
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground mb-4">{description}</p>
    {actionLabel && (
      <Button onClick={onAction}  className="w-full">
        {actionLabel}
      </Button>
    )}
  </div>
);



