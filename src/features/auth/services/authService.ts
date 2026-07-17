import { authApi } from '../api/authApi';
import { formatSupabaseError } from '../../../lib/utils/supabaseErrors';
import { SignupFormData, LoginFormData } from '../validators/authValidators';
import { OnboardingStep1Data, OnboardingStep2Data } from '../validators/onboardingValidators';
import { createClient } from '../../../lib/supabase/client';

export const authService = {
  loginWithGoogle: async () => {
    try {
      return await authApi.signInWithGoogle();
    } catch (error) {
      throw formatSupabaseError(error);
    }
  },

  signUpWithEmail: async (credentials: SignupFormData) => {
    try {
      return await authApi.signUpWithEmail(credentials);
    } catch (error) {
      throw formatSupabaseError(error);
    }
  },

  signInWithEmail: async (credentials: LoginFormData) => {
    try {
      return await authApi.signInWithEmail(credentials);
    } catch (error) {
      throw formatSupabaseError(error);
    }
  },

  resetPassword: async (email: string) => {
    try {
      return await authApi.resetPassword(email);
    } catch (error) {
      throw formatSupabaseError(error);
    }
  },

  updatePassword: async (password: string) => {
    try {
      return await authApi.updatePassword(password);
    } catch (error) {
      throw formatSupabaseError(error);
    }
  },
  
  logout: async () => {
    try {
      return await authApi.signOut();
    } catch (error) {
      throw formatSupabaseError(error);
    }
  },

  getCurrentSession: async () => {
    try {
      return await authApi.getSession();
    } catch (error) {
      throw formatSupabaseError(error);
    }
  },

  // Onboarding Transaction
  submitOnboarding: async (
    userId: string,
    email: string,
    step1Data: OnboardingStep1Data,
    step2Data: OnboardingStep2Data,
    mappedSemesterId: string,
    mappedClassroomId: string
  ) => {
    const supabase = createClient();
    try {
      // 1. Insert into student_profiles
      const { error: profileError } = await supabase.from('student_profiles').insert({
        user_id: userId,
        full_name: step1Data.fullName,
        search_name: step1Data.fullName.toLowerCase(),
        email: email,
        phone_number: step1Data.phoneNumber,
        avatar_path: step1Data.avatarPath || null,
        profile_completed: true,
        profile_completion_percentage: 100,
      });

      if (profileError) throw profileError;

      // 2. Insert into student_academic_records
      const { error: academicError } = await supabase.from('student_academic_records').insert({
        student_id: userId,
        roll_number: step2Data.rollNumber,
        college_id: step2Data.collegeId,
        department_id: step2Data.departmentId,
        branch_id: step2Data.branchId,
        academic_year_id: step2Data.academicYearId,
        semester_id: mappedSemesterId,
        section_id: step2Data.sectionId,
        classroom_id: mappedClassroomId,
      });

      if (academicError) {
        // Rollback attempt if possible (note: true transactions require RPC in Supabase, but this is a dual insert approach)
        await supabase.from('student_profiles').delete().eq('user_id', userId);
        throw academicError;
      }

      return { success: true };
    } catch (error) {
      throw formatSupabaseError(error);
    }
  }
};
