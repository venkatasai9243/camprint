// src/features/profile/components/PrivacySecurityCard.tsx
import React from 'react';
import { useSecurity } from '../hooks/useSecurity';
import { ShieldCheck, Smartphone, LogOut } from 'lucide-react';

export const PrivacySecurityCard = () => {
  const { security, logoutAll } = useSecurity();

  if (!security) return null;

  return (
    <div className="bg-card border border-border rounded-2xl p-4 shadow-sm mt-4">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0">
          <ShieldCheck className="w-4 h-4 text-red-600" />
        </div>
        <h3 className="font-bold text-foreground">Privacy & Security</h3>
      </div>

      <div className="flex flex-col gap-0 divide-y divide-border/50">
        <div className="flex items-center justify-between py-3">
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-foreground">OTP Login</span>
            <span className="text-xs text-muted-foreground">Secure passwordless entry</span>
          </div>
          <div className={`w-11 h-6 rounded-full bg-primary relative`}>
            <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white" />
          </div>
        </div>

        <div className="flex flex-col gap-2 py-3">
          <span className="text-sm font-semibold text-foreground">Active Sessions</span>
          <div className="flex flex-col gap-2">
            {security.connectedDevices.map(device => (
              <div key={device.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/30 border border-border/50">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-muted-foreground" />
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-foreground flex items-center gap-2">
                      {device.deviceName}
                      {device.isCurrentDevice && <span className="text-[9px] uppercase bg-green-100 text-green-700 px-1 py-0.5 rounded-sm">Current</span>}
                    </span>
                    <span className="text-[10px] text-muted-foreground">{device.browser} • {device.os}</span>
                  </div>
                </div>
                {!device.isCurrentDevice && (
                  <button className="text-xs text-red-500 font-semibold px-2 py-1 hover:bg-red-50 rounded-md">
                    Logout
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="py-3 pt-4">
          <button 
            onClick={logoutAll}
            className="w-full flex items-center justify-center gap-2 text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 py-2.5 rounded-xl transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout from all devices
          </button>
        </div>
      </div>
    </div>
  );
};
