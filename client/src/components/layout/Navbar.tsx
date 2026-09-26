import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { ROUTES } from "@/constants/routes.constant";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/Logo";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Accueil", href: ROUTES.HOME },
  { label: "Services", href: ROUTES.SERVICES },
  { label: "Réalisations", href: ROUTES.PORTFOLIO },
  { label: "Blog", href: ROUTES.BLOG },
  { label: "Contact", href: ROUTES.CONTACT },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 px-4 py-3 backdrop-blur sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link to={ROUTES.HOME}>
          <Logo size="sm" />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              end={link.href === ROUTES.HOME}
              className={({ isActive }) =>
                cn("text-sm font-medium transition-colors", isActive ? "text-primary" : "text-muted-foreground hover:text-foreground")
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button render={<Link to={ROUTES.QUOTE}>Demander un devis</Link>} />
        </div>

        <button className="md:hidden" onClick={() => setIsOpen((v) => !v)} aria-label="Menu">
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isOpen && (
        <nav className="mx-auto mt-4 flex max-w-6xl flex-col gap-3 pb-2 md:hidden">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              end={link.href === ROUTES.HOME}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => cn("text-sm font-medium", isActive ? "text-primary" : "text-muted-foreground")}
            >
              {link.label}
            </NavLink>
          ))}
          <Button
            className="mt-2 w-full"
            render={
              <Link to={ROUTES.QUOTE} onClick={() => setIsOpen(false)}>
                Demander un devis
              </Link>
            }
          />
        </nav>
      )}
    </header>
  );
}
