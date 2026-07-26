'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

interface WelcomeCardProps {
  onContinue: () => void;
  userName?: string | null;
}

export const WelcomeCard: React.FC<WelcomeCardProps> = ({ onContinue, userName }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full items-center text-center pt-8"
    >
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-8">
          <GraduationCap className="w-12 h-12 text-orange-500" />
        </div>
        <h2 className="text-3xl font-bold text-black mb-4 tracking-tight">Welcome to BLINTZY</h2>
        <p className="text-gray-500 mb-8 text-lg max-w-xs mx-auto">
          Let's set up your student account in less than a minute.
        </p>
      </div>
      
      <div className="w-full mt-auto pt-6 pb-2 safe-area-bottom">
        <button 
          onClick={onContinue}
          className="w-full bg-orange-500 text-white h-[56px] rounded-2xl font-bold text-lg hover:bg-orange-600 active:scale-[0.98] transition-all disabled:opacity-50"
        >
          Get Started
        </button>
      </div>
    </motion.div>
  );
};
