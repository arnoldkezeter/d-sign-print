import { useParams, useNavigate } from "react-router-dom";
import { useTestimonial, useCreateTestimonial, useUpdateTestimonial } from "@/features/testimonials/hooks/useTestimonials";
import { TestimonialForm } from "@/features/testimonials/components/TestimonialForm";
import type { TestimonialFormValues } from "@/features/testimonials/schemas/testimonial.schema";
import { ROUTES } from "@/constants/routes.constant";

export function TestimonialFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const { data: testimonial, isLoading } = useTestimonial(id);
  const createTestimonial = useCreateTestimonial();
  const updateTestimonial = useUpdateTestimonial(id ?? "");

  function handleSubmit(values: TestimonialFormValues) {
    const mutation = isEditMode ? updateTestimonial : createTestimonial;
    mutation.mutate(values, { onSuccess: () => navigate(ROUTES.ADMIN.TESTIMONIALS) });
  }

  if (isEditMode && isLoading) return <p className="text-muted-foreground">Chargement...</p>;

  return (
    <div className="max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold">{isEditMode ? "Modifier le témoignage" : "Nouveau témoignage"}</h1>
      <TestimonialForm
        defaultValues={testimonial}
        onSubmit={handleSubmit}
        isSubmitting={createTestimonial.isPending || updateTestimonial.isPending}
      />
    </div>
  );
}
