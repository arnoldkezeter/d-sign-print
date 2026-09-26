import { ContactForm } from "@/features/contact/components/ContactForm";
import { useSettings } from "@/features/settings/hooks/useSettings";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import type { ComponentType } from "react";

export function ContactPageView() {
  const { data: settings } = useSettings();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-bold sm:text-4xl">Contactez-nous</h1>
        <p className="mt-4 text-muted-foreground">
          Une question, un projet ? Notre équipe vous répond rapidement.
        </p>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-5">
        <div className="lg:col-span-2 space-y-6">
          <InfoRow icon={MapPin} label="Adresse" value={`${settings?.address ?? ""}${settings?.address ? ", " : ""}${settings?.city ?? ""}`} />
          <InfoRow icon={Phone} label="Téléphone" value={settings?.phone} />
          <InfoRow icon={MessageCircle} label="WhatsApp" value={settings?.whatsapp} href={`https://wa.me/${settings?.whatsapp?.replace(/[^0-9]/g, "")}`} />
          <InfoRow icon={Mail} label="Email" value={settings?.email} href={`mailto:${settings?.email}`} />
          <InfoRow icon={Clock} label="Horaires" value={settings?.businessHours} />

          {settings?.mapUrl && (
            <div className="overflow-hidden rounded-xl border border-border">
              <iframe src={settings.mapUrl} className="h-64 w-full" loading="lazy" title="Localisation" />
            </div>
          )}
        </div>

        <div className="lg:col-span-3">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value?: string;
  href?: string;
}) {
  if (!value) return null;
  const content = (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 h-5 w-5 text-primary" />
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
  return href ? (
    <a href={href} target="_blank" rel="noreferrer" className="block hover:opacity-80">
      {content}
    </a>
  ) : (
    content
  );
}
