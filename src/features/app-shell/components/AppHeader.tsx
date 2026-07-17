'use client';
import { usePathname, useRouter } from 'next/navigation';

export function AppHeader({ title }: { title: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === '/app/home';

  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between bg-background/80 px-4 pt-[env(safe-area-inset-top)] backdrop-blur-md">
      <div className="flex items-center gap-3">
        {!isHome && (
          <button onClick={() => router.back()} className="text-muted-foreground hover:text-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
        )}
        <div className="font-bold text-primary">BLINTZY</div>
      </div>
      <h1 className="text-lg font-semibold absolute left-1/2 -translate-x-1/2">{title}</h1>
      <div className="flex items-center gap-3">
        {/* Removed redundant avatar, users will use BottomNav Profile tab */}
      </div>
    </header>
  );
}
