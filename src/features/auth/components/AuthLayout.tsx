'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, GraduationCap, Library, Coffee, FileText } from 'lucide-react';

const scenes = [
  {
    id: 1,
    title: "Start your day smarter.",
    subtitle: "Morning Campus",
    icon: <GraduationCap className="w-24 h-24 text-primary" strokeWidth={1.5} />,
  },
  {
    id: 2,
    title: "Everything you need to print, in one place.",
    subtitle: "Library",
    icon: <Library className="w-24 h-24 text-primary" strokeWidth={1.5} />,
  },
  {
    id: 3,
    title: "Ready before your lecture begins.",
    subtitle: "Classroom",
    icon: <BookOpen className="w-24 h-24 text-primary" strokeWidth={1.5} />,
  },
  {
    id: 4,
    title: "Print less stress. Learn more.",
    subtitle: "Campus Walkway",
    icon: <Coffee className="w-24 h-24 text-primary" strokeWidth={1.5} />,
  },
  {
    id: 5,
    title: "Never miss an important print.",
    subtitle: "Exam Week",
    icon: <FileText className="w-24 h-24 text-primary" strokeWidth={1.5} />,
  }
];

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const [currentScene, setCurrentScene] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentScene((prev) => (prev + 1) % scenes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left side: Premium Campus Experience Scene (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-secondary/30 relative flex-col items-center justify-center p-12 overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentScene}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="flex flex-col items-center text-center max-w-md z-10"
          >
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
              className="mb-8 p-8 bg-white rounded-3xl shadow-premium border border-border/50"
            >
              {scenes[currentScene].icon}
            </motion.div>
            <h2 className="text-sm font-bold tracking-widest uppercase text-primary mb-4">
              {scenes[currentScene].subtitle}
            </h2>
            <h1 className="text-4xl font-bold text-foreground leading-tight">
              {scenes[currentScene].title}
            </h1>
          </motion.div>
        </AnimatePresence>

        {/* Indicators */}
        <div className="absolute bottom-12 flex space-x-2">
          {scenes.map((_, idx) => (
            <div 
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                idx === currentScene ? 'w-8 bg-primary' : 'w-2 bg-primary/20'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Right side: Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
};
