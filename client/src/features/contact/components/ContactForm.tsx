import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormValues } from "@/features/contact/schemas/contact.schema";
import { useSendContactMessage } from "@/features/contact/hooks/useContact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CheckCircle2 } from "lucide-react";

export function ContactForm() {
  const sendMessage = useSendContactMessage();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { fullName: "", email: "", phone: "", subject: "", message: "" },
  });

  function onSubmit(values: ContactFormValues) {
    sendMessage.mutate(values, { onSuccess: () => form.reset() });
  }

  if (sendMessage.isSuccess) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-muted/40 p-10 text-center">
        <CheckCircle2 className="h-10 w-10 text-primary" />
        <h3 className="text-xl font-semibold">Message envoyé !</h3>
        <p className="max-w-md text-muted-foreground">Merci de nous avoir contactés, nous vous répondrons dans les plus brefs délais.</p>
        <Button variant="outline" onClick={() => sendMessage.reset()}>
          Envoyer un autre message
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom complet</FormLabel>
                <FormControl>
                  <Input {...field} />
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
                <FormLabel>Téléphone (optionnel)</FormLabel>
                <FormControl>
                  <Input {...field} />
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
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sujet</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea rows={5} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {sendMessage.isError && <p className="text-sm text-destructive">Une erreur est survenue. Merci de réessayer.</p>}

        <Button type="submit" size="lg" disabled={sendMessage.isPending}>
          {sendMessage.isPending ? "Envoi en cours..." : "Envoyer le message"}
        </Button>
      </form>
    </Form>
  );
}
