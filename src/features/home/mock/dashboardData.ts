import { CurrentOrderDTO, QuickServiceDTO, AnnouncementDTO, SupportActionDTO, BaseResponseDTO } from '../dto';

export const MOCK_ACTIVE_ORDERS: BaseResponseDTO<CurrentOrderDTO[]> = {
  data: [
    {
      id: 'ORD-9912',
      document_name: 'Advanced Physics Manual',
      status: 'PRINTING',
      progress: 45,
      estimated_delivery_time: 'Today • 4:30 PM',
      amount: 145.00,
      date: '2026-07-09',
    },
    {
      id: 'ORD-9913',
      document_name: 'CS101 Assignment',
      status: 'RECEIVED',
      progress: 10,
      estimated_delivery_time: 'Tomorrow • 10:00 AM',
      amount: 25.00,
      date: '2026-07-10',
    }
  ],
  meta: { timestamp: new Date().toISOString(), version: '1.0' }
};

export const MOCK_QUICK_SERVICES: BaseResponseDTO<QuickServiceDTO[]> = {
  data: [
    { id: 'srv_1', title: 'Manuals', icon: 'Book', description: 'College Manuals', color: 'bg-blue-500', route: '/app/services/manuals', enabled: true, coming_soon: false, disabled: false, is_new: false, is_popular: true, is_recommended: false, requires_login: true, permissions: [], badge: 'Popular', analytics_key: 'srv_manuals' },
    { id: 'srv_2', title: 'Hall Tickets', icon: 'Ticket', description: 'Print instantly', color: 'bg-orange-500', route: '/app/services/hall-tickets', enabled: true, badge: 'Urgent', coming_soon: false, disabled: false, is_new: false, is_popular: false, is_recommended: true, requires_login: true, permissions: [], analytics_key: 'srv_tickets' },
    { id: 'srv_3', title: 'Custom Uploads', icon: 'Upload', description: 'Upload custom documents', color: 'bg-purple-500', route: '/app/services/upload', enabled: true, coming_soon: false, disabled: false, is_new: false, is_popular: false, is_recommended: false, requires_login: true, permissions: [], badge: 'Most Used', analytics_key: 'srv_upload' },
    { id: 'srv_4', title: 'Assignments', icon: 'Copy', description: 'Print assignments', color: 'bg-green-500', route: '/app/services/assignments', enabled: true, coming_soon: false, disabled: false, is_new: true, is_popular: false, is_recommended: false, requires_login: true, permissions: [], badge: 'New', analytics_key: 'srv_assignments' }
  ],
  meta: { timestamp: new Date().toISOString(), version: '1.0' }
};

export const MOCK_ANNOUNCEMENTS: BaseResponseDTO<AnnouncementDTO[]> = {
  data: [
    { id: 'ann_1', pinned: true, priority: 1, category: 'URGENT', title: 'Hall Tickets Released', markdown_content: 'For AIML 1st Year', cta_button_text: 'Print Now', cta_button_link: '/app/tickets' },
    { id: 'ann_2', pinned: false, priority: 2, category: 'INFO', title: 'Printer Maintenance', markdown_content: 'Library Printer' }
  ],
  meta: { timestamp: new Date().toISOString(), version: '1.0' }
};

export const MOCK_SUPPORT_ACTIONS: BaseResponseDTO<SupportActionDTO[]> = {
  data: [
    { type: 'WHATSAPP', enabled: true, label: 'WhatsApp', action_url: 'https://wa.me/1234567890' },
    { type: 'PHONE', enabled: true, label: 'Call Us', action_url: 'tel:+1234567890', support_hours: '9 AM - 6 PM' },
    { type: 'EMAIL', enabled: true, label: 'Email', action_url: 'mailto:support@blintzy.com' }
  ],
  meta: { timestamp: new Date().toISOString(), version: '1.0' }
};
