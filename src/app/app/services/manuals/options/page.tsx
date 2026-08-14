"use client";
import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { PrintOptions } from '@/features/manuals/components/PrintOptions';
import { PrintConfig } from '@/features/manuals/types';
import { Button } from '@/design-system/components/buttons/Button/Button';
import { APP_ROUTES } from '@/constants/routes';
import { MOCK_MANUALS } from '@/features/manuals/mock/manualsData';
import { mapManual } from '@/features/manuals/mappers';
import { calculateManualPrice, getEstimatedDelivery } from '@/features/manuals/utils/priceEngine';

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

  const manualDTO = MOCK_MANUALS.find(m => m.id === manualId);
  const manual = manualDTO ? mapManual(manualDTO) : null;
  const priceBreakdown = manual ? calculateManualPrice(manual.basePrice, manual.pages, config) : null;
  const estimatedDelivery = getEstimatedDelivery();

  const handleContinue = () => {
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

  if (!manual || !priceBreakdown) return <div className="p-8 text-center">Manual not found</div>;

  return (
    <div className="flex flex-col min-h-screen bg-background pb-safe">
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 pt-6 pb-4">
          <h1 className="text-2xl font-bold text-foreground">Print Options</h1>
        </div>

        {/* Manual Information Card */}
        <div className="px-4 mb-4">
          <div className="bg-card rounded-2xl border border-border p-5 shadow-sm">
            <span className="text-xs font-bold text-primary tracking-wider uppercase mb-2 block">Manual</span>
            <h2 className="text-xl font-bold text-foreground leading-tight">{manual.name}</h2>
            <p className="text-sm font-semibold text-foreground mt-1">{subjectId.toUpperCase()}</p>
            <p className="text-sm text-muted-foreground mt-1">
              {branchId.toUpperCase()} • Year {yearId} • Semester {semesterId}
            </p>
          </div>
        </div>

        <PrintOptions config={config} onChange={setConfig} />

        {/* Price Breakdown */}
        <div className="px-4 mt-2 mb-6">
          <div className="bg-card rounded-2xl border border-border p-5 shadow-sm flex flex-col gap-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Base Manual</span>
              <span className="font-medium">₹{priceBreakdown.basePrice}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Printing</span>
              <span className="font-medium">₹{priceBreakdown.printingCost}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Spiral Binding</span>
              <span className="font-medium">₹{priceBreakdown.bindingCost}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Delivery</span>
              <span className="font-bold text-green-600">FREE</span>
            </div>
            <div className="border-t border-border/50 pt-3 flex justify-between items-center mt-1">
              <span className="font-bold text-foreground">Total</span>
              <span className="text-2xl font-black text-primary">₹{priceBreakdown.total}</span>
            </div>
          </div>
          
          <div className="mt-4 bg-secondary/20 rounded-xl p-4 flex flex-col items-center justify-center border border-secondary/30">
            <span className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Estimated Delivery</span>
            <span className="text-sm font-bold text-foreground">{estimatedDelivery}</span>
            <span className="text-xs text-muted-foreground mt-2 text-center">Need it urgently? Visit the print shop with your Order ID for assistance.</span>
          </div>
        </div>
      </div>
      <div className="p-4 bg-background border-t border-border sticky bottom-0 z-10">
        <Button onClick={handleContinue} className="w-full bg-primary text-primary-foreground h-14 text-lg font-bold rounded-2xl shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">
          Continue to Review →
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
