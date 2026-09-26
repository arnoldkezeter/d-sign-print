import { QuoteRequestForm } from "@/features/quotes/components/QuoteRequestForm";

export function QuoteRequestPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold sm:text-4xl">Demander un devis</h1>
        <p className="mt-4 text-muted-foreground">
          Décrivez votre projet, nous vous répondrons avec une proposition adaptée à votre budget et vos délais.
        </p>
      </div>

      <div className="mt-12 rounded-2xl border border-border p-6 sm:p-10">
        <QuoteRequestForm />
      </div>
    </div>
  );
}
