"use client";
import React from 'react';
import { Announcement } from '../types';
import { Badge } from '@/design-system/components/common/Badge/Badge';

interface CarouselProps {
  announcements: Announcement[];
}

export const AnnouncementCarousel = ({ announcements }: CarouselProps) => {
  if (!announcements || announcements.length === 0) return null;

  return (
    <div className="flex overflow-x-auto gap-4 pb-4 snap-x hide-scrollbar">
      {announcements.map((ann) => (
        <div 
          key={ann.id} 
          className="w-[85%] max-w-[320px] snap-center p-5 bg-card border border-border rounded-xl shadow-sm shrink-0 flex flex-col gap-2"
        >
          <div className="flex items-center gap-2 mb-1">
            <Badge >
              {ann.category}
            </Badge>
            {ann.pinned && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 17v5"/><path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>
                Pinned
              </span>
            )}
          </div>
          <h4 className="font-bold text-foreground">{ann.title}</h4>
          {ann.ctaButtonText && (
            <a href={ann.ctaButtonLink || '#'} className="mt-2 text-sm font-semibold text-primary hover:underline">
              {ann.ctaButtonText} &rarr;
            </a>
          )}
        </div>
      ))}
    </div>
  );
};


