import { Link } from "react-router-dom";
import { useSettings } from "@/features/settings/hooks/useSettings";
import { ROUTES } from "@/constants/routes.constant";
import { Logo } from "@/components/shared/Logo";
import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  const { data: settings } = useSettings();

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo size="sm" />
            <p className="mt-3 text-sm text-muted-foreground">
              {settings?.tagline ?? "Votre partenaire en communication visuelle"}
            </p>
            <div className="mt-4 flex gap-4 text-sm text-muted-foreground">
              {settings?.facebookUrl && (
                <a href={settings.facebookUrl} target="_blank" rel="noreferrer" className="hover:text-primary">
                  Facebook
                </a>
              )}
              {settings?.instagramUrl && (
                <a href={settings.instagramUrl} target="_blank" rel="noreferrer" className="hover:text-primary">
                  Instagram
                </a>
              )}
              {settings?.linkedinUrl && (
                <a href={settings.linkedinUrl} target="_blank" rel="noreferrer" className="hover:text-primary">
                  LinkedIn
                </a>
              )}
            </div>
          </div>


          <div>
            <p className="font-medium">Navigation</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link to={ROUTES.SERVICES} className="hover:text-foreground">Services</Link></li>
              <li><Link to={ROUTES.PORTFOLIO} className="hover:text-foreground">Réalisations</Link></li>
              <li><Link to={ROUTES.BLOG} className="hover:text-foreground">Blog</Link></li>
              <li><Link to={ROUTES.QUOTE} className="hover:text-foreground">Demander un devis</Link></li>
            </ul>
          </div>

          <div>
            <p className="font-medium">Contact</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {settings?.phone && (
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4" /> {settings.phone}
                </li>
              )}
              {settings?.email && (
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4" /> {settings.email}
                </li>
              )}
              {settings?.city && (
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" /> {settings.city}
                </li>
              )}
            </ul>
          </div>

          <div>
            <p className="font-medium">Horaires</p>
            <p className="mt-3 text-sm text-muted-foreground">{settings?.businessHours}</p>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} {settings?.companyName ?? "D-Sign Print"}. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
