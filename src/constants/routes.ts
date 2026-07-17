export const APP_ROUTES = {
  HOME: '/app/home',
  SERVICES: {
    HUB: '/app/services',
    MANUALS: '/app/services/manuals',
    HALL_TICKETS: '/app/services/hall-tickets',
    UPLOAD_PDF: '/app/services/upload',
    XEROX: '/app/services/xerox',
  },
  MANUALS_WORKFLOW: {
    BRANCH: '/app/services/manuals/branch',
    YEAR: '/app/services/manuals/year',
    SEMESTER: '/app/services/manuals/semester',
    SUBJECT: '/app/services/manuals/subject',
    MANUAL: '/app/services/manuals/manual',
    OPTIONS: '/app/services/manuals/options',
    REVIEW: '/app/services/manuals/review',
  },
  CART: '/app/cart',
  CHECKOUT: '/app/checkout',
  ORDERS: {
    LIST: '/app/orders',
    DETAILS: (id: string) => `/app/orders/${id}`
  }
} as const;

// Force rebuild
