'use client';
import { usePathname, useRouter } from 'next/navigation';
import { ShoppingCart } from 'lucide-react';

export function AppHeader({ title }: { title: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === '/app/home';

  return (
    <header className="sticky top-0 z-0 flex flex-col justify-end w-full bg-[#FF6B00] text-white pt-[env(safe-area-inset-top)] h-[72px] pb-[1.625rem] px-6 rounded-b-[44px]">
      <div className="flex items-center justify-between w-full relative z-10">
        <div className="flex items-center gap-3 z-10">
          {!isHome ? (
            <button onClick={() => router.back()} className="text-white hover:opacity-80 flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
          ) : (
            <div className="font-extrabold tracking-wide text-lg">BLINTZY</div>
          )}
        </div>
        
        <h1 className="text-[21px] font-bold absolute left-0 right-0 text-center pointer-events-none truncate px-20">
          {title}
        </h1>
        
        <div className="flex items-center justify-end gap-3 z-10">
          <button className="text-white hover:opacity-80 transition-opacity flex items-center justify-center relative">
            <ShoppingCart className="w-6 h-6" strokeWidth={2.5} />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-orange-200 rounded-full border border-[#FF6B00]" />
          </button>
        </div>
      </div>
    </header>
  );
}
