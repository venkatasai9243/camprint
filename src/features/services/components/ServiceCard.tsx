"use client";
import React from 'react';
import { Service } from '../types';
import { motion } from 'framer-motion';

interface ServiceCardProps {
  service: Service;
  onClick: (id: string) => void;
}

export const ServiceCard = ({ service, onClick }: ServiceCardProps) => {
  const isInteractable = service.enabled && !service.disabled && !service.comingSoon && !service.maintenance;

  return (
    <motion.button
      onClick={() => isInteractable && onClick(service.id)}
      disabled={!isInteractable}
      whileTap={isInteractable ? { scale: 0.98 } : undefined}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        w-full text-left relative flex flex-col gap-3 p-5 rounded-xl border transition-colors
        ${isInteractable 
          ? 'bg-card border-border hover:border-primary/50 shadow-sm cursor-pointer' 
          : 'bg-secondary/30 border-transparent opacity-80 cursor-not-allowed'}
      `}
      aria-label={`Select service: ${service.title}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-sm shrink-0 ${service.color}`}>
          <span className="text-2xl">{service.icon === 'Book' ? '📚' : service.icon === 'Ticket' ? '🎫' : service.icon === 'Copy' ? '📄' : service.icon === 'Upload' ? '📤' : '⚙️'}</span>
        </div>
        
        <div className="flex flex-col items-end gap-1 shrink-0">
          {service.badge && (
            <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-primary/10 text-primary">
              {service.badge}
            </span>
          )}
          {service.isNew && !service.badge && (
            <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-green-500/10 text-green-600">
              New
            </span>
          )}
          {service.beta && (
            <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-purple-500/10 text-purple-600">
              Beta
            </span>
          )}
          {service.comingSoon && (
            <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-secondary text-muted-foreground border border-border">
              Coming Soon
            </span>
          )}
          {service.maintenance && (
            <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-destructive/10 text-destructive">
              Maintenance
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1 mt-1">
        <h3 className="font-bold text-foreground text-base leading-tight">{service.title}</h3>
        {service.subtitle && (
          <p className="text-xs font-semibold text-primary">{service.subtitle}</p>
        )}
        <p className="text-sm text-muted-foreground leading-snug line-clamp-2 mt-1">
          {service.description}
        </p>
      </div>

      <div className="flex items-center gap-4 mt-2 pt-3 border-t border-border/50 text-xs text-muted-foreground font-medium">
        {service.estimatedTime && (
          <div className="flex items-center gap-1">
            <span>⏱️</span>
            <span>{service.estimatedTime}</span>
          </div>
        )}
        {service.estimatedPrice !== undefined && (
          <div className="flex items-center gap-1">
            <span>💳</span>
            <span>Est. ₹{service.estimatedPrice}</span>
          </div>
        )}
      </div>
      
      {/* Absolute overlay for disabled/maintenance states to intercept clicks completely if needed, though button disabled handles it */}
    </motion.button>
  );
};
