"use client";

import { useLanguage } from "@/components/language-provider";
import { dictionary } from "@/lib/i18n";

export function SiteFooter() {
  const { language } = useLanguage();
  const t = dictionary[language];

  return (
    <footer className="border-t border-border/60 px-6 py-6 text-sm text-muted-foreground md:px-12">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between">
        <span>© {new Date().getFullYear()} Yanis</span>
        <span className="font-mono text-xs">{t.footer.builtWith}</span>
      </div>
    </footer>
  );
}
