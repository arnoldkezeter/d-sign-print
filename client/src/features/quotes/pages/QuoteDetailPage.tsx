import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuote, useUpdateQuote, useDeleteQuote } from "@/features/quotes/hooks/useQuotes";
import { QUOTE_STATUSES, QUOTE_STATUS_LABELS, QUOTE_STATUS_VARIANTS } from "@/constants/quote.constant";
import type { QuoteStatus } from "@/features/quotes/types/quote.types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ROUTES } from "@/constants/routes.constant";
import { ArrowLeft, Trash2 } from "lucide-react";

export function QuoteDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: quote, isLoading } = useQuote(id);
  const updateQuote = useUpdateQuote(id ?? "");
  const deleteQuote = useDeleteQuote();

  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (quote) setNotes(quote.adminNotes ?? "");
  }, [quote]);

  function handleDelete() {
    if (id && confirm("Supprimer définitivement cette demande ?")) {
      deleteQuote.mutate(id, { onSuccess: () => navigate(ROUTES.ADMIN.QUOTES) });
    }
  }

  if (isLoading || !quote) return <p className="text-muted-foreground">Chargement...</p>;

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={() => navigate(ROUTES.ADMIN.QUOTES)}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Retour
        </Button>
        <Button variant="ghost" size="icon" onClick={handleDelete}>
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Demande de {quote.fullName}</CardTitle>
            <Badge variant={QUOTE_STATUS_VARIANTS[quote.status]}>{QUOTE_STATUS_LABELS[quote.status]}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 text-sm">
            <div>
              <p className="text-muted-foreground">Email</p>
              <p className="font-medium">{quote.email}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Téléphone</p>
              <p className="font-medium">{quote.phone}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Prestation</p>
              <p className="font-medium">{quote.serviceLabel}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Quantité</p>
              <p className="font-medium">{quote.quantity}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Délai souhaité</p>
              <p className="font-medium">{quote.deadline || "Non précisé"}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Reçu le</p>
              <p className="font-medium">{new Date(quote.createdAt).toLocaleString("fr-FR")}</p>
            </div>
          </div>

          <div>
            <p className="mb-1 text-sm text-muted-foreground">Description du besoin</p>
            <p className="rounded-lg bg-muted/40 p-3 text-sm">{quote.description}</p>
          </div>

          {quote.attachments.length > 0 && (
            <div>
              <p className="mb-2 text-sm text-muted-foreground">Fichiers joints</p>
              <div className="flex flex-wrap gap-3">
                {quote.attachments.map((url) => (
                  <a key={url} href={url} target="_blank" rel="noreferrer">
                    <img src={url} alt="" className="h-20 w-20 rounded-lg border border-border object-cover" />
                  </a>
                ))}
              </div>
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="mb-1 text-sm text-muted-foreground">Statut</p>
              <Select
                value={quote.status}
                onValueChange={(value) => updateQuote.mutate({ status: value as QuoteStatus })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {QUOTE_STATUSES.map((s) => (
                    <SelectItem key={s} value={s}>
                      {QUOTE_STATUS_LABELS[s]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <p className="mb-1 text-sm text-muted-foreground">Notes internes</p>
            <Textarea rows={4} value={notes} onChange={(e) => setNotes(e.target.value)} />
            <Button
              size="sm"
              className="mt-2"
              disabled={updateQuote.isPending}
              onClick={() => updateQuote.mutate({ adminNotes: notes })}
            >
              Enregistrer les notes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
