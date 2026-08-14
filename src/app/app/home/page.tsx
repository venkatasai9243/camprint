import React, { Suspense } from 'react';
import { DASHBOARD_WIDGETS } from '@/features/home/constants';
import { CurrentOrderHero } from '@/features/home/components/CurrentOrderHero';
import { QuickServicesGrid } from '@/features/home/components/QuickServicesGrid';
import { TodaysHighlights } from '@/features/home/components/TodaysHighlights';
import { AnnouncementCarousel } from '@/features/home/components/AnnouncementCarousel';
import { RecentOrders } from '@/features/home/components/RecentOrders';
import { SupportCard } from '@/features/home/components/SupportCard';
import { WidgetSkeleton, CurrentOrderSkeleton } from '@/features/home/components/HomeSkeleton';
import { DashboardEntry } from '@/features/home/components/DashboardEntry';
import { PromoBanners } from '@/features/home/components/PromoBanners';
import { BusTrackingCard } from '@/features/home/components/BusTrackingCard';

// In a real app, these would be separate async data fetching functions per widget
import { MOCK_ACTIVE_ORDERS, MOCK_QUICK_SERVICES, MOCK_ANNOUNCEMENTS, MOCK_SUPPORT_ACTIONS } from '@/features/home/mock/dashboardData';
import { mapCurrentOrder, mapQuickService, mapAnnouncement, mapSupportAction } from '@/features/home/mappers';

const SectionHeader = ({ title, actionLabel, href }: { title: string, actionLabel?: string, href?: string }) => (
  <div className="flex justify-between items-end mb-3 px-1">
    <h2 className="text-[18px] font-bold text-gray-900 leading-none">{title}</h2>
    {actionLabel && (
      <a 
        href={href || '#'}
        className="text-orange-500 font-bold text-[13px] flex items-center group active:text-orange-600 transition-colors"
      >
        <span className="leading-none">{actionLabel}</span>
        <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
      </a>
    )}
  </div>
);

export default async function HomeDashboard() {
  // Simulate backend-driven widget ordering
  const activeWidgets = DASHBOARD_WIDGETS.filter(w => w.enabled).sort((a, b) => a.priority - b.priority);

  const renderWidget = (widgetId: string) => {
    switch (widgetId) {
      case 'promo_banners':
        return (
          <section>
            <PromoBanners />
          </section>
        );
      case 'bus_tracking':
        return (
          <section>
            <BusTrackingCard />
          </section>
        );
      case 'current_order':
        return (
          <Suspense fallback={<CurrentOrderSkeleton />}>
            <section>
              <CurrentOrderHero orders={MOCK_ACTIVE_ORDERS.data.map(mapCurrentOrder)} />
            </section>
          </Suspense>
        );
      case 'quick_services':
        return (
          <Suspense fallback={<WidgetSkeleton />}>
            <section>
              <SectionHeader title="Quick Services" actionLabel="View All" href="/app/services" />
              <QuickServicesGrid services={MOCK_QUICK_SERVICES.data.map(mapQuickService)} />
            </section>
          </Suspense>
        );
      case 'todays_highlights':
        return (
          <Suspense fallback={<WidgetSkeleton />}>
            <section>
              <SectionHeader title="Today's Highlights" />
              <TodaysHighlights highlights={[]} /> {/* Empty for now to show fallback/empty states */}
            </section>
          </Suspense>
        );
      case 'announcements':
        return (
          <Suspense fallback={<WidgetSkeleton />}>
            <section>
              <SectionHeader title="Announcements" actionLabel="See All" href="/app/announcements" />
              <AnnouncementCarousel announcements={MOCK_ANNOUNCEMENTS.data.map(mapAnnouncement)} />
            </section>
          </Suspense>
        );
      case 'recent_orders':
        return (
          <Suspense fallback={<WidgetSkeleton />}>
            <section>
              <SectionHeader title="Recent Orders" actionLabel="History" href="/app/orders" />
              <RecentOrders orders={[]} />
            </section>
          </Suspense>
        );
      case 'support':
        return (
          <Suspense fallback={<WidgetSkeleton />}>
            <section>
              <SupportCard actions={MOCK_SUPPORT_ACTIONS.data.map(mapSupportAction)} />
            </section>
          </Suspense>
        );
      case 'greeting':
      default:
        return null;
    }
  };

  return (
    <DashboardEntry>
      <div className="flex flex-col gap-5 w-full pb-24">
        {/* Backend-Driven Widget Layout Engine */}
        {activeWidgets.map(widget => (
          <React.Fragment key={widget.id}>
            {renderWidget(widget.id)}
          </React.Fragment>
        ))}
      </div>
    </DashboardEntry>
  );
}
