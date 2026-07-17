"use client";
import React from 'react';
import { Category } from '../types';

interface CategoryFilterProps {
  categories: Category[];
  activeCategoryId: string;
  onSelect: (id: string) => void;
}

export const CategoryFilter = ({ categories, activeCategoryId, onSelect }: CategoryFilterProps) => {
  if (!categories || categories.length === 0) return null;

  return (
    <div className="flex overflow-x-auto gap-2 px-4 pb-6 snap-x hide-scrollbar">
      {categories.map((category) => {
        const isActive = category.id === activeCategoryId;
        return (
          <button
            key={category.id}
            onClick={() => onSelect(category.id)}
            className={`
              snap-center shrink-0 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 border
              ${isActive 
                ? 'bg-primary text-primary-foreground border-primary shadow-sm scale-105' 
                : 'bg-card text-muted-foreground border-border hover:bg-secondary/50 hover:text-foreground'}
            `}
            
            role="tab"
            aria-selected={isActive}
          >
            {category.label}
          </button>
        );
      })}
    </div>
  );
};
