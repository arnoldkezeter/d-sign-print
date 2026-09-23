import * as Icons from "lucide-react";
import type { LucideProps } from "lucide-react";

interface DynamicIconProps extends LucideProps {
  name: string;
}

export function DynamicIcon({ name, ...props }: DynamicIconProps) {
  const IconComponent = (Icons as unknown as Record<string, Icons.LucideIcon>)[name];

  if (!IconComponent) {
    return <Icons.HelpCircle {...props} />; // fallback si icône inconnue
  }

  return <IconComponent {...props} />;
}