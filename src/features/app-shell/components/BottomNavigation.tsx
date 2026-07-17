'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { APP_ROUTES } from '@/config/routes';
import { NotificationBadge } from '@/features/notifications/components/NotificationBadge';
export function BottomNavigation() {
  const pathname = usePathname();
  const tabs = Object.values(APP_ROUTES);

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 flex h-[72px] w-full max-w-[430px] items-center justify-around border-t border-border bg-background pb-[env(safe-area-inset-bottom)]">
      {tabs.map((tab) => {
        const isActive = pathname === tab.path;
        const Icon = tab.icon!;
        return (
          <Link key={tab.path} href={tab.path} className="relative flex h-full flex-1 flex-col items-center justify-center gap-1 text-muted-foreground hover:text-foreground" aria-label={tab.title} aria-current={isActive ? 'page' : undefined}>
            {isActive && <motion.div layoutId="nav-indicator" className="absolute top-1 w-12 h-8 rounded-full bg-primary/10" transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }} />}
            {tab.path === '/app/notifications' ? (
              <NotificationBadge className={`h-5 w-5 relative z-10 ${isActive ? 'text-primary' : ''}`} iconOnly />
            ) : (
              <Icon className={`h-5 w-5 relative z-10 ${isActive ? 'text-primary' : ''}`} />
            )}
            <span className={`text-[10px] font-medium relative z-10 ${isActive ? 'text-primary' : ''}`}>{tab.title}</span>
          </Link>
        );
      })}
    </nav>
  );
}
