import { z } from 'zod';

export const onboardingStep1Schema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  phoneNumber: z.string().regex(/^[0-9+() -]{10,20}$/, 'Invalid phone number format'),
  avatarPath: z.string().optional(),
});

export const onboardingStep2Schema = z.object({
  collegeId: z.string().uuid('Please select a college'),
  departmentId: z.string().uuid('Please select a department'),
  branchId: z.string().uuid('Please select a branch'),
  academicYearId: z.string().uuid('Please select your academic year'),
  sectionId: z.string().uuid('Please select your section'),
  rollNumber: z.string().min(3, 'Roll number is required'),
});

export type OnboardingStep1Data = z.infer<typeof onboardingStep1Schema>;
export type OnboardingStep2Data = z.infer<typeof onboardingStep2Schema>;
