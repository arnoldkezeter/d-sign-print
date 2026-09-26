import { useParams, Link } from "react-router-dom";
import { useServiceBySlug } from "@/features/services/hooks/useServices";
import { DynamicIcon } from "@/components/shared/DynamicIcon";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes.constant";
import { ArrowLeft } from "lucide-react";

export function ServiceDetailPage() {
  const { slug } = useParams();
  const { data: service, isLoading, isError } = useServiceBySlug(slug);

  if (isLoading) {
    return <p className="mx-auto max-w-3xl px-4 py-16 text-center text-muted-foreground">Chargement...</p>;
  }

  if (isError || !service) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p className="text-muted-foreground">Ce service est introuvable.</p>
        <Button variant="link" render={<Link to={ROUTES.SERVICES}>Retour aux prestations</Link>} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <Link to={ROUTES.SERVICES} className="mb-8 inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="mr-1 h-4 w-4" /> Toutes les prestations
      </Link>

      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <DynamicIcon name={service.icon} className="h-7 w-7" />
      </div>

      <h1 className="text-3xl font-bold">{service.title}</h1>
      <p className="mt-3 text-lg text-muted-foreground">{service.shortDescription}</p>

      <div className="prose prose-neutral mt-8 max-w-none whitespace-pre-line dark:prose-invert">
        {service.description}
      </div>

      <div className="mt-10 flex flex-col gap-3 rounded-2xl bg-muted/40 p-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="font-semibold">Intéressé par cette prestation ?</h3>
          <p className="text-sm text-muted-foreground">Recevez un devis personnalisé en quelques minutes.</p>
        </div>
        <Button render={<Link to={`${ROUTES.QUOTE}?service=${encodeURIComponent(service.title)}`}>Demander un devis</Link>} />
      </div>
    </div>
  );
}
