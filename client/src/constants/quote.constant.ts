export const QUOTE_STATUSES = [
  "en_attente",
  "en_cours_analyse",
  "devis_envoye",
  "accepte",
  "refuse",
  "termine",
] as const;

export const QUOTE_STATUS_LABELS: Record<(typeof QUOTE_STATUSES)[number], string> = {
  en_attente: "En attente",
  en_cours_analyse: "En cours d'analyse",
  devis_envoye: "Devis envoyé",
  accepte: "Accepté",
  refuse: "Refusé",
  termine: "Terminé",
};

export const QUOTE_STATUS_VARIANTS: Record<(typeof QUOTE_STATUSES)[number], "default" | "secondary" | "destructive" | "outline"> = {
  en_attente: "secondary",
  en_cours_analyse: "outline",
  devis_envoye: "default",
  accepte: "default",
  refuse: "destructive",
  termine: "secondary",
};
