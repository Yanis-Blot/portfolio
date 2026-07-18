import type { ComponentProps } from "react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ButtonVariant = Parameters<typeof buttonVariants>[0];

type ExternalLinkProps = ComponentProps<"a"> & {
  variant?: NonNullable<ButtonVariant>["variant"];
  size?: NonNullable<ButtonVariant>["size"];
};

/**
 * Lien externe stylé comme un bouton, avec les attributs de sécurité
 * `target="_blank"` + `rel="noopener noreferrer"` appliqués une seule fois.
 */
export function ExternalLink({
  className,
  variant = "outline",
  size,
  ...props
}: ExternalLinkProps) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
