import { BaseResponseDTO } from '@/features/home/dto';
import { ServiceDTO, CategoryDTO, FeaturedServiceDTO } from '../dto';

export const MOCK_CATEGORIES: BaseResponseDTO<CategoryDTO[]> = {
  data: [
    { id: 'all', label: 'All', priority: 1 },
    { id: 'academic', label: 'Academic', priority: 2 },
    { id: 'exam', label: 'Exam', priority: 3 },
    { id: 'custom', label: 'Custom', priority: 4 },
    { id: 'popular', label: 'Popular', priority: 5 }
  ],
  meta: { timestamp: new Date().toISOString(), version: '1.0' }
};

export const MOCK_SERVICES: BaseResponseDTO<ServiceDTO[]> = {
  data: [
    {
      id: 'srv_manuals',
      title: 'Lab Manuals',
      subtitle: 'Print pre-approved manuals',
      description: 'Order printed & bound lab manuals directly from your college repository.',
      icon: 'Book',
      route: '/app/services/manuals',
      enabled: true,
      color: 'bg-blue-500',
      analytics_key: 'srv_manuals',
      permissions: ['student', 'faculty'],
      category_ids: ['all', 'academic', 'popular'],
      badge: 'Popular',
      estimated_time: '1-2 Days',
      estimated_price: 150
    },
    {
      id: 'srv_hall_tickets',
      title: 'Hall Tickets',
      subtitle: 'Instant exam entry',
      description: 'Print your exam hall ticket. Verified and stamped automatically.',
      icon: 'Ticket',
      route: '/app/services/hall-tickets',
      enabled: true,
      color: 'bg-orange-500',
      analytics_key: 'srv_hall_tickets',
      permissions: ['student'],
      category_ids: ['all', 'exam'],
      is_new: true,
      estimated_time: 'Instant'
    },
    {
      id: 'srv_xerox',
      title: 'Xerox & Print',
      subtitle: 'General printing',
      description: 'Upload any document for black & white or color printing.',
      icon: 'Copy',
      route: '/app/services/xerox',
      enabled: true,
      color: 'bg-green-500',
      analytics_key: 'srv_xerox',
      permissions: ['student', 'faculty', 'guest'],
      category_ids: ['all', 'custom']
    },
    {
      id: 'srv_upload_pdf',
      title: 'Upload PDF',
      subtitle: 'Custom document printing',
      description: 'Upload your own PDF files for custom printing options.',
      icon: 'Upload',
      route: '/app/services/upload',
      enabled: false,
      coming_soon: true,
      color: 'bg-purple-500',
      analytics_key: 'srv_upload',
      permissions: ['student', 'faculty'],
      category_ids: ['all', 'custom']
    }
  ],
  meta: { timestamp: new Date().toISOString(), version: '1.0' }
};

export const MOCK_FEATURED: BaseResponseDTO<FeaturedServiceDTO[]> = {
  data: [
    {
      id: 'feat_1',
      service_id: 'srv_hall_tickets',
      priority: 1,
      display_order: 1,
      campaign: 'Mid-Sem Exams'
    }
  ],
  meta: { timestamp: new Date().toISOString(), version: '1.0' }
};
