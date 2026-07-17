'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signupSchema, SignupFormData } from '@/features/auth/validators/authValidators';
import { authService } from '@/features/auth/services/authService';

export default function SignupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema)
  });

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      await authService.signUpWithEmail(data);
      setSuccessMsg("Check your email for the verification link!");
    } catch (err: any) {
      setError(err.message || 'Failed to sign up');
    } finally {
      setIsLoading(false);
    }
  };

  const onGoogleLogin = async () => {
    try {
      await authService.loginWithGoogle();
    } catch (err: any) {
      setError(err.message || 'Google signup failed');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-primary/20 blur-[100px] rounded-full" />
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-secondary/20 blur-[100px] rounded-full" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-card/40 backdrop-blur-2xl p-8 rounded-3xl border border-border/50 shadow-premium z-10"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black bg-gradient-to-br from-foreground to-foreground/50 bg-clip-text text-transparent mb-2">
            Join BLINTZY
          </h1>
          <p className="text-muted-foreground text-sm">Create an account to get started</p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-destructive/10 text-destructive rounded-lg text-sm text-center">
            {error}
          </div>
        )}
        
        {successMsg && (
          <div className="mb-4 p-4 bg-green-500/10 text-green-500 rounded-lg text-sm text-center font-medium">
            {successMsg}
          </div>
        )}

        <button 
          onClick={onGoogleLogin}
          className="w-full bg-white text-black py-3 rounded-xl font-bold mb-6 flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Sign up with Google
        </button>

        <div className="relative flex items-center py-2 mb-6">
          <div className="flex-grow border-t border-border"></div>
          <span className="flex-shrink-0 mx-4 text-muted-foreground text-xs uppercase">Or email</span>
          <div className="flex-grow border-t border-border"></div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input 
              {...register("email")}
              type="email"
              placeholder="Email address"
              className="w-full p-3 bg-secondary/50 rounded-xl border border-border focus:border-primary outline-none transition-all"
            />
            {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <input 
              {...register("password")}
              type="password"
              placeholder="Password"
              className="w-full p-3 bg-secondary/50 rounded-xl border border-border focus:border-primary outline-none transition-all"
            />
            {errors.password && <p className="text-xs text-destructive mt-1">{errors.password.message}</p>}
          </div>
          <div>
            <input 
              {...register("confirmPassword")}
              type="password"
              placeholder="Confirm Password"
              className="w-full p-3 bg-secondary/50 rounded-xl border border-border focus:border-primary outline-none transition-all"
            />
            {errors.confirmPassword && <p className="text-xs text-destructive mt-1">{errors.confirmPassword.message}</p>}
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-bold shadow-glow mt-4 disabled:opacity-50 transition-all"
          >
            {isLoading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-8">
          Already have an account?{' '}
          <Link href="/login" className="text-primary font-bold hover:underline">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
