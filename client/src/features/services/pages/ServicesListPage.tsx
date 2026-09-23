import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminServices, useDeleteService } from "@/features/services/hooks/useServices";
import { DynamicIcon } from "@/components/shared/DynamicIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Pencil, Trash2 } from "lucide-react";

export function ServicesListPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading } = useAdminServices({ page, limit: 10, search });
  const deleteService = useDeleteService();

  function handleDelete(id: string) {
    if (confirm("Supprimer ce service ?")) {
      deleteService.mutate(id);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Services</h1>
        <Button onClick={() => navigate("/admin/services/new")}>
          <Plus className="mr-2 h-4 w-4" />
          Nouveau service
        </Button>
      </div>

      <Input
        placeholder="Rechercher un service..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        className="max-w-sm"
      />

      {isLoading ? (
        <p className="text-muted-foreground">Chargement...</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Icône</TableHead>
              <TableHead>Titre</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data.map((service) => (
              <TableRow key={service._id}>
                <TableCell>
                  <DynamicIcon name={service.icon} className="h-5 w-5" />
                </TableCell>
                <TableCell className="font-medium">{service.title}</TableCell>
                <TableCell>
                  <Badge variant={service.isActive ? "default" : "secondary"}>
                    {service.isActive ? "Actif" : "Inactif"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigate(`/admin/services/${service._id}`)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(service._id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {data && data.meta.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Précédent
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {data.meta.page} / {data.meta.totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page === data.meta.totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Suivant
          </Button>
        </div>
      )}
    </div>
  );
}