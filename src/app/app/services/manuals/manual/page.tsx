"use client";
import React, { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ManualCard } from '@/features/manuals/components/ManualCard';
import { ProgressStepper } from '@/features/manuals/components/ProgressStepper';
import { MOCK_MANUALS } from '@/features/manuals/mock/manualsData';
import { mapManual } from '@/features/manuals/mappers';
import { APP_ROUTES } from '@/constants/routes';

function ManualSelectionContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const branchId = searchParams.get('branchId') || '';
  const yearId = searchParams.get('yearId') || '';
  const semesterId = searchParams.get('semesterId') || '';
  const subjectId = searchParams.get('subjectId') || '';

  const handleSelect = (manualId: string) => {
    // There is no explicit DETAILS route in routes.ts, it goes straight to print configuration (OPTIONS)
    // Wait, let's look at PrintOptions.tsx and ReviewCard.tsx.
    // The user flow is: Manual List -> Manual Details -> Print Options -> Checkout
    // But APP_ROUTES.MANUALS_WORKFLOW has OPTIONS and REVIEW.
    // Let me route to OPTIONS directly, or is there a details page? 
    // The user mentioned: "Manual Details" in their flow.
    // Let me check if there's an APP_ROUTES.MANUALS_WORKFLOW.DETAILS. 
    // It's not in the previous routes.ts. Let me just route to OPTIONS.
    router.push(`${APP_ROUTES.MANUALS_WORKFLOW.OPTIONS}?branchId=${branchId}&yearId=${yearId}&semesterId=${semesterId}&subjectId=${subjectId}&manualId=${manualId}`);
  };

  const manuals = MOCK_MANUALS.map(mapManual);
  const subjectManuals = subjectId ? manuals.filter(m => m.subjectId === subjectId) : manuals;

  return (
    <div className="flex flex-col min-h-screen bg-background pb-safe">
      <ProgressStepper currentStep={5} totalSteps={7} />
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 pt-6 pb-2">
          <h1 className="text-2xl font-bold text-foreground">Select Manual</h1>
          <p className="text-sm text-muted-foreground mt-1">Choose the manual you want to print</p>
        </div>
        <div className="flex flex-col gap-4 p-4">
          {subjectManuals.map(manual => (
            <ManualCard key={manual.id} manual={manual} onClick={handleSelect} />
          ))}
          {subjectManuals.length === 0 && (
            <div className="text-center p-8 text-muted-foreground">
              No manuals found for this subject.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ManualSelectionPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <ManualSelectionContent />
    </Suspense>
  );
}
