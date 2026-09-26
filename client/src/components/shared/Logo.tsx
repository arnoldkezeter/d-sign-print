import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  iconClassName?: string;
  showTagline?: boolean;
  size?: "sm" | "md" | "lg";
}

const SIZE_MAP = {
  sm: { icon: 28, text: "text-base" },
  md: { icon: 36, text: "text-xl" },
  lg: { icon: 52, text: "text-3xl" },
};

/**
 * Icône de marque : un tourbillon à trois couleurs (magenta, bleu, jaune) qui reprend
 * le motif du logo D-Sign Print sur les supports imprimés de l'entreprise.
 */
function LogoMark({ size = 36, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M24 4C13 4 4 12.5 4 23"
        stroke="hsl(var(--primary))"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M44 25c0 11-9 19-20 19"
        stroke="hsl(var(--brand-blue))"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M8 33a17 17 0 0 0 15 9"
        stroke="hsl(var(--brand-yellow))"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <circle cx="24" cy="24" r="6.5" fill="hsl(var(--primary))" />
    </svg>
  );
}

export function Logo({ className, iconClassName, showTagline = false, size = "md" }: LogoProps) {
  const { icon, text } = SIZE_MAP[size];

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <LogoMark size={icon} className={iconClassName} />
      <div className="leading-tight">
        <span className={cn("font-heading font-bold tracking-tight", text)}>
          D-Sign <span className="text-primary">Print</span>
        </span>
        {showTagline && (
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Donnez vie à vos projets
          </p>
        )}
      </div>
    </div>
  );
}
