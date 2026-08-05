"use client";
import React from 'react';
import { SupportAction } from '../types';
import { Button } from '@/design-system/components/buttons/Button/Button';

interface SupportProps {
  actions: SupportAction[];
}

import { motion } from 'framer-motion';

export const SupportCard = ({ actions }: SupportProps) => {
  if (!actions || actions.length === 0) return null;

  return (
    <div className="flex flex-col gap-3 pb-8">
      <h2 className="font-bold text-[18px] text-gray-900 mb-2 px-1">Need Help?</h2>
      <div className="flex flex-col gap-2">
        {actions.map((action, i) => {
          let subtitle = '24 Hour Reply';
          let icon = '✉️';
          if (action.type === 'WhatsApp') {
            subtitle = 'Instant Reply';
            icon = '💬';
          } else if (action.type === 'Phone') {
            subtitle = 'Talk to Team';
            icon = '📞';
          }
          
          return (
            <motion.div
              key={i}
              whileTap={{ scale: action.enabled ? 0.98 : 1, y: action.enabled ? -2 : 0 }}
              onClick={() => {
                if (action.enabled) window.open(action.actionUrl, '_blank');
              }}
              className={`flex items-center justify-between bg-white border border-gray-100 rounded-[20px] px-4 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.05)] group ${action.enabled ? 'cursor-pointer hover:border-gray-200' : 'opacity-50'}`}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-[24px]">
                  {icon}
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-[15px] text-gray-900 leading-tight mb-0.5">{action.label}</span>
                  <span className="text-[13px] text-gray-500 font-medium leading-tight">{subtitle}</span>
                </div>
              </div>
              <span className="text-gray-300 font-bold text-[18px] group-hover:text-orange-500 transition-colors group-hover:translate-x-1 duration-200">
                &rarr;
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};


