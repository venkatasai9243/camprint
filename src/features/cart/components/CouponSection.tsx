"use client";
import React, { useState } from 'react';
import { Button } from '@/design-system/components/buttons/Button/Button';

export const CouponSection = () => {
  const [code, setCode] = useState('');
  const [applied, setApplied] = useState(false);

  const handleApply = () => {
    if (code.trim().length > 3) {
      setApplied(true);
    }
  };

  return (
    <div className="flex flex-col gap-3 bg-card p-5 rounded-2xl border border-border shadow-sm">
      <h3 className="font-bold text-lg mb-1">Have a Coupon?</h3>
      
      {applied ? (
        <div className="flex justify-between items-center bg-green-500/10 border border-green-500/30 p-3 rounded-xl">
          <div className="flex items-center gap-2 text-green-700 dark:text-green-400 font-semibold">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            <span>{code.toUpperCase()} Applied</span>
          </div>
          <button onClick={() => { setApplied(false); setCode(''); }} className="text-sm font-semibold text-muted-foreground hover:text-foreground">Remove</button>
        </div>
      ) : (
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="Enter promo code" 
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            className="flex-1 px-4 py-3 rounded-xl bg-secondary/50 border border-border focus:ring-2 focus:ring-primary/20 outline-none transition-all uppercase"
          />
          <Button 
            onClick={handleApply}
            className="px-6 bg-primary text-primary-foreground font-semibold"
          >
            Apply
          </Button>
        </div>
      )}
    </div>
  );
};
