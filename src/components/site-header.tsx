import Link from "next/link";

import { LanguageToggle } from "@/components/language-toggle";
import { SiteNav } from "@/components/site-nav";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-border/60 bg-background/80 px-6 py-3 backdrop-blur md:px-12">
      <Link href="/#accueil" className="font-heading text-base font-semibold">
        Yanis
      </Link>
      <SiteNav />
      <div className="flex items-center gap-2">
        <LanguageToggle />
        <ThemeToggle />
      </div>
    </header>
  );
}
