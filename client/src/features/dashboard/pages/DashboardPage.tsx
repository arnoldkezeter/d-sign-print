import { useDashboardStats } from "@/features/dashboard/hooks/useDashboardStats";
import { QUOTE_STATUS_LABELS } from "@/constants/quote.constant";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ROUTES } from "@/constants/routes.constant";
import { Printer, Image, FileText, Star, Mail, FileCheck } from "lucide-react";

export function DashboardPage() {
  const { data: stats, isLoading } = useDashboardStats();

  const cards = [
    { label: "Services", value: stats?.servicesCount, icon: Printer, href: ROUTES.ADMIN.SERVICES },
    { label: "Réalisations", value: stats?.portfolioCount, icon: Image, href: ROUTES.ADMIN.PORTFOLIO },
    { label: "Articles de blog", value: stats?.blogPostsCount, icon: FileText, href: ROUTES.ADMIN.BLOG },
    { label: "Témoignages en attente", value: stats?.pendingTestimonialsCount, icon: Star, href: ROUTES.ADMIN.TESTIMONIALS },
    { label: "Messages non lus", value: stats?.unreadMessagesCount, icon: Mail, href: ROUTES.ADMIN.MESSAGES },
    { label: "Demandes de devis", value: stats?.totalQuotes, icon: FileCheck, href: ROUTES.ADMIN.QUOTES },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Tableau de bord</h1>
        <p className="text-sm text-muted-foreground">Aperçu de l'activité du site D-Sign Print.</p>
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">Chargement des statistiques...</p>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((card) => (
              <Link key={card.label} to={card.href}>
                <Card className="transition-shadow hover:shadow-md">
                  <CardContent className="flex items-center justify-between pt-4">
                    <div>
                      <p className="text-sm text-muted-foreground">{card.label}</p>
                      <p className="text-3xl font-bold">{card.value ?? 0}</p>
                    </div>
                    <card.icon className="h-8 w-8 text-primary/60" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Devis par statut</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-3">
                {stats &&
                  Object.entries(stats.quotesByStatus).map(([status, count]) => (
                    <div key={status} className="rounded-lg border border-border p-3 text-center">
                      <p className="text-2xl font-bold">{count}</p>
                      <p className="text-xs text-muted-foreground">
                        {QUOTE_STATUS_LABELS[status as keyof typeof QUOTE_STATUS_LABELS] ?? status}
                      </p>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
