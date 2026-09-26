import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminTestimonials, useDeleteTestimonial, useUpdateTestimonial } from "@/features/testimonials/hooks/useTestimonials";
import { StarRating } from "@/components/shared/StarRating";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ROUTES } from "@/constants/routes.constant";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash2 } from "lucide-react";

export function TestimonialsListPage() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const { data, isLoading } = useAdminTestimonials({ page, limit: 10 });
  const deleteTestimonial = useDeleteTestimonial();

  function handleDelete(id: string) {
    if (confirm("Supprimer ce témoignage ?")) deleteTestimonial.mutate(id);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Témoignages clients</h1>
          <p className="text-sm text-muted-foreground">Modérez les avis avant qu'ils n'apparaissent sur le site public.</p>
        </div>
        <Button onClick={() => navigate(ROUTES.ADMIN.TESTIMONIAL_NEW)}>
          <Plus className="mr-2 h-4 w-4" />
          Nouveau témoignage
        </Button>
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">Chargement...</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Témoignage</TableHead>
              <TableHead>Note</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data.map((testimonial) => (
              <TestimonialRow key={testimonial._id} testimonial={testimonial} onDelete={handleDelete} navigate={navigate} />
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

function TestimonialRow({
  testimonial,
  onDelete,
  navigate,
}: {
  testimonial: import("@/features/testimonials/types/testimonial.types").Testimonial;
  onDelete: (id: string) => void;
  navigate: ReturnType<typeof useNavigate>;
}) {
  const updateTestimonial = useUpdateTestimonial(testimonial._id);

  return (
    <TableRow>
      <TableCell className="font-medium">{testimonial.clientName}</TableCell>
      <TableCell className="max-w-md truncate">{testimonial.content}</TableCell>
      <TableCell>
        <StarRating rating={testimonial.rating} />
      </TableCell>
      <TableCell>
        <button onClick={() => updateTestimonial.mutate({ isPublished: !testimonial.isPublished })}>
          <Badge variant={testimonial.isPublished ? "default" : "secondary"} className="cursor-pointer">
            {testimonial.isPublished ? "Publié" : "En attente"}
          </Badge>
        </button>
      </TableCell>
      <TableCell className="space-x-2 text-right">
        <Button variant="ghost" size="icon" onClick={() => navigate(ROUTES.ADMIN.TESTIMONIAL_EDIT(testimonial._id))}>
          <Pencil className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => onDelete(testimonial._id)}>
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </TableCell>
    </TableRow>
  );
}
