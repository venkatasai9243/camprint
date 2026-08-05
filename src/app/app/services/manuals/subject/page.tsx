"use client";
import React, { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SubjectSelector } from '@/features/manuals/components/SubjectSelector';
import { ProgressStepper } from '@/features/manuals/components/ProgressStepper';
import { MOCK_SUBJECTS } from '@/features/manuals/mock/manualsData';
import { APP_ROUTES } from '@/constants/routes';

function SubjectSelectionContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const branchId = searchParams.get('branchId') || '';
  const yearId = searchParams.get('yearId') || '';
  const semesterId = searchParams.get('semesterId') || '';

  const handleSelect = (subjectId: string) => {
    router.push(`${APP_ROUTES.MANUALS_WORKFLOW.MANUAL}?branchId=${branchId}&yearId=${yearId}&semesterId=${semesterId}&subjectId=${subjectId}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background pb-safe">
      <ProgressStepper currentStep={4} totalSteps={7} />
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 pt-6 pb-2">
          <h1 className="text-2xl font-bold text-foreground">Select Subject</h1>
          <p className="text-sm text-muted-foreground mt-1">Which subject do you need a manual for?</p>
        </div>
        <SubjectSelector subjects={MOCK_SUBJECTS} onSelect={handleSelect} />
      </div>
    </div>
  );
}

export default function SubjectSelectionPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <SubjectSelectionContent />
    </Suspense>
  );
}
