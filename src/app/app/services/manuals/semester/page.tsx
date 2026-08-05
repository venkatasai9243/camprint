"use client";
import React, { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SemesterSelector } from '@/features/manuals/components/SemesterSelector';
import { ProgressStepper } from '@/features/manuals/components/ProgressStepper';
import { MOCK_SEMESTERS } from '@/features/manuals/mock/manualsData';
import { APP_ROUTES } from '@/constants/routes';

function SemesterSelectionContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const branchId = searchParams.get('branchId') || '';
  const yearId = searchParams.get('yearId') || '';

  const handleSelect = (semesterId: string) => {
    router.push(`${APP_ROUTES.MANUALS_WORKFLOW.SUBJECT}?branchId=${branchId}&yearId=${yearId}&semesterId=${semesterId}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background pb-safe">
      <ProgressStepper currentStep={3} totalSteps={7} />
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 pt-6 pb-2">
          <h1 className="text-2xl font-bold text-foreground">Select Semester</h1>
          <p className="text-sm text-muted-foreground mt-1">Which semester are you in?</p>
        </div>
        <SemesterSelector semesters={MOCK_SEMESTERS} onSelect={handleSelect} />
      </div>
    </div>
  );
}

export default function SemesterSelectionPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <SemesterSelectionContent />
    </Suspense>
  );
}
