'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { 
  onboardingStep1Schema, 
  onboardingStep2Schema, 
  OnboardingStep1Data, 
  OnboardingStep2Data 
} from '@/features/auth/validators/onboardingValidators';
import { authService } from '@/features/auth/services/authService';
import { useAuthSession } from '@/features/auth/hooks/useAuthSession';

export default function OnboardingWizard() {
  const router = useRouter();
  const { user } = useAuthSession();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // State to hold data between steps
  const [step1Data, setStep1Data] = useState<OnboardingStep1Data | null>(null);
  const [step2Data, setStep2Data] = useState<OnboardingStep2Data | null>(null);

  const step1Form = useForm<OnboardingStep1Data>({
    resolver: zodResolver(onboardingStep1Schema),
  });

  const step2Form = useForm<OnboardingStep2Data>({
    resolver: zodResolver(onboardingStep2Schema),
  });

  const onStep1Submit = (data: OnboardingStep1Data) => {
    setStep1Data(data);
    setStep(2);
  };

  const onStep2Submit = (data: OnboardingStep2Data) => {
    setStep2Data(data);
    setStep(3);
  };

  const finalizeOnboarding = async () => {
    if (!user || !step1Data || !step2Data) return;
    
    setIsLoading(true);
    setError(null);
    try {
      // Step 3 logic: Backend mapped variables (mocked here, backend automatically resolves them usually, or we pass defaults)
      const mappedSemesterId = "00000000-0000-0000-0000-000000000001"; 
      const mappedClassroomId = "00000000-0000-0000-0000-000000000002"; 
      
      await authService.submitOnboarding(
        user.id,
        user.email || '',
        step1Data,
        step2Data,
        mappedSemesterId,
        mappedClassroomId
      );
      
      setStep(4); // Success step
      setTimeout(() => {
        router.push('/app/home');
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Failed to complete onboarding");
    } finally {
      setIsLoading(false);
    }
  };

  const slideVariants = {
    enter: { x: 50, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -50, opacity: 0 },
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-card/50 backdrop-blur-xl p-8 rounded-3xl border border-border/50 shadow-premium">
        
        {error && (
          <div className="mb-4 p-4 bg-destructive/10 text-destructive rounded-lg text-sm">
            {error}
          </div>
        )}

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-6">Personal Details</h2>
              <form onSubmit={step1Form.handleSubmit(onStep1Submit)} className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground">Full Name</label>
                  <input 
                    {...step1Form.register("fullName")}
                    className="w-full mt-1 p-3 bg-secondary rounded-lg border border-border focus:border-primary outline-none"
                    placeholder="Enter full name"
                  />
                  {step1Form.formState.errors.fullName && (
                    <p className="text-xs text-destructive mt-1">{step1Form.formState.errors.fullName.message}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Phone Number</label>
                  <input 
                    {...step1Form.register("phoneNumber")}
                    className="w-full mt-1 p-3 bg-secondary rounded-lg border border-border focus:border-primary outline-none"
                    placeholder="Enter phone number"
                  />
                  {step1Form.formState.errors.phoneNumber && (
                    <p className="text-xs text-destructive mt-1">{step1Form.formState.errors.phoneNumber.message}</p>
                  )}
                </div>
                <button 
                  type="submit"
                  className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-bold mt-6 shadow-glow"
                >
                  Continue
                </button>
              </form>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-6">Academic Details</h2>
              <form onSubmit={step2Form.handleSubmit(onStep2Submit)} className="space-y-4">
                {/* Simplified for brevity: in production these would be dropdowns fetching from DB */}
                <div>
                  <label className="text-sm text-muted-foreground">Roll Number</label>
                  <input 
                    {...step2Form.register("rollNumber")}
                    className="w-full mt-1 p-3 bg-secondary rounded-lg border border-border focus:border-primary outline-none"
                    placeholder="Enter roll number"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-bold mt-6 shadow-glow"
                >
                  Review
                </button>
                <button 
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full bg-transparent text-muted-foreground py-3 font-semibold mt-2"
                >
                  Back
                </button>
              </form>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-6">Review & Confirm</h2>
              <div className="space-y-3 bg-secondary/50 p-4 rounded-xl mb-6 text-sm">
                <p><span className="text-muted-foreground">Name:</span> {step1Data?.fullName}</p>
                <p><span className="text-muted-foreground">Phone:</span> {step1Data?.phoneNumber}</p>
                <p><span className="text-muted-foreground">Roll Number:</span> {step2Data?.rollNumber}</p>
                <hr className="border-border my-2" />
                <p className="text-xs text-muted-foreground">Semester and Classroom will be assigned automatically based on your section.</p>
              </div>
              <button 
                onClick={finalizeOnboarding}
                disabled={isLoading}
                className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-bold shadow-glow disabled:opacity-50"
              >
                {isLoading ? "Saving..." : "Complete Setup"}
              </button>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">🎉</span>
              </div>
              <h2 className="text-2xl font-bold mb-2">Welcome to BLINTZY</h2>
              <p className="text-muted-foreground">Taking you to your dashboard...</p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
