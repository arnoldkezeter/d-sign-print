export const PORTFOLIO_CATEGORIES = [
  "impression",
  "design_graphique",
  "signaletique",
  "marquage_textile",
  "identite_visuelle",
  "autre",
] as const;

export const PORTFOLIO_CATEGORY_LABELS: Record<(typeof PORTFOLIO_CATEGORIES)[number], string> = {
  impression: "Impression",
  design_graphique: "Design graphique",
  signaletique: "Signalétique",
  marquage_textile: "Marquage textile",
  identite_visuelle: "Identité visuelle",
  autre: "Autre",
};
