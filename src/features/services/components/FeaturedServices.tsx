"use client";
import React from 'react';
import { FeaturedService, Service } from '../types';
import { Button } from '@/design-system/components/buttons/Button/Button';

interface FeaturedServicesProps {
  featured: FeaturedService[];
  services: Service[];
  onFeaturedClick: (serviceId: string, campaign?: string) => void;
}

export const FeaturedServices = ({ featured, services, onFeaturedClick }: FeaturedServicesProps) => {
  if (!featured || featured.length === 0) return null;

  return (
    <div className="px-4 mt-2 mb-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-foreground">Featured</h2>
      </div>
      <div className="flex flex-col gap-4">
        {featured.sort((a, b) => a.displayOrder - b.displayOrder).map((feat) => {
          const service = services.find(s => s.id === feat.serviceId);
          if (!service) return null;
          
          return (
            <div 
              key={feat.id} 
              className={`relative overflow-hidden rounded-xl border border-border shadow-md ${service.color} bg-opacity-10 p-5`}
            >
              <div className="relative z-10 flex flex-col items-start gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-background/50 backdrop-blur-sm text-foreground">
                  {feat.campaign || 'Featured'}
                </span>
                <h3 className="text-xl font-bold text-foreground mt-1">{service.title}</h3>
                <p className="text-sm text-foreground/80 leading-snug line-clamp-2 max-w-[80%]">
                  {service.subtitle || service.description}
                </p>
                <Button 
                  onClick={() => onFeaturedClick(feat.serviceId, feat.campaign)}
                  className="mt-3 bg-background text-foreground hover:bg-secondary border-none"
                >
                  Explore Now
                </Button>
              </div>
              <div className="absolute -right-4 -bottom-4 text-8xl opacity-20 transform rotate-12">
                {service.icon === 'Book' ? '📚' : service.icon === 'Ticket' ? '🎫' : service.icon === 'Copy' ? '📄' : service.icon === 'Upload' ? '📤' : '✨'}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
