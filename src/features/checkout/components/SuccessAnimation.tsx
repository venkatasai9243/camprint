// src/features/checkout/components/SuccessAnimation.tsx
"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface SuccessAnimationProps {
  orderId: string;
  onContinue: () => void;
  onTrack: () => void;
}

export const SuccessAnimation = ({ orderId, onContinue, onTrack }: SuccessAnimationProps) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center p-6 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 mb-8"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <Check className="w-12 h-12 text-white" strokeWidth={3} />
        </motion.div>
      </motion.div>

      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-2xl font-black text-foreground mb-2"
      >
        Order Placed Successfully!
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-muted-foreground mb-8"
      >
        Your order <span className="font-mono text-foreground font-bold">{orderId}</span> has been confirmed.
      </motion.p>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex flex-col w-full gap-3 max-w-sm"
      >
        <button 
          onClick={onTrack}
          className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl shadow-md"
        >
          Track Order
        </button>
        <button 
          onClick={onContinue}
          className="w-full py-4 bg-muted text-foreground font-bold rounded-xl"
        >
          Continue Shopping
        </button>
      </motion.div>
    </div>
  );
};
