// src/features/notifications/api/announcementApi.ts
import { Announcement } from '../types';
import { mockAnnouncements } from '../services/mockNotifications';

export const announcementApi = {
  getActiveAnnouncements: async (): Promise<Announcement[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...mockAnnouncements];
  }
};
