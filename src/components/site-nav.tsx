"use client";

import { Menu } from "lucide-react";
import Link from "next/link";

import { useLanguage } from "@/components/language-provider";
import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { dictionary } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function SiteNav() {
  const { language } = useLanguage();
  const t = dictionary[language].nav;

  const items = [
    { href: "/#accueil", label: t.home },
    { href: "/#projets", label: t.projects },
    { href: "/#contact", label: t.contact },
  ];

  return (
    <>
      {/* Desktop */}
      <nav className="hidden items-center gap-1 md:flex">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "text-muted-foreground hover:text-foreground",
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Mobile */}
      <DropdownMenu>
        <DropdownMenuTrigger
          aria-label={t.menuLabel}
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            "md:hidden",
          )}
        >
          <Menu className="h-5 w-5" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {items.map((item) => (
            <DropdownMenuItem key={item.href} render={<Link href={item.href} />}>
              {item.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
