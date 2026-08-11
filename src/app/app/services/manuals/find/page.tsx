"use client";
import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ProgressStepper } from '@/features/manuals/components/ProgressStepper';
import { MOCK_BRANCHES, MOCK_YEARS, MOCK_SEMESTERS } from '@/features/manuals/mock/manualsData';
import { APP_ROUTES } from '@/constants/routes';
import { Button } from '@/design-system/components/buttons/Button/Button';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

function FindManualContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedBranch, setSelectedBranch] = useState<string>(searchParams.get('branchId') || '');
  const [selectedYear, setSelectedYear] = useState<string>(searchParams.get('yearId') || '');
  const [selectedSemester, setSelectedSemester] = useState<string>(searchParams.get('semesterId') || '');

  const canContinue = selectedBranch && selectedYear && selectedSemester;

  const handleContinue = () => {
    if (!canContinue) return;
    router.push(`${APP_ROUTES.MANUALS_WORKFLOW.CHOOSE}?branchId=${selectedBranch}&yearId=${selectedYear}&semesterId=${selectedSemester}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background pb-safe">

      <ProgressStepper currentStep={1} totalSteps={2} />
      
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 pt-6 pb-4">
          <h2 className="text-2xl font-bold text-foreground">Find Your Manual</h2>
          <p className="text-sm text-muted-foreground mt-1">Choose your branch, year and semester</p>
        </div>

        <div className="px-4 flex flex-col gap-6 pb-24">
          {/* Branch Section */}
          <section>
            <h3 className="text-sm font-semibold mb-3 text-foreground tracking-wide">Branch</h3>
            <div className="flex flex-wrap gap-2.5">
              {MOCK_BRANCHES.map(branch => (
                <button
                  key={branch.id}
                  onClick={() => setSelectedBranch(branch.id)}
                  className={`h-11 px-4 rounded-xl text-[15px] font-medium transition-colors border shadow-sm ${
                    selectedBranch === branch.id
                      ? 'bg-primary text-primary-foreground border-primary ring-2 ring-primary/20 ring-offset-1'
                      : 'bg-white text-foreground border-border hover:bg-secondary/50'
                  }`}
                >
                  {branch.code}
                </button>
              ))}
            </div>
          </section>

          {/* Year Section */}
          <section>
            <h3 className="text-sm font-semibold mb-3 text-foreground tracking-wide">Year</h3>
            <div className="flex flex-wrap gap-2.5">
              {MOCK_YEARS.map(year => (
                <button
                  key={year.id}
                  onClick={() => setSelectedYear(year.id)}
                  className={`h-11 px-4 rounded-xl text-[15px] font-medium transition-colors border shadow-sm ${
                    selectedYear === year.id
                      ? 'bg-primary text-primary-foreground border-primary ring-2 ring-primary/20 ring-offset-1'
                      : 'bg-white text-foreground border-border hover:bg-secondary/50'
                  }`}
                >
                  {year.label}
                </button>
              ))}
            </div>
          </section>

          {/* Semester Section */}
          <section>
            <h3 className="text-sm font-semibold mb-3 text-foreground tracking-wide">Semester</h3>
            <div className="flex flex-wrap gap-2.5">
              {MOCK_SEMESTERS.map(semester => (
                <button
                  key={semester.id}
                  onClick={() => setSelectedSemester(semester.id)}
                  className={`h-11 px-4 rounded-xl text-[15px] font-medium transition-colors border shadow-sm ${
                    selectedSemester === semester.id
                      ? 'bg-primary text-primary-foreground border-primary ring-2 ring-primary/20 ring-offset-1'
                      : 'bg-white text-foreground border-border hover:bg-secondary/50'
                  }`}
                >
                  {semester.label}
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* Action Button */}
        <div className="px-4 pb-8 mt-8">
          <Button 
            onClick={handleContinue} 
            isDisabled={!canContinue}
            className="w-full h-[52px] text-lg font-bold rounded-2xl bg-[#FF6B00] text-white hover:bg-[#E66000] disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            Continue &rarr;
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function FindManualPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <FindManualContent />
    </Suspense>
  );
}
