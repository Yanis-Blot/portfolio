import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cookies } from "next/headers";

import { DotGrid } from "@/components/dot-grid";
import { LanguageProvider } from "@/components/language-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { LANGUAGE_COOKIE, isLanguage, type Language } from "@/lib/language";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yanis - Portfolio",
  description:
    "Portfolio personnel : CV, projets de machine learning et démos de modèles.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // La langue est lue depuis le cookie côté serveur pour rendre le bon `lang`
  // et éviter tout flash de langue à l'hydratation.
  const cookieStore = await cookies();
  const stored = cookieStore.get(LANGUAGE_COOKIE)?.value;
  const language: Language = isLanguage(stored) ? stored : "fr";

  return (
    <html
      lang={language}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="h-dvh flex flex-col bg-background text-foreground">
        <DotGrid />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider initialLanguage={language}>
            <SiteHeader />
            {children}
            <SiteFooter />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
