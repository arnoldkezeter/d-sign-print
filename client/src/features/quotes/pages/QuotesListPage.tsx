import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminQuotes } from "@/features/quotes/hooks/useQuotes";
import { QUOTE_STATUSES, QUOTE_STATUS_LABELS, QUOTE_STATUS_VARIANTS } from "@/constants/quote.constant";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ROUTES } from "@/constants/routes.constant";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye } from "lucide-react";

export function QuotesListPage() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<string>("all");

  const { data, isLoading } = useAdminQuotes({ page, limit: 10, status: status === "all" ? undefined : status });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Demandes de devis</h1>
          <p className="text-sm text-muted-foreground">Toutes les demandes envoyées depuis le site public.</p>
        </div>

        <Select value={status} onValueChange={(v) => { setStatus(v ?? "all"); setPage(1); }}>
          <SelectTrigger className="w-56">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            {QUOTE_STATUSES.map((s) => (
              <SelectItem key={s} value={s}>
                {QUOTE_STATUS_LABELS[s]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">Chargement...</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Prestation</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data.map((quote) => (
              <TableRow key={quote._id}>
                <TableCell>
                  <div className="font-medium">{quote.fullName}</div>
                  <div className="text-xs text-muted-foreground">{quote.email}</div>
                </TableCell>
                <TableCell>{quote.serviceLabel}</TableCell>
                <TableCell>{new Date(quote.createdAt).toLocaleDateString("fr-FR")}</TableCell>
                <TableCell>
                  <Badge variant={QUOTE_STATUS_VARIANTS[quote.status]}>{QUOTE_STATUS_LABELS[quote.status]}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => navigate(ROUTES.ADMIN.QUOTE_DETAIL(quote._id))}>
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {data && data.meta.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
            Précédent
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {data.meta.page} / {data.meta.totalPages}
          </span>
          <Button variant="outline" size="sm" disabled={page === data.meta.totalPages} onClick={() => setPage((p) => p + 1)}>
            Suivant
          </Button>
        </div>
      )}
    </div>
  );
}
