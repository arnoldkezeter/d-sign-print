import { Routes, Route } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { ProtectedRoute } from "@/components/shared/ProtectedRoute";
import { HomePage } from "@/components/pages/HomePage";
import { NotFoundPage } from "@/components/pages/NotFoundPage";
import { LoginPage } from "@/features/auth/pages/LoginPage";
import { DashboardPage } from "@/features/dashboard/pages/DashboardPage";
import { ROUTES } from "@/constants/routes.constant";

// Services
import { ServicesPage } from "@/features/services/pages/ServicesPage";
import { ServiceDetailPage } from "@/features/services/pages/ServiceDetailPage";
import { ServicesListPage } from "@/features/services/pages/ServicesListPage";
import { ServiceFormPage } from "@/features/services/pages/ServiceFormPage";

// Portfolio
import { PortfolioPage } from "@/features/portfolio/pages/PortfolioPage";
import { PortfolioListPage } from "@/features/portfolio/pages/PortfolioListPage";
import { PortfolioFormPage } from "@/features/portfolio/pages/PortfolioFormPage";

// Blog
import { BlogPage } from "@/features/blog/pages/BlogPage";
import { BlogDetailPage } from "@/features/blog/pages/BlogDetailPage";
import { BlogListPage } from "@/features/blog/pages/BlogListPage";
import { BlogFormPage } from "@/features/blog/pages/BlogFormPage";

// Testimonials (admin only, public display is on HomePage)
import { TestimonialsListPage } from "@/features/testimonials/pages/TestimonialsListPage";
import { TestimonialFormPage } from "@/features/testimonials/pages/TestimonialFormPage";

// Quotes
import { QuoteRequestPage } from "@/features/quotes/pages/QuoteRequestPage";
import { QuotesListPage } from "@/features/quotes/pages/QuotesListPage";
import { QuoteDetailPage } from "@/features/quotes/pages/QuoteDetailPage";

// Contact
import { ContactPageView } from "@/features/contact/pages/ContactPageView";
import { ContactMessagesPage } from "@/features/contact/pages/ContactMessagesPage";

// Settings & Users
import { SettingsPage } from "@/features/settings/pages/SettingsPage";
import { UsersPage } from "@/features/users/pages/UsersPage";

export function AppRouter() {
  return (
    <Routes>
      {/* Site public */}
      <Route element={<MainLayout />}>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.SERVICES} element={<ServicesPage />} />
        <Route path="/services/:slug" element={<ServiceDetailPage />} />
        <Route path={ROUTES.PORTFOLIO} element={<PortfolioPage />} />
        <Route path={ROUTES.BLOG} element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogDetailPage />} />
        <Route path={ROUTES.CONTACT} element={<ContactPageView />} />
        <Route path={ROUTES.QUOTE} element={<QuoteRequestPage />} />
      </Route>

      {/* Connexion */}
      <Route path={ROUTES.AUTH.LOGIN} element={<LoginPage />} />

      {/* Admin — protégé */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path={ROUTES.ADMIN.DASHBOARD} element={<DashboardPage />} />

          <Route path={ROUTES.ADMIN.SERVICES} element={<ServicesListPage />} />
          <Route path={ROUTES.ADMIN.SERVICE_NEW} element={<ServiceFormPage />} />
          <Route path="/admin/services/:id" element={<ServiceFormPage />} />

          <Route path={ROUTES.ADMIN.PORTFOLIO} element={<PortfolioListPage />} />
          <Route path={ROUTES.ADMIN.PORTFOLIO_NEW} element={<PortfolioFormPage />} />
          <Route path="/admin/portfolio/:id" element={<PortfolioFormPage />} />

          <Route path={ROUTES.ADMIN.TESTIMONIALS} element={<TestimonialsListPage />} />
          <Route path={ROUTES.ADMIN.TESTIMONIAL_NEW} element={<TestimonialFormPage />} />
          <Route path="/admin/testimonials/:id" element={<TestimonialFormPage />} />

          <Route path={ROUTES.ADMIN.BLOG} element={<BlogListPage />} />
          <Route path={ROUTES.ADMIN.BLOG_NEW} element={<BlogFormPage />} />
          <Route path="/admin/blog/:id" element={<BlogFormPage />} />

          <Route path={ROUTES.ADMIN.QUOTES} element={<QuotesListPage />} />
          <Route path="/admin/devis/:id" element={<QuoteDetailPage />} />

          <Route path={ROUTES.ADMIN.MESSAGES} element={<ContactMessagesPage />} />
          <Route path={ROUTES.ADMIN.USERS} element={<UsersPage />} />
          <Route path={ROUTES.ADMIN.SETTINGS} element={<SettingsPage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
