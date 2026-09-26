import { useSettings } from "@/features/settings/hooks/useSettings";
import { MessageCircle } from "lucide-react";

export function WhatsAppFloatingButton() {
  const { data: settings } = useSettings();

  if (!settings?.whatsapp) return null;

  const phoneDigitsOnly = settings.whatsapp.replace(/[^0-9]/g, "");
  const message = encodeURIComponent(`Bonjour ${settings.companyName}, je souhaite avoir plus d'informations sur vos prestations.`);

  return (
    <a
      href={`https://wa.me/${phoneDigitsOnly}?text=${message}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Contacter sur WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105"
    >
      <MessageCircle className="h-7 w-7" fill="white" />
    </a>
  );
}
