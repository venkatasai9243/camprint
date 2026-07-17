import { AppHeader } from './AppHeader';
import { BottomNavigation } from './BottomNavigation';
export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[430px] flex-col bg-background shadow-2xl relative overflow-hidden">
      <AppHeader title="Dashboard" />
      {children}
      <BottomNavigation />
    </div>
  );
}
