"use client";
import React from 'react';
import { Highlight } from '../types';

interface HighlightsProps {
  highlights: Highlight[];
}

export const TodaysHighlights = ({ highlights }: HighlightsProps) => {
  if (!highlights || highlights.length === 0) return null;

  return (
    <div className="flex overflow-x-auto gap-4 pb-4 snap-x hide-scrollbar">
      {highlights.map((highlight) => (
        <div 
          key={highlight.id} 
          className={`min-w-[280px] snap-center p-5 border border-border rounded-xl shadow-sm shrink-0 flex flex-col gap-2 ${highlight.backgroundColor || 'bg-card'}`}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">{highlight.icon || '✨'}</span>
          </div>
          <h4 className="font-bold text-foreground">{highlight.title}</h4>
          {highlight.actionLabel && (
            <a href={highlight.deepLink || '#'} className="mt-2 text-sm font-semibold text-primary hover:underline">
              {highlight.actionLabel} &rarr;
            </a>
          )}
        </div>
      ))}
    </div>
  );
};

