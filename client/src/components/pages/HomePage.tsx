import { Link } from "react-router-dom";
import { usePublicServices } from "@/features/services/hooks/useServices";
import { useFeaturedPortfolio } from "@/features/portfolio/hooks/usePortfolio";
import { usePublicTestimonials } from "@/features/testimonials/hooks/useTestimonials";
import { useSettings } from "@/features/settings/hooks/useSettings";
import { DynamicIcon } from "@/components/shared/DynamicIcon";
import { StarRating } from "@/components/shared/StarRating";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ROUTES } from "@/constants/routes.constant";
import { ArrowRight } from "lucide-react";

export function HomePage() {
  const { data: settings } = useSettings();
  const { data: services } = usePublicServices();
  const { data: featuredPortfolio } = useFeaturedPortfolio();
  const { data: testimonials } = usePublicTestimonials();

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/5 via-brand-blue/5 to-brand-yellow/10 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            {settings?.tagline ?? "Votre partenaire en communication visuelle !"}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            De la conception graphique à l'impression grand format, {settings?.companyName ?? "D-Sign Print"} donne vie
            à votre communication visuelle avec qualité et rapidité.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button size="lg" render={<Link to={ROUTES.QUOTE}>Demander un devis gratuit</Link>} />
            <Button size="lg" variant="outline" render={<Link to={ROUTES.PORTFOLIO}>Voir nos réalisations</Link>} />
          </div>
        </div>
      </section>

      {/* Services teaser */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold">Nos prestations</h2>
          <p className="mt-3 text-muted-foreground">Un accompagnement complet pour votre image de marque.</p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services?.slice(0, 6).map((service) => (
            <Card key={service._id} className="transition-shadow hover:shadow-lg">
              <CardContent className="pt-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <DynamicIcon name={service.icon} className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold">{service.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{service.shortDescription}</p>
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

        <div className="mt-10 text-center">
          <Button variant="outline" render={<Link to={ROUTES.SERVICES}>Voir toutes nos prestations</Link>} />
        </div>
      </section>

      {/* Portfolio teaser */}
      {featuredPortfolio && featuredPortfolio.length > 0 && (
        <section className="bg-muted/30 px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold">Nos réalisations récentes</h2>
              <p className="mt-3 text-muted-foreground">Un aperçu de projets menés pour nos clients.</p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredPortfolio.map((item) => (
                <div key={item._id} className="group overflow-hidden rounded-xl border border-border bg-background">
                  <div className="aspect-[4/3] overflow-hidden bg-muted">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold">{item.title}</h3>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Button variant="outline" render={<Link to={ROUTES.PORTFOLIO}>Voir toutes nos réalisations</Link>} />
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {testimonials && testimonials.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold">Ce que disent nos clients</h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.slice(0, 6).map((testimonial) => (
              <Card key={testimonial._id}>
                <CardContent className="pt-6">
                  <StarRating rating={testimonial.rating} />
                  <p className="mt-4 text-sm italic text-muted-foreground">&laquo; {testimonial.content} &raquo;</p>
                  <div className="mt-4 flex items-center gap-3">
                    {testimonial.avatarUrl && (
                      <img src={testimonial.avatarUrl} alt="" className="h-10 w-10 rounded-full object-cover" />
                    )}
                    <div>
                      <p className="text-sm font-semibold">{testimonial.clientName}</p>
                      {testimonial.clientRole && <p className="text-xs text-muted-foreground">{testimonial.clientRole}</p>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 rounded-2xl bg-primary/10 p-10 text-center sm:p-16">
          <h2 className="text-2xl font-bold sm:text-3xl">Prêt à démarrer votre projet ?</h2>
          <p className="max-w-md text-muted-foreground">
            Contactez-nous dès aujourd'hui et recevez un devis personnalisé sous peu.
          </p>
          <Button size="lg" render={<Link to={ROUTES.QUOTE}>Demander un devis</Link>} />
        </div>
      </section>
    </div>
  );
}
