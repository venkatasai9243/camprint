'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Ticket, FileText, BookOpen } from 'lucide-react';

const banners = [
  {
    id: 1,
    title: 'Print Before 8 PM',
    desc: 'Get tomorrow classroom delivery.',
    cta: 'Print Now',
    bg: 'bg-gradient-to-br from-[#FF6B00] to-[#E66000]',
    textColor: 'text-white',
    descColor: 'text-orange-100',
    icon: <Clock className="w-24 h-24 text-white opacity-20 absolute -right-4 -bottom-4 transform -rotate-12" strokeWidth={1} />,
  },
  {
    id: 2,
    title: 'Hall Tickets Released',
    desc: 'Download & Print Today.',
    cta: 'Get Tickets',
    bg: 'bg-gradient-to-br from-purple-600 to-purple-800',
    textColor: 'text-white',
    descColor: 'text-purple-200',
    icon: <Ticket className="w-24 h-24 text-white opacity-20 absolute -right-2 -bottom-2 transform rotate-12" strokeWidth={1} />,
  },
  {
    id: 3,
    title: 'Assignments Ready',
    desc: 'Upload in seconds.',
    cta: 'Upload Now',
    bg: 'bg-gradient-to-br from-blue-600 to-blue-800',
    textColor: 'text-white',
    descColor: 'text-blue-200',
    icon: <FileText className="w-24 h-24 text-white opacity-20 absolute -right-2 -bottom-4 transform -rotate-6" strokeWidth={1} />,
  },
  {
    id: 4,
    title: 'Semester Manuals Updated',
    desc: 'All branches available.',
    cta: 'Browse Manuals',
    bg: 'bg-gradient-to-br from-green-600 to-emerald-800',
    textColor: 'text-white',
    descColor: 'text-green-200',
    icon: <BookOpen className="w-24 h-24 text-white opacity-20 absolute -right-2 -bottom-2 transform rotate-6" strokeWidth={1} />,
  },
];

export const PromoBanners = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="px-4">
      <div className="relative overflow-hidden h-[170px] w-full rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 bg-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className={`absolute inset-0 flex flex-col justify-center px-6 ${banners[current].bg}`}
          >
            {banners[current].icon}
            
            <div className="relative z-10 max-w-[70%] flex flex-col items-start gap-2">
              <h3 className={`text-[20px] font-black leading-tight ${banners[current].textColor}`}>
                {banners[current].title}
              </h3>
              <p className={`text-sm font-medium ${banners[current].descColor}`}>
                {banners[current].desc}
              </p>
              
              <button className="mt-2 px-5 h-[36px] bg-white text-gray-900 font-bold rounded-[12px] text-xs shadow-sm hover:scale-105 transition-transform">
                {banners[current].cta}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
        
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-20">
          {banners.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? 'w-5 bg-white' : 'w-1.5 bg-white/40'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
