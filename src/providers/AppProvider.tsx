"use client";
import * as React from "react";
import { QueryProvider } from "./QueryProvider";
import { ErrorBoundary } from "./ErrorBoundary";
export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <QueryProvider>
        {children}
      </QueryProvider>
    </ErrorBoundary>
  );
}