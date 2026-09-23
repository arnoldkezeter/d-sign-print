import { Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

export function AdminLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r border-border p-4">
        <p className="mb-6 font-heading text-lg font-semibold">D-sign Print</p>
        {/* Navigation admin complète à l'étape Dashboard */}
      </aside>
      <div className="flex-1">
        <header className="flex items-center justify-between border-b border-border px-6 py-3">
          <span className="text-sm text-muted-foreground">
            Connecté en tant que {user?.name}
          </span>
          <Button variant="outline" size="sm" onClick={logout}>
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