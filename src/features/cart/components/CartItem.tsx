"use client";
import React from 'react';
import { CartItem as ICartItem } from '../types';

interface CartItemProps {
  item: ICartItem;
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
  onEdit: (id: string) => void;
}

export const CartItem = ({ item, onUpdateQuantity, onRemove, onEdit }: CartItemProps) => {
  return (
    <div className="flex flex-col p-4 bg-card rounded-2xl border border-border shadow-sm mb-4">
      <div className="flex gap-4">
        {/* Thumbnail area - generic fallback if none provided */}
        <div className="w-20 h-28 bg-secondary rounded-lg border border-border flex items-center justify-center shrink-0">
          <span className="text-2xl font-bold opacity-30 uppercase">{item.serviceType.substring(0,2)}</span>
        </div>
        
        <div className="flex flex-col flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-bold text-foreground leading-tight line-clamp-2">{item.title}</h4>
              <p className="text-xs text-muted-foreground mt-1">{item.subtitle}</p>
            </div>
            <div className="text-right pl-2 shrink-0">
              <span className="font-black text-lg text-primary">₹{item.priceBreakdown.total}</span>
            </div>
          </div>
          
          {/* Options Summary Pills */}
          <div className="flex flex-wrap gap-1 mt-3">
            <span className="px-2 py-0.5 bg-secondary text-secondary-foreground text-[10px] uppercase font-bold rounded-full tracking-wider">
              {item.printOptions.color ? 'Color' : 'B&W'}
            </span>
            <span className="px-2 py-0.5 bg-secondary text-secondary-foreground text-[10px] uppercase font-bold rounded-full tracking-wider">
              {item.printOptions.singleSided ? 'Single-Sided' : 'Double-Sided'}
            </span>
            {item.printOptions.bindingType !== 'none' && (
              <span className="px-2 py-0.5 bg-secondary text-secondary-foreground text-[10px] uppercase font-bold rounded-full tracking-wider">
                {item.printOptions.bindingType}
              </span>
            )}
          </div>
          
          {/* Actions & Quantity */}
          <div className="flex justify-between items-center mt-auto pt-4">
            <div className="flex items-center gap-4">
              <button onClick={() => onEdit(item.id)} className="text-sm font-semibold text-muted-foreground hover:text-foreground">Edit</button>
              <button onClick={() => onRemove(item.id)} className="text-sm font-semibold text-destructive/80 hover:text-destructive">Remove</button>
            </div>
            
            <div className="flex items-center gap-3 bg-secondary/30 rounded-lg p-1 border border-border/50">
              <button 
                onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                className="w-8 h-8 flex items-center justify-center bg-card rounded-md shadow-sm text-foreground active:scale-95 transition-transform"
              >-</button>
              <span className="font-bold text-sm w-4 text-center">{item.quantity}</span>
              <button 
                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                className="w-8 h-8 flex items-center justify-center bg-card rounded-md shadow-sm text-foreground active:scale-95 transition-transform"
              >+</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
