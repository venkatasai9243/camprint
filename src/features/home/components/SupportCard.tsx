"use client";
import React from 'react';
import { SupportAction } from '../types';
import { Button } from '@/design-system/components/buttons/Button/Button';
import { MessageCircle, Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

interface SupportProps {
  actions: SupportAction[];
}

export const SupportCard = ({ actions }: SupportProps) => {
  if (!actions || actions.length === 0) return null;

  return (
    <div className="flex flex-col gap-3 pb-4">
      <div className="bg-white border border-gray-100 rounded-[20px] p-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
        <h2 className="font-bold text-[16px] text-gray-900 mb-4 text-center">Need Help?</h2>
        
        <div className="grid grid-cols-3 gap-2">
          {actions.map((action, i) => {
            let icon = <Mail className="w-5 h-5" />;
            if (action.type === 'WhatsApp') {
              icon = <MessageCircle className="w-5 h-5" />;
            } else if (action.type === 'Phone') {
              icon = <Phone className="w-5 h-5" />;
            }
            
            return (
              <motion.div
                key={i}
                whileTap={{ scale: action.enabled ? 0.97 : 1 }}
                onClick={() => {
                  if (action.enabled) window.open(action.actionUrl, '_blank');
                }}
                className={`flex flex-col items-center justify-center gap-1.5 p-2 rounded-xl transition-colors ${
                  action.enabled 
                    ? 'cursor-pointer hover:bg-orange-50/50 active:bg-orange-100/50 group' 
                    : 'opacity-50'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  action.enabled ? 'bg-orange-50 text-orange-600 group-hover:bg-orange-100' : 'bg-gray-50 text-gray-400'
                }`}>
                  {icon}
                </div>
                <span className="font-bold text-[12px] text-gray-900 leading-tight text-center whitespace-nowrap">
                  {action.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};


