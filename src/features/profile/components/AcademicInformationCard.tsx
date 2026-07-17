// src/features/profile/components/AcademicInformationCard.tsx
import React from 'react';
import { useProfile } from '../hooks/useProfile';
import { GraduationCap, Building2, MapPin } from 'lucide-react';

export const AcademicInformationCard = () => {
  const { academic } = useProfile();

  if (!academic) return null;

  return (
    <div className="bg-card border border-border rounded-2xl p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
          <GraduationCap className="w-4 h-4 text-blue-600" />
        </div>
        <h3 className="font-bold text-foreground">Academic Information</h3>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <Building2 className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-foreground">{academic.collegeName}</span>
            <span className="text-xs text-muted-foreground">{academic.campusName}</span>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-foreground">{academic.branchName}</span>
            <span className="text-xs text-muted-foreground">{academic.departmentName}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-2">
          <div className="bg-muted/30 p-3 rounded-xl border border-border/50">
            <span className="block text-xs text-muted-foreground mb-1">Year</span>
            <span className="font-bold text-foreground">Year {academic.year}</span>
          </div>
          <div className="bg-muted/30 p-3 rounded-xl border border-border/50">
            <span className="block text-xs text-muted-foreground mb-1">Semester</span>
            <span className="font-bold text-foreground">Sem {academic.semester}</span>
          </div>
          <div className="bg-muted/30 p-3 rounded-xl border border-border/50">
            <span className="block text-xs text-muted-foreground mb-1">Section</span>
            <span className="font-bold text-foreground">{academic.section}</span>
          </div>
          <div className="bg-muted/30 p-3 rounded-xl border border-border/50">
            <span className="block text-xs text-muted-foreground mb-1">Roll Number</span>
            <span className="font-bold text-foreground">{academic.rollNumber}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
