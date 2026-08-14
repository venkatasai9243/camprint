"use client";
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Announcement } from '../types';
import { Bell, Printer, Ticket } from 'lucide-react';

interface CarouselProps {
  announcements: Announcement[];
}

export const AnnouncementCarousel = ({ announcements }: CarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Still keeping the auto-scroll but tweaking for snap-start
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
      className="flex overflow-x-auto gap-3 pb-4 snap-x snap-mandatory hide-scrollbar"
    >
      {announcements.map((ann, i) => {
        // Determine full-card styling based on category
        let cardStyle = "bg-gray-50/80 border-gray-100";
        let badgeStyle = "bg-white text-gray-600 shadow-sm";
        let titleColor = "text-gray-900";
        let iconColor = "text-gray-300";
        let iconBg = "bg-white/50";
        let icon = <Bell className={`w-12 h-12 ${iconColor} absolute top-4 right-4 transform rotate-12`} strokeWidth={1} />;
        
        const cat = ann.category?.toUpperCase() || '';
        if (cat === 'URGENT') {
          cardStyle = "bg-red-50/80 border-red-100";
          badgeStyle = "bg-white text-red-600 shadow-sm";
          titleColor = "text-red-950";
          iconColor = "text-red-200/60";
          iconBg = "bg-white/40";
        } else if (cat === 'INFO') {
          cardStyle = "bg-blue-50/80 border-blue-100";
          badgeStyle = "bg-white text-blue-600 shadow-sm";
          titleColor = "text-blue-950";
          iconColor = "text-blue-200/60";
          iconBg = "bg-white/40";
        } else if (cat === 'NEW') {
          cardStyle = "bg-orange-50/80 border-orange-100";
          badgeStyle = "bg-white text-[#FF6B00] shadow-sm";
          titleColor = "text-orange-950";
          iconColor = "text-orange-200/60";
          iconBg = "bg-white/40";
        } else if (cat === 'UPDATE') {
          cardStyle = "bg-green-50/80 border-green-100";
          badgeStyle = "bg-white text-green-600 shadow-sm";
          titleColor = "text-green-950";
          iconColor = "text-green-200/60";
          iconBg = "bg-white/40";
        }

        if (i % 2 === 0) {
          icon = <Ticket className={`w-12 h-12 ${iconColor} absolute top-4 right-4 transform -rotate-12`} strokeWidth={1.5} />;
        } else {
          icon = <Printer className={`w-12 h-12 ${iconColor} absolute top-4 right-4 transform rotate-12`} strokeWidth={1.5} />;
        }

        return (
          <motion.div 
            key={ann.id} 
            whileTap={{ scale: 0.98 }}
            className={`w-[85%] max-w-[320px] h-[130px] snap-start px-5 py-4 border rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] shrink-0 flex justify-between relative overflow-hidden ${cardStyle}`}
          >
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />

            <div className="flex flex-col justify-between h-full z-10 w-[80%] pr-2">
              <div className="flex flex-col gap-1.5">
                <span className={`self-start px-2 py-0.5 text-[10px] font-bold rounded-md uppercase tracking-wider ${badgeStyle}`}>
                  {cat || 'INFO'}
                </span>
                <div>
                  <h4 className={`font-bold text-[15px] leading-tight mb-0.5 line-clamp-1 ${titleColor}`}>{ann.title}</h4>
                  {(ann as any).description && (
                    <p className="text-[13px] text-gray-500 font-medium line-clamp-1">{(ann as any).description}</p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-3 mt-1">
                {ann.ctaButtonText && (
                  <a href={ann.ctaButtonLink || '#'} className="text-[13px] font-bold text-[#FF6B00] hover:text-orange-600 group flex items-center transition-opacity active:opacity-70">
                    {ann.ctaButtonText} <span className="inline-block transition-transform group-hover:translate-x-1 ml-1">→</span>
                  </a>
                )}
              </div>
            </div>
            
            <div className={`absolute -right-4 -bottom-4 w-28 h-28 rounded-full flex items-center justify-center pointer-events-none ${iconBg}`}>
              {icon}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};


