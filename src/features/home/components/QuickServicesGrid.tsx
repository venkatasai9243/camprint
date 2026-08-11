"use client";
import React from 'react';
import { QuickService } from '../types';
import { motion } from 'framer-motion';
import { motionPresets } from '@/design-system/animations';
import { Badge } from '@/design-system/components/common/Badge/Badge';

import { APP_ROUTES } from '@/constants/routes';
import { useRouter } from 'next/navigation';
import { Button } from '@/design-system/components/buttons/Button/Button';

interface QuickServicesProps {
  services: QuickService[];
}

export const QuickServicesGrid = ({ services }: QuickServicesProps) => {
  const router = useRouter();
  
  if (!services || services.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        {services.map((service, index) => {
          const bgColors = ['bg-blue-50', 'bg-orange-50', 'bg-purple-50', 'bg-green-50'];
          const iconBg = bgColors[index % bgColors.length];
          return (
            <motion.button
              key={service.id}
              onClick={() => {
                if (!service.disabled && !service.comingSoon && service.route) {
                  router.push(service.route);
                }
              }}
              className={
                'relative flex flex-col items-start p-3 rounded-[20px] border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.05)] touch-manipulation h-full ' +
                (service.disabled || service.comingSoon ? 'bg-gray-50 opacity-75 cursor-not-allowed' : 'bg-white hover:border-gray-200 transition-colors')
              }
              {...motionPresets.fade}
              whileTap={(!service.disabled && !service.comingSoon) ? { scale: 0.97, y: -2 } : undefined}
              transition={{ duration: 0.15 }}
            >
              <div className="flex justify-between w-full items-start mb-1.5">
                <div className={`w-[44px] h-[44px] rounded-full flex items-center justify-center ${iconBg}`}>
                  <span className="text-[24px]">
                    {service.icon === 'Book' ? '📚' : service.icon === 'Ticket' ? '🎫' : service.icon === 'Copy' ? '📄' : service.icon === 'Upload' ? '📤' : '⚙️'}
                  </span>
                </div>
              </div>

              <div className="flex items-start justify-between w-full gap-2 mb-0.5 flex-nowrap">
                <span className="font-bold text-[15px] text-gray-900 text-left leading-tight min-w-0">
                  {service.title}
                </span>
                {service.badge && (
                  <span className="px-1.5 py-0.5 bg-orange-50 text-orange-600 text-[9px] uppercase font-bold tracking-widest rounded-md whitespace-nowrap flex-shrink-0 mt-0.5">
                    {service.badge}
                  </span>
                )}
              </div>
              
              <span className="text-xs font-medium text-gray-500 text-left leading-tight">
                {service.description}
              </span>
            </motion.button>
          );
        })}
      </div>
      
      <button 
        onClick={() => router.push(APP_ROUTES.SERVICES.HUB)}
        className="w-full mt-1 flex items-center justify-between p-3.5 bg-gray-50 border border-gray-100 rounded-[20px] active:bg-gray-100 transition-colors group"
      >
        <div className="flex flex-col items-start text-left pl-1">
          <span className="font-bold text-[15px] text-gray-900 leading-none mb-1">View All Services</span>
          <span className="text-xs font-medium text-gray-500">20+ Categories</span>
        </div>
        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center group-hover:bg-orange-200 transition-colors">
          <span className="text-orange-500 font-bold text-lg leading-none group-hover:translate-x-0.5 transition-transform">
            →
          </span>
        </div>
      </button>
    </div>
  );
};


