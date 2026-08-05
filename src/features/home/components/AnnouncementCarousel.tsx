"use client";
import React, { useEffect, useRef } from 'react';
import { Announcement } from '../types';
import { Bell, Printer, Ticket } from 'lucide-react';

interface CarouselProps {
  announcements: Announcement[];
}

export const AnnouncementCarousel = ({ announcements }: CarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!announcements || announcements.length <= 1) return;
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: clientWidth * 0.85, behavior: 'smooth' });
        }
      }
    }, 6000);
    return () => clearInterval(interval);
  }, [announcements]);

  if (!announcements || announcements.length === 0) return null;

  return (
    <div 
      ref={scrollRef}
      className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory hide-scrollbar"
    >
      {announcements.map((ann, i) => (
        <div 
          key={ann.id} 
          className="w-[85%] max-w-[320px] h-[130px] snap-center px-5 py-4 bg-white border border-gray-100 rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.05)] shrink-0 flex justify-between relative overflow-hidden"
        >
          <div className="flex flex-col justify-between h-full z-10 w-[80%] pr-2">
            <div className="flex flex-col gap-2">
              <span className={`self-start px-2 py-0.5 text-[9px] font-black rounded-md uppercase tracking-wider ${ann.category === 'URGENT' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                {ann.category}
              </span>
              <div>
                <h4 className="font-bold text-[15px] text-gray-900 leading-tight mb-0.5 line-clamp-1">{ann.title}</h4>
                {(ann as any).description && (
                  <p className="text-[13px] text-gray-500 line-clamp-1">{(ann as any).description}</p>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-3 mt-1">
              {ann.ctaButtonText && (
                <a href={ann.ctaButtonLink || '#'} className="text-[13px] font-bold text-orange-500 hover:text-orange-600 group">
                  {ann.ctaButtonText} <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
                </a>
              )}
              <span className="text-[11px] font-medium text-gray-400">{(ann as any).timestamp}</span>
            </div>
          </div>
          
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center opacity-50 pointer-events-none">
            {i % 2 === 0 ? (
              <Ticket className="w-10 h-10 text-gray-400 transform -rotate-12 absolute top-4 right-6" strokeWidth={1.5} />
            ) : (
              <Printer className="w-10 h-10 text-gray-400 transform rotate-12 absolute top-4 right-6" strokeWidth={1.5} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};


