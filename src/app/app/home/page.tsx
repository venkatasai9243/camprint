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

// In a real app, these would be separate async data fetching functions per widget
import { MOCK_CURRENT_ORDER, MOCK_QUICK_SERVICES, MOCK_ANNOUNCEMENTS, MOCK_SUPPORT_ACTIONS } from '@/features/home/mock/dashboardData';
import { mapCurrentOrder, mapQuickService, mapAnnouncement, mapSupportAction } from '@/features/home/mappers';

export default async function HomeDashboard() {
  // Simulate backend-driven widget ordering
  const activeWidgets = DASHBOARD_WIDGETS.filter(w => w.enabled).sort((a, b) => a.priority - b.priority);

  const renderWidget = (widgetId: string) => {
    switch (widgetId) {
      case 'current_order':
        return (
          <Suspense fallback={<CurrentOrderSkeleton />}>
            <section className="px-4">
              <CurrentOrderHero order={MOCK_CURRENT_ORDER.data ? mapCurrentOrder(MOCK_CURRENT_ORDER.data) : null} />
            </section>
          </Suspense>
        );
      case 'quick_services':
        return (
          <Suspense fallback={<WidgetSkeleton />}>
            <section className="px-4">
              <h2 className="text-lg font-semibold mb-4">Quick Services</h2>
              <QuickServicesGrid services={MOCK_QUICK_SERVICES.data.map(mapQuickService)} />
            </section>
          </Suspense>
        );
      case 'todays_highlights':
        return (
          <Suspense fallback={<WidgetSkeleton />}>
            <section className="pl-4">
              <h2 className="text-lg font-semibold mb-4">Today's Highlights</h2>
              <TodaysHighlights highlights={[]} /> {/* Empty for now to show fallback/empty states */}
            </section>
          </Suspense>
        );
      case 'announcements':
        return (
          <Suspense fallback={<WidgetSkeleton />}>
            <section className="pl-4">
              <h2 className="text-lg font-semibold mb-4">Announcements</h2>
              <AnnouncementCarousel announcements={MOCK_ANNOUNCEMENTS.data.map(mapAnnouncement)} />
            </section>
          </Suspense>
        );
      case 'recent_orders':
        return (
          <Suspense fallback={<WidgetSkeleton />}>
            <section className="px-4">
              <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
              <RecentOrders orders={[]} />
            </section>
          </Suspense>
        );
      case 'support':
        return (
          <Suspense fallback={<WidgetSkeleton />}>
            <section className="px-4">
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
      <div className="flex flex-col gap-6 w-full pb-24">
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
