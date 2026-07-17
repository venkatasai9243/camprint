"use client";
import React from 'react';
import { PrintConfig } from '../types';
import { motion } from 'framer-motion';

interface PrintOptionsProps {
  config: PrintConfig;
  onChange: (config: PrintConfig) => void;
}

export const PrintOptions = ({ config, onChange }: PrintOptionsProps) => {
  const updateConfig = (updates: Partial<PrintConfig>) => {
    onChange({ ...config, ...updates });
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      {/* Copies */}
      <div className="flex flex-col gap-3">
        <label className="font-semibold text-foreground">Copies</label>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => updateConfig({ copies: Math.max(1, config.copies - 1) })}
            className="w-12 h-12 rounded-full border border-border bg-card flex items-center justify-center text-xl hover:bg-secondary/50 active:scale-95 transition-all"
          >
            -
          </button>
          <span className="text-2xl font-bold w-8 text-center">{config.copies}</span>
          <button 
            onClick={() => updateConfig({ copies: Math.min(10, config.copies + 1) })}
            className="w-12 h-12 rounded-full border border-border bg-card flex items-center justify-center text-xl hover:bg-secondary/50 active:scale-95 transition-all"
          >
            +
          </button>
        </div>
      </div>

      {/* Single / Double Sided */}
      <div className="flex flex-col gap-3">
        <label className="font-semibold text-foreground">Print Type</label>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => updateConfig({ singleSided: false })}
            className={`p-4 rounded-xl border text-center transition-all flex items-center justify-center gap-2 ${!config.singleSided ? 'bg-primary border-primary text-primary-foreground font-bold shadow-md' : 'bg-card border-border hover:border-primary/50 text-foreground font-medium'}`}
          >
            {!config.singleSided && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
            Double Sided
          </button>
          <button
            onClick={() => updateConfig({ singleSided: true })}
            className={`p-4 rounded-xl border text-center transition-all flex items-center justify-center gap-2 ${config.singleSided ? 'bg-primary border-primary text-primary-foreground font-bold shadow-md' : 'bg-card border-border hover:border-primary/50 text-foreground font-medium'}`}
          >
            {config.singleSided && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
            Single Sided
          </button>
        </div>
      </div>

      {/* Color vs B&W */}
      <div className="flex flex-col gap-3">
        <label className="font-semibold text-foreground">Color Mode</label>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => updateConfig({ color: false })}
            className={`p-4 rounded-xl border text-center transition-all flex items-center justify-center gap-2 ${!config.color ? 'bg-primary border-primary text-primary-foreground font-bold shadow-md' : 'bg-card border-border hover:border-primary/50 text-foreground font-medium'}`}
          >
            {!config.color && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
            Black & White
          </button>
          <button
            onClick={() => updateConfig({ color: true })}
            className={`p-4 rounded-xl border text-center transition-all flex items-center justify-center gap-2 ${config.color ? 'bg-primary border-primary text-primary-foreground font-bold shadow-md' : 'bg-card border-border hover:border-primary/50 text-foreground font-medium'}`}
          >
            {config.color && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
            Color Print
          </button>
        </div>
      </div>

      {/* Binding */}
      <div className="flex flex-col gap-3">
        <label className="font-semibold text-foreground">Binding Option</label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { id: 'none', label: 'Stapled' },
            { id: 'spiral', label: 'Spiral' },
            { id: 'softbound', label: 'Softbound' },
            { id: 'hardbound', label: 'Hardbound' }
          ].map(option => (
            <button
              key={option.id}
              onClick={() => updateConfig({ bindingType: option.id as PrintConfig['bindingType'] })}
              className={`p-4 rounded-xl border text-center transition-all flex items-center justify-center gap-2 ${config.bindingType === option.id ? 'bg-primary border-primary text-primary-foreground font-bold shadow-md' : 'bg-card border-border hover:border-primary/50 text-foreground font-medium'}`}
            >
              {config.bindingType === option.id && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
