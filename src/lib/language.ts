// Module neutre (pas de "use client") : importable côté serveur ET client.
// Un import de valeur depuis un module "use client" vers un composant serveur
// est remplacé par une référence client (proxy) — les constantes doivent donc
// vivre ici pour être lisibles dans le layout serveur.

export type Language = "fr" | "en";

export const LANGUAGE_COOKIE = "portfolio-language";

export function isLanguage(value: unknown): value is Language {
  return value === "fr" || value === "en";
}
