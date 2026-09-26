import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/Logo";
import { ROUTES } from "@/constants/routes.constant";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Printer,
  Image,
  Star,
  FileText,
  FileCheck,
  Mail,
  Users,
  Settings,
  LogOut,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Tableau de bord", href: ROUTES.ADMIN.DASHBOARD, icon: LayoutDashboard },
  { label: "Services", href: ROUTES.ADMIN.SERVICES, icon: Printer },
  { label: "Réalisations", href: ROUTES.ADMIN.PORTFOLIO, icon: Image },
  { label: "Témoignages", href: ROUTES.ADMIN.TESTIMONIALS, icon: Star },
  { label: "Blog", href: ROUTES.ADMIN.BLOG, icon: FileText },
  { label: "Devis", href: ROUTES.ADMIN.QUOTES, icon: FileCheck },
  { label: "Messages", href: ROUTES.ADMIN.MESSAGES, icon: Mail },
  { label: "Utilisateurs", href: ROUTES.ADMIN.USERS, icon: Users, adminOnly: true },
  { label: "Paramètres", href: ROUTES.ADMIN.SETTINGS, icon: Settings, adminOnly: true },
];

export function AdminLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="flex min-h-screen">
      <aside className="flex w-64 flex-col border-r border-border p-4">
        <div className="mb-6 px-2">
          <Logo size="sm" />
        </div>

        <nav className="flex-1 space-y-1">
          {NAV_ITEMS.filter((item) => !item.adminOnly || user?.role === "admin").map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )
              }
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="flex-1">
        <header className="flex items-center justify-between border-b border-border px-6 py-3">
          <span className="text-sm text-muted-foreground">
            Connecté en tant que <span className="font-medium text-foreground">{user?.name}</span>
          </span>
          <Button variant="outline" size="sm" onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />
            Déconnexion
          </Button>
        </header>
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
