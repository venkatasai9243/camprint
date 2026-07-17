import React from 'react';

interface ServiceHeaderProps {
  title?: string;
  subtitle?: string;
}

export const ServiceHeader = ({ 
  title = "Printing Services", 
  subtitle = "Choose a service to continue" 
}: ServiceHeaderProps) => (
  <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md pb-4 pt-6 px-4">
    <h1 className="text-2xl font-bold text-foreground tracking-tight">{title}</h1>
    <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
  </header>
);
