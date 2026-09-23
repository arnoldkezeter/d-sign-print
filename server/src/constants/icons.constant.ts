// Liste blanche des icônes lucide-react autorisées pour les services.
// Volontairement restreinte : évite qu'un admin saisisse un nom d'icône
// inexistant et casse le rendu côté client.
export const ALLOWED_ICONS = [
  "Printer",
  "Palette",
  "Image",
  "Video",
  "Megaphone",
  "PenTool",
  "Layers",
  "Sparkles",
  "Brush",
  "Camera",
  "FileImage",
  "Tag",
  "Package",
  "Star",
  "Shirt",
  "Presentation",
] as const;

export type AllowedIcon = (typeof ALLOWED_ICONS)[number];