export const ADMIN_PATH_PREFIX = "/admin";

export const ROUTES = {
  HOME: "/",
  AUTH: {
    LOGIN: "/login",
  },
  ADMIN: {
    DASHBOARD: `${ADMIN_PATH_PREFIX}/dashboard`,
  },
} as const;