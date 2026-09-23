import { Routes, Route } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { ProtectedRoute } from "@/components/shared/ProtectedRoute";
import { HomePage } from "@/components/pages/HomePage";
import { NotFoundPage } from "@/components/pages/NotFoundPage";
import { LoginPage } from "@/features/auth/pages/LoginPage";
import { DashboardPage } from "@/features/dashboard/pages/DashboardPage";
import { ROUTES } from "@/constants/routes.constant";
import { ServicesListPage } from "@/features/services/pages/ServicesListPage";
import { ServiceFormPage } from "@/features/services/pages/ServiceFormPage";

export function AppRouter() {
  return (
    <Routes>
      {/* Site public */}
      <Route element={<MainLayout />}>
        <Route path={ROUTES.HOME} element={<HomePage />} />
      </Route>

      {/* Connexion */}
      <Route path={ROUTES.AUTH.LOGIN} element={<LoginPage />} />

      {/* Admin — protégé */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path={ROUTES.ADMIN.DASHBOARD} element={<DashboardPage />} />
          <Route path="/admin/services" element={<ServicesListPage />} />
          <Route path="/admin/services/new" element={<ServiceFormPage />} />
          <Route path="/admin/services/:id" element={<ServiceFormPage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}