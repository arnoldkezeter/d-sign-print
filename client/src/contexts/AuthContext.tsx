import { createContext, useContext, useEffect, type ReactNode } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { authService } from "@/features/auth/services/auth.service";
import type { AuthUser, LoginPayload } from "@/features/auth/types/auth.types";
import { ROUTES } from "@/constants/routes.constant";
import { AUTH_EXPIRED_EVENT } from "@/lib/axios";

interface AuthContextValue {
  user: AuthUser | null | undefined;
  isLoading: boolean;
  isAuthenticated: boolean;
  isLoggingIn: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const AUTH_QUERY_KEY = ["auth", "me"];

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: user, isLoading } = useQuery({
    queryKey: AUTH_QUERY_KEY,
    queryFn: authService.getMe,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  // Écoute le signal envoyé par l'intercepteur Axios quand le refresh échoue.
  // Navigation SPA (pas de reload) → casse la boucle infinie.
  useEffect(() => {
    function handleAuthExpired() {
      queryClient.setQueryData(AUTH_QUERY_KEY, null);
      navigate(ROUTES.AUTH.LOGIN, { replace: true });
    }

    window.addEventListener(AUTH_EXPIRED_EVENT, handleAuthExpired);
    return () => window.removeEventListener(AUTH_EXPIRED_EVENT, handleAuthExpired);
  }, [navigate, queryClient]);

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      queryClient.setQueryData(AUTH_QUERY_KEY, data);
      navigate(ROUTES.ADMIN.DASHBOARD);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      queryClient.setQueryData(AUTH_QUERY_KEY, null);
      navigate(ROUTES.AUTH.LOGIN);
    },
  });

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        isLoggingIn: loginMutation.isPending,
        login: async (payload) => {
          await loginMutation.mutateAsync(payload);
        },
        logout: () => logoutMutation.mutate(),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth doit être utilisé dans AuthProvider");
  return context;
}