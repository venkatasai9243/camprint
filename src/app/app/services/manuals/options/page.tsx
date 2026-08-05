"use client";
import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { PrintOptions } from '@/features/manuals/components/PrintOptions';
import { ProgressStepper } from '@/features/manuals/components/ProgressStepper';
import { PrintConfig } from '@/features/manuals/types';
import { Button } from '@/design-system/components/buttons/Button/Button';
import { APP_ROUTES } from '@/constants/routes';

function OptionsSelectionContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const branchId = searchParams.get('branchId') || '';
  const yearId = searchParams.get('yearId') || '';
  const semesterId = searchParams.get('semesterId') || '';
  const subjectId = searchParams.get('subjectId') || '';
  const manualId = searchParams.get('manualId') || '';

  const [config, setConfig] = useState<PrintConfig>({
    copies: 1,
    singleSided: false,
    color: false,
    bindingType: 'spiral',
    paperSize: 'a4'
  });

  const handleContinue = () => {
    // Serialize config into URL params
    const configParams = new URLSearchParams({
      branchId,
      yearId,
      semesterId,
      subjectId,
      manualId,
      copies: config.copies.toString(),
      singleSided: config.singleSided.toString(),
      color: config.color.toString(),
      bindingType: config.bindingType,
      paperSize: config.paperSize
    });
    router.push(`${APP_ROUTES.MANUALS_WORKFLOW.REVIEW}?${configParams.toString()}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background pb-safe">
      <ProgressStepper currentStep={6} totalSteps={7} />
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 pt-6 pb-2">
          <h1 className="text-2xl font-bold text-foreground">Print Options</h1>
          <p className="text-sm text-muted-foreground mt-1">Configure your document</p>
        </div>
        <PrintOptions config={config} onChange={setConfig} />
      </div>
      <div className="p-4 bg-background border-t border-border">
        <Button onClick={handleContinue} className="w-full h-14 text-lg font-bold rounded-2xl">
          Continue to Review
        </Button>
      </div>
    </div>
  );
}

export default function OptionsSelectionPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <OptionsSelectionContent />
    </Suspense>
  );
}
