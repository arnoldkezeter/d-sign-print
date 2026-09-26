import { useState } from "react";
import { useAdminContactMessages, useMarkContactMessageAsRead, useDeleteContactMessage } from "@/features/contact/hooks/useContact";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Mail, MailOpen } from "lucide-react";

export function ContactMessagesPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useAdminContactMessages({ page, limit: 10 });
  const markAsRead = useMarkContactMessageAsRead();
  const deleteMessage = useDeleteContactMessage();

  function handleDelete(id: string) {
    if (confirm("Supprimer ce message ?")) deleteMessage.mutate(id);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Messages de contact</h1>
        <p className="text-sm text-muted-foreground">Messages envoyés depuis le formulaire de contact du site public.</p>
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">Chargement...</p>
      ) : (
        <div className="space-y-3">
          {data?.data.map((message) => (
            <Card key={message._id} className={!message.isRead ? "border-primary/40" : undefined}>
              <CardContent className="space-y-2">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-2">
                    {message.isRead ? (
                      <MailOpen className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Mail className="h-4 w-4 text-primary" />
                    )}
                    <div>
                      <p className="font-medium">{message.subject}</p>
                      <p className="text-xs text-muted-foreground">
                        {message.fullName} — {message.email} {message.phone && `— ${message.phone}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {!message.isRead && (
                      <Badge className="cursor-pointer" onClick={() => markAsRead.mutate(message._id)}>
                        Marquer comme lu
                      </Badge>
                    )}
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(message._id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
                <p className="text-sm">{message.message}</p>
                <p className="text-xs text-muted-foreground">{new Date(message.createdAt).toLocaleString("fr-FR")}</p>
              </CardContent>
            </Card>
          ))}

          {data?.data.length === 0 && <p className="text-muted-foreground">Aucun message pour le moment.</p>}
        </div>
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
