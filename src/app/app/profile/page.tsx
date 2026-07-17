"use client";
import React from 'react';
import { ProfileHeader } from '@/features/profile/components/ProfileHeader';
import { StudentProfileCard } from '@/features/profile/components/StudentProfileCard';
import { AcademicInformationCard } from '@/features/profile/components/AcademicInformationCard';
import { DeliveryPreferencesCard } from '@/features/profile/components/DeliveryPreferencesCard';
import { NotificationSettingsCard } from '@/features/profile/components/NotificationSettingsCard';
import { PrivacySecurityCard } from '@/features/profile/components/PrivacySecurityCard';
import { HelpSupportCard } from '@/features/profile/components/HelpSupportCard';
import { AboutAppCard } from '@/features/profile/components/AboutAppCard';
import { ProfileSkeleton } from '@/features/profile/components/ProfileSkeleton';
import { useProfile } from '@/features/profile/hooks/useProfile';

export default function ProfilePage() {
  const { isLoading } = useProfile();

  return (
    <div className="flex flex-col w-full h-full bg-muted/10 min-h-[100dvh]">
      <ProfileHeader />
      
      {isLoading ? (
        <ProfileSkeleton />
      ) : (
        <div className="p-4 flex flex-col pb-24 overflow-y-auto">
          <StudentProfileCard />
          <div className="mt-4" />
          <AcademicInformationCard />
          <DeliveryPreferencesCard />
          <NotificationSettingsCard />
          <PrivacySecurityCard />
          <HelpSupportCard />
          <AboutAppCard />
        </div>
      )}
    </div>
  );
}
