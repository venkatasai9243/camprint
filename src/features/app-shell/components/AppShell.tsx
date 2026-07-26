"use client";

import { usePathname } from 'next/navigation';
import { AppHeader } from './AppHeader';
import { BottomNavigation } from './BottomNavigation';

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isOnboarding = pathname === '/app/onboarding';

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[430px] flex-col bg-background shadow-2xl relative overflow-hidden">
      {!isOnboarding && <AppHeader title="Dashboard" />}
      {children}
      {!isOnboarding && <BottomNavigation />}
    </div>
  );
}
