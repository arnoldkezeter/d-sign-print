import axios from "axios";
import { ADMIN_PATH_PREFIX } from "@/constants/routes.constant";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  timeout: 15000,
});

export const AUTH_EXPIRED_EVENT = "auth:expired";

let isRefreshing = false;
let pendingQueue: Array<() => void> = [];

function resolveQueue() {
  pendingQueue.forEach((callback) => callback());
  pendingQueue = [];
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const isRefreshCall = originalRequest?.url?.includes("/auth/refresh");

    if (error.response?.status === 401 && !originalRequest._retry && !isRefreshCall) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve) => {
          pendingQueue.push(() => resolve(api(originalRequest)));
        });
      }

      isRefreshing = true;

      try {
        await api.post("/auth/refresh");
        isRefreshing = false;
        resolveQueue();
        return api(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        pendingQueue = [];

        // On ne force la redirection que si l'utilisateur est dans l'espace admin.
        // Sur le site public, un 401 est normal (visiteur non connecté) et ne doit
        // surtout pas le renvoyer vers /login alors qu'il navigue simplement sur /.
        const isInAdminArea = window.location.pathname.startsWith(ADMIN_PATH_PREFIX);

        if (isInAdminArea) {
          window.dispatchEvent(new Event(AUTH_EXPIRED_EVENT));
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);