"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { BranchSelector } from '@/features/manuals/components/BranchSelector';
import { ProgressStepper } from '@/features/manuals/components/ProgressStepper';
import { MOCK_BRANCHES } from '@/features/manuals/mock/manualsData';
import { APP_ROUTES } from '@/constants/routes';

export default function BranchSelectionPage() {
  const router = useRouter();

  const handleSelect = (branchId: string) => {
    router.push(`${APP_ROUTES.MANUALS_WORKFLOW.YEAR}?branchId=${branchId}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background pb-safe">
      <ProgressStepper currentStep={1} totalSteps={7} />
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 pt-6 pb-2">
          <h1 className="text-2xl font-bold text-foreground">Select Branch</h1>
          <p className="text-sm text-muted-foreground mt-1">Choose your academic branch</p>
        </div>
        <BranchSelector branches={MOCK_BRANCHES} onSelect={handleSelect} />
      </div>
    </div>
  );
}
