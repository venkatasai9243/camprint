"use client";
import React from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchBar = ({ value, onChange, placeholder = "Search services..." }: SearchBarProps) => {
  return (
    <div className="px-4 mb-6">
      <div className="relative flex items-center w-full h-12 rounded-xl bg-secondary/50 border border-border focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
        <div className="pl-4 pr-3 text-muted-foreground flex items-center justify-center">
          <span className="text-xl">🔍</span>
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full h-full bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground text-sm font-medium pr-4"
          aria-label="Search services"
        />
        {value && (
          <button
            onClick={() => onChange('')}
            className="pr-4 text-muted-foreground hover:text-foreground focus:outline-none"
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};
