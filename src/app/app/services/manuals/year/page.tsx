"use client";
import React, { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { YearSelector } from '@/features/manuals/components/YearSelector';
import { ProgressStepper } from '@/features/manuals/components/ProgressStepper';
import { MOCK_YEARS } from '@/features/manuals/mock/manualsData';
import { APP_ROUTES } from '@/constants/routes';

function YearSelectionContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const branchId = searchParams.get('branchId') || '';

  const handleSelect = (yearId: string) => {
    router.push(`${APP_ROUTES.MANUALS_WORKFLOW.SEMESTER}?branchId=${branchId}&yearId=${yearId}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background pb-safe">
      <ProgressStepper currentStep={2} totalSteps={7} />
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 pt-6 pb-2">
          <h1 className="text-2xl font-bold text-foreground">Select Year</h1>
          <p className="text-sm text-muted-foreground mt-1">Which year are you in?</p>
        </div>
        <YearSelector years={MOCK_YEARS} onSelect={handleSelect} />
      </div>
    </div>
  );
}

export default function YearSelectionPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <YearSelectionContent />
    </Suspense>
  );
}
