import { cn } from "@/lib/utils";
import logoSrc from "@/assets/logo.jpeg";

interface LogoProps {
  className?: string;
  iconClassName?: string;
  /** Conservé pour compatibilité : le slogan « Donnez vie à vos projets » est déjà dans l'image du logo. */
  showTagline?: boolean;
  size?: "sm" | "md" | "lg";
}

const SIZE_MAP = {
  sm: "h-14 w-14",
  md: "h-20 w-20",
  lg: "h-40 w-40",
};

/**
 * Logo D-Sign Print : utilise directement l'image fournie (src/assets/logo.jpeg).
 * L'image est importée (et non référencée par une URL en dur) : Vite la traite
 * lui-même, et si le fichier est absent, l'erreur apparaît clairement au démarrage.
 * Pour changer de logo, remplacez simplement le fichier src/assets/logo.jpeg.
 */
export function Logo({ className, iconClassName, size = "md" }: LogoProps) {
  return (
    <div className={cn("flex items-center", className)}>
      <img
        src={logoSrc}
        alt="D-Sign Print - Donnez vie à vos projets"
        className={cn("shrink-0 object-contain", SIZE_MAP[size], iconClassName)}
      />
    </div>
  );
}