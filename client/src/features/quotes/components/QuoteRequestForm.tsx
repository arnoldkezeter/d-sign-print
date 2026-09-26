import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "react-router-dom";
import { quoteRequestFormSchema, type QuoteRequestFormValues } from "@/features/quotes/schemas/quote.schema";
import { useCreateQuote } from "@/features/quotes/hooks/useQuotes";
import { usePublicServices } from "@/features/services/hooks/useServices";
import { ImageUploader } from "@/components/shared/ImageUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2 } from "lucide-react";

export function QuoteRequestForm() {
  const [searchParams] = useSearchParams();
  const preselectedService = searchParams.get("service") ?? "";

  const { data: services } = usePublicServices();
  const createQuote = useCreateQuote();

  const form = useForm<QuoteRequestFormValues>({
    resolver: zodResolver(quoteRequestFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      service: null,
      serviceLabel: preselectedService,
      quantity: 1,
      description: "",
      deadline: "",
      attachments: [],
    },
  });

  function onSubmit(values: QuoteRequestFormValues) {
    createQuote.mutate(values, { onSuccess: () => form.reset() });
  }

  if (createQuote.isSuccess) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-muted/40 p-10 text-center">
        <CheckCircle2 className="h-10 w-10 text-primary" />
        <h3 className="text-xl font-semibold">Demande envoyée !</h3>
        <p className="max-w-md text-muted-foreground">
          Merci, votre demande de devis a bien été reçue. Notre équipe vous répondra très rapidement par email ou téléphone.
        </p>
        <Button variant="outline" onClick={() => createQuote.reset()}>
          Envoyer une nouvelle demande
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom complet</FormLabel>
                <FormControl>
                  <Input placeholder="Votre nom" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Téléphone</FormLabel>
                <FormControl>
                  <Input placeholder="+237 6XX XXX XXX" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="vous@exemple.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="serviceLabel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prestation souhaitée</FormLabel>
                {services && services.length > 0 ? (
                  <Select
                    onValueChange={(value) => {
                      const chosen = services.find((s) => s.title === value);
                      field.onChange(value);
                      form.setValue("service", chosen?._id ?? null);
                    }}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir une prestation" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service._id} value={service.title}>
                          {service.title}
                        </SelectItem>
                      ))}
                      <SelectItem value="Autre">Autre / à préciser</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <FormControl>
                    <Input placeholder="Ex: Impression de flyers" {...field} />
                  </FormControl>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantité souhaitée</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    value={field.value ?? 1}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Décrivez votre besoin</FormLabel>
              <FormControl>
                <Textarea rows={5} placeholder="Format, couleurs, quantité, finitions souhaitées..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="deadline"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Délai souhaité (optionnel)</FormLabel>
              <FormControl>
                <Input placeholder="Ex: sous 1 semaine, avant le 20 décembre..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="attachments"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fichiers utiles (logo, maquette...)</FormLabel>
              <FormControl>
                <ImageUploader folder="devis" value={field.value ?? []} onChange={field.onChange} multiple />
              </FormControl>
              <FormDescription>Optionnel — vous pouvez aussi les envoyer plus tard par WhatsApp.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {createQuote.isError && (
          <p className="text-sm text-destructive">Une erreur est survenue. Merci de réessayer.</p>
        )}

        <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={createQuote.isPending}>
          {createQuote.isPending ? "Envoi en cours..." : "Envoyer ma demande de devis"}
        </Button>
      </form>
    </Form>
  );
}
