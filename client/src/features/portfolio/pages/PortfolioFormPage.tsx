import { useParams, useNavigate } from "react-router-dom";
import { usePortfolioItem, useCreatePortfolio, useUpdatePortfolio } from "@/features/portfolio/hooks/usePortfolio";
import { PortfolioForm } from "@/features/portfolio/components/PortfolioForm";
import type { PortfolioFormValues } from "@/features/portfolio/schemas/portfolio.schema";
import { ROUTES } from "@/constants/routes.constant";

export function PortfolioFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const { data: item, isLoading } = usePortfolioItem(id);
  const createPortfolio = useCreatePortfolio();
  const updatePortfolio = useUpdatePortfolio(id ?? "");

  function handleSubmit(values: PortfolioFormValues) {
    const mutation = isEditMode ? updatePortfolio : createPortfolio;
    mutation.mutate(values, { onSuccess: () => navigate(ROUTES.ADMIN.PORTFOLIO) });
  }

  if (isEditMode && isLoading) return <p className="text-muted-foreground">Chargement...</p>;

  return (
    <div className="max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold">{isEditMode ? "Modifier la réalisation" : "Nouvelle réalisation"}</h1>
      <PortfolioForm
        defaultValues={item}
        onSubmit={handleSubmit}
        isSubmitting={createPortfolio.isPending || updatePortfolio.isPending}
      />
    </div>
  );
}
