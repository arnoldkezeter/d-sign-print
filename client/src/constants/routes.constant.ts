export const ADMIN_PATH_PREFIX = "/admin";

export const ROUTES = {
  HOME: "/",
  SERVICES: "/services",
  SERVICE_DETAIL: (slug: string) => `/services/${slug}`,
  PORTFOLIO: "/realisations",
  BLOG: "/blog",
  BLOG_DETAIL: (slug: string) => `/blog/${slug}`,
  CONTACT: "/contact",
  QUOTE: "/devis",

  AUTH: {
    LOGIN: "/login",
  },

  ADMIN: {
    DASHBOARD: `${ADMIN_PATH_PREFIX}/dashboard`,
    SERVICES: `${ADMIN_PATH_PREFIX}/services`,
    SERVICE_NEW: `${ADMIN_PATH_PREFIX}/services/new`,
    SERVICE_EDIT: (id: string) => `${ADMIN_PATH_PREFIX}/services/${id}`,
    PORTFOLIO: `${ADMIN_PATH_PREFIX}/portfolio`,
    PORTFOLIO_NEW: `${ADMIN_PATH_PREFIX}/portfolio/new`,
    PORTFOLIO_EDIT: (id: string) => `${ADMIN_PATH_PREFIX}/portfolio/${id}`,
    TESTIMONIALS: `${ADMIN_PATH_PREFIX}/testimonials`,
    TESTIMONIAL_NEW: `${ADMIN_PATH_PREFIX}/testimonials/new`,
    TESTIMONIAL_EDIT: (id: string) => `${ADMIN_PATH_PREFIX}/testimonials/${id}`,
    BLOG: `${ADMIN_PATH_PREFIX}/blog`,
    BLOG_NEW: `${ADMIN_PATH_PREFIX}/blog/new`,
    BLOG_EDIT: (id: string) => `${ADMIN_PATH_PREFIX}/blog/${id}`,
    QUOTES: `${ADMIN_PATH_PREFIX}/devis`,
    QUOTE_DETAIL: (id: string) => `${ADMIN_PATH_PREFIX}/devis/${id}`,
    MESSAGES: `${ADMIN_PATH_PREFIX}/messages`,
    USERS: `${ADMIN_PATH_PREFIX}/utilisateurs`,
    SETTINGS: `${ADMIN_PATH_PREFIX}/parametres`,
  },
} as const;
