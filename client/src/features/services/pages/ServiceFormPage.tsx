import { useParams, useNavigate } from "react-router-dom";
import { useService, useCreateService, useUpdateService } from "@/features/services/hooks/useServices";
import { ServiceForm } from "@/features/services/components/ServiceForm";
import type { ServiceFormValues } from "@/features/services/schemas/service.schema";
import { ROUTES } from "@/constants/routes.constant";

export function ServiceFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const { data: service, isLoading } = useService(id);
  const createService = useCreateService();
  const updateService = useUpdateService(id ?? "");

  function handleSubmit(values: ServiceFormValues) {
    const mutation = isEditMode ? updateService : createService;
    mutation.mutate(values, {
      onSuccess: () => navigate(ROUTES.ADMIN.SERVICES),
    });
  }

  if (isEditMode && isLoading) {
    return <p className="text-muted-foreground">Chargement...</p>;
  }

  // `service.icon` vient du backend en tant que `string` libre ; on le fait correspondre
  // à l'union restreinte du formulaire (liste fermée d'icônes autorisées).
  const defaultValues: Partial<ServiceFormValues> | undefined = service
    ? { ...service, icon: service.icon as ServiceFormValues["icon"] }
    : undefined;

  return (
    <div className="max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold">
        {isEditMode ? "Modifier le service" : "Nouveau service"}
      </h1>
      <ServiceForm
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
        isSubmitting={createService.isPending || updateService.isPending}
      />
    </div>
  );
}