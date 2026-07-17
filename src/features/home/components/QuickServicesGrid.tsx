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
        {services.map((service) => (
          <motion.button
            key={service.id}
            onClick={() => {
              if (!service.disabled && !service.comingSoon && service.route) {
                router.push(service.route);
              }
            }}
            className={
              'relative flex flex-col items-center justify-center gap-3 p-5 rounded-xl border border-border shadow-sm touch-manipulation min-h-[120px] ' +
              (service.disabled || service.comingSoon ? 'bg-secondary/50 opacity-75 cursor-not-allowed' : 'bg-card hover:border-primary/50 transition-colors')
            }
            {...motionPresets.fade}
            whileTap={(!service.disabled && !service.comingSoon) ? { scale: 0.95 } : undefined}
          >
            {/* Icon Placeholder */}
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${service.color} opacity-90`}>
              <span className="text-2xl">
                {service.icon === 'Book' ? '📚' : service.icon === 'Ticket' ? '🎫' : service.icon === 'Copy' ? '📄' : service.icon === 'Upload' ? '📤' : '⚙️'}
              </span>
            </div>

            <span className="font-semibold text-sm text-foreground text-center leading-tight">
              {service.title}
            </span>

            {service.badge && (
              <div className="absolute top-2 right-2">
                <Badge >{service.badge}</Badge>
              </div>
            )}
            {service.comingSoon && (
              <div className="absolute top-2 right-2">
                <Badge >Soon</Badge>
              </div>
            )}
          </motion.button>
        ))}
      </div>
      
      <Button 
        onClick={() => router.push(APP_ROUTES.SERVICES.HUB)}
        className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/80 font-medium"
      >
        View All Services →
      </Button>
    </div>
  );
};


