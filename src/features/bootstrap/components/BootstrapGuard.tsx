"use client";
import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchBootstrapConfig } from "../services/bootstrapService";
import { SplashScreen } from "./SplashScreen";
import { MaintenanceScreen } from "./MaintenanceScreen";
import { ForceUpdateScreen } from "./ForceUpdateScreen";
import { NoInternetScreen } from "./NoInternetScreen";
export function BootstrapGuard({ children }: { children: React.ReactNode }) {
  const [isOffline, setIsOffline] = React.useState(false);
  React.useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    
    return () => { window.removeEventListener("online", handleOnline); window.removeEventListener("offline", handleOffline); };
  }, []);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["bootstrap"],
    queryFn: fetchBootstrapConfig,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours caching
  });

  if (isOffline) return <NoInternetScreen />;
  if (isLoading) return <SplashScreen />;
  if (isError) return <SplashScreen />; // Or generic retry screen
  if (data?.data.maintenance) return <MaintenanceScreen />;
  if (data?.data.force_update) return <ForceUpdateScreen />;
  return <>{children}</>;
}
