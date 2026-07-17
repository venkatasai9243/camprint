// src/features/profile/hooks/useProfile.ts
import { useProfileContext } from '../providers/ProfileProvider';

export const useProfile = () => {
  const { data, isLoading, error, refresh } = useProfileContext();
  return { 
    profile: data?.profile, 
    academic: data?.academic, 
    isLoading, 
    error,
    refresh
  };
};
