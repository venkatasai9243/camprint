"use client";
import React, { Suspense, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { ManualCard } from '@/features/manuals/components/ManualCard';
import { MOCK_MANUALS, MOCK_SUBJECTS } from '@/features/manuals/mock/manualsData';
import { mapManual } from '@/features/manuals/mappers';
import { APP_ROUTES } from '@/constants/routes';

function ManualListContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const branchId = searchParams.get('branchId') || '';
  const yearId = searchParams.get('yearId') || '';
  const semesterId = searchParams.get('semesterId') || '';
  const subjectId = searchParams.get('subjectId') || '';

  const subject = MOCK_SUBJECTS.find(s => s.id === subjectId);

  // Filter manuals based on branch, year, semester, and subject
  const filteredManuals = useMemo(() => {
    return MOCK_MANUALS.filter(m => 
      m.branch_id === branchId && 
      m.year_id === yearId && 
      m.semester_id === semesterId &&
      m.subject_id === subjectId
    ).map(mapManual);
  }, [branchId, yearId, semesterId, subjectId]);

  const handleSelect = (manualId: string) => {
    // Navigate directly to OPTIONS with the selected params
    router.push(`${APP_ROUTES.MANUALS_WORKFLOW.OPTIONS}?branchId=${branchId}&yearId=${yearId}&semesterId=${semesterId}&subjectId=${subjectId}&manualId=${manualId}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background pb-safe">
      
      <div className="flex flex-col pt-4 px-4 pb-4 bg-background">
        <div className="flex items-center">
          <button 
            onClick={() => router.back()} 
            className="mr-3 w-8 h-8 flex items-center justify-center rounded-full bg-secondary text-foreground hover:bg-secondary/80 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex flex-col">
            <h2 className="text-xl font-bold text-foreground leading-tight">
              {subject ? `${subject.name} Manuals` : 'Manuals'}
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">Choose a manual to continue</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-8 mt-2">
        {/* Manuals List */}
        <div className="flex flex-col gap-4">
          {filteredManuals.map(manual => (
            <ManualCard key={manual.id} manual={manual} onClick={handleSelect} />
          ))}
          {filteredManuals.length === 0 && (
            <div className="text-center p-8 border border-dashed border-border rounded-2xl">
              <p className="text-muted-foreground">No matching manuals found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ManualListPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <ManualListContent />
    </Suspense>
  );
}
