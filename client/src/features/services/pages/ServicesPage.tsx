import { Link } from "react-router-dom";
import { usePublicServices } from "@/features/services/hooks/useServices";
import { DynamicIcon } from "@/components/shared/DynamicIcon";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes.constant";
import { ArrowRight } from "lucide-react";

export function ServicesPage() {
  const { data: services, isLoading } = usePublicServices();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-bold sm:text-4xl">Nos prestations</h1>
        <p className="mt-4 text-muted-foreground">
          Du design graphique à l'impression grand format, D-Sign Print accompagne votre communication visuelle
          de A à Z.
        </p>
      </div>

      {isLoading ? (
        <p className="mt-12 text-center text-muted-foreground">Chargement...</p>
      ) : (
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services?.map((service) => (
            <Card key={service._id} className="flex flex-col transition-shadow hover:shadow-lg">
              <CardContent className="flex flex-1 flex-col pt-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <DynamicIcon name={service.icon} className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold">{service.title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{service.shortDescription}</p>
                <Link
                  to={ROUTES.SERVICE_DETAIL(service.slug)}
                  className="mt-4 inline-flex items-center text-sm font-medium text-primary hover:underline"
                >
                  En savoir plus <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="mt-16 flex flex-col items-center gap-4 rounded-2xl bg-muted/40 p-10 text-center">
        <h2 className="text-xl font-semibold">Un projet en tête ?</h2>
        <p className="max-w-md text-muted-foreground">
          Demandez un devis gratuit et recevez une réponse personnalisée sous peu.
        </p>
        <Button size="lg" render={<Link to={ROUTES.QUOTE}>Demander un devis</Link>} />
      </div>
    </div>
  );
}
