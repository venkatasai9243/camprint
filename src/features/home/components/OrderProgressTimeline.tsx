"use client";
import React from 'react';
import { OrderStatus } from '../types';
import { motion } from 'framer-motion';

interface TimelineProps {
  status: OrderStatus;
  progress: number;
}

const STATUS_STAGES: OrderStatus[] = ['Placed', 'Printing', 'Ready', 'Delivered'] as OrderStatus[];

export const OrderProgressTimeline = ({ status, progress }: TimelineProps) => {
  if (status === 'Cancelled' || status === 'Rejected' || status === 'OnHold') {
    return (
      <div className="w-full p-4 bg-destructive/10 text-destructive rounded-lg text-sm font-medium">
        Order Status: {status}
      </div>
    );
  }

  // Normalize current status to our simplified 4-stage display
  let currentStageIndex = 0;
  if (['Received', 'Placed'].includes(status)) currentStageIndex = 0;
  else if (['Printing', 'Binding'].includes(status)) currentStageIndex = 1;
  else if (['QualityCheck', 'Packed', 'Ready'].includes(status)) currentStageIndex = 2;
  else if (['OutForDelivery', 'Delivered'].includes(status)) currentStageIndex = 3;

  return (
    <div className="w-full flex flex-col gap-2 mt-4">
      <div className="relative h-2 w-full bg-secondary rounded-full overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 h-full bg-primary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${Math.max(15, (currentStageIndex / 3) * 100)}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
      <div className="flex justify-between items-center text-xs mt-1">
        {STATUS_STAGES.map((stage, idx) => {
          const isCompleted = idx <= currentStageIndex;
          return (
            <span key={stage} className={isCompleted ? 'text-primary font-medium' : 'text-muted-foreground'}>
              {stage}
            </span>
          );
        })}
      </div>
    </div>
  );
};

