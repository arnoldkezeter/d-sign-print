import { useState } from "react";
import { Link } from "react-router-dom";
import { usePublicPortfolio } from "@/features/portfolio/hooks/usePortfolio";
import { PORTFOLIO_CATEGORIES, PORTFOLIO_CATEGORY_LABELS } from "@/constants/portfolio.constant";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes.constant";
import { cn } from "@/lib/utils";

export function PortfolioPage() {
  const [category, setCategory] = useState<string | undefined>(undefined);
  const { data: items, isLoading } = usePublicPortfolio(category);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-bold sm:text-4xl">Nos réalisations</h1>
        <p className="mt-4 text-muted-foreground">
          Un aperçu de projets menés pour nos clients à travers le Cameroun.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-2">
        <button
          onClick={() => setCategory(undefined)}
          className={cn(
            "rounded-full border px-4 py-1.5 text-sm transition-colors",
            !category ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-muted"
          )}
        >
          Tout
        </button>
        {PORTFOLIO_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm transition-colors",
              category === cat ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-muted"
            )}
          >
            {PORTFOLIO_CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      {isLoading ? (
        <p className="mt-12 text-center text-muted-foreground">Chargement...</p>
      ) : items && items.length > 0 ? (
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div key={item._id} className="group overflow-hidden rounded-xl border border-border">
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-primary">
                  {PORTFOLIO_CATEGORY_LABELS[item.category]}
                </p>
                <h3 className="mt-1 font-semibold">{item.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-12 text-center text-muted-foreground">Aucune réalisation dans cette catégorie pour le moment.</p>
      )}

      <div className="mt-16 flex flex-col items-center gap-4 rounded-2xl bg-muted/40 p-10 text-center">
        <h2 className="text-xl font-semibold">Votre projet pourrait être le prochain</h2>
        <Button size="lg" render={<Link to={ROUTES.QUOTE}>Demander un devis</Link>} />
      </div>
    </div>
  );
}
