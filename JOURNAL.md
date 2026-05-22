# Journal de construction — `yanis-portfolio`

Comment l'utiliser

  - Lecture linéaire : suis les étapes 1 → 13 dans l'ordre — c'est la chronologie de
  construction.
  - Référence ciblée : la TOC en haut te permet de sauter directement à une feature.
  - Comprendre un fichier : la section "Glossaire des fichiers" liste chaque fichier
  avec son type (server/client) et son rôle.
  - Ajouter quelque chose : la section "Recettes pratiques" couvre les cas courants
  (nouveau projet, nouvelle langue, endpoint API).

  Structure de chaque étape

  Toutes les étapes suivent le même squelette pédagogique :
  1. Quoi : la feature et les fichiers concernés
  2. Pourquoi : le problème résolu / les alternatives rejetées
  3. Comment : la technique sous le capot
  4. Pièges : les erreurs subtiles à éviter

  C'est ce format qui te permettra de poser des questions précises plus tard (ex:
  "rappelle-moi l'étape 8 sur le piège de l'hydratation SSR").

  Ce qui n'est PAS dans le journal

  J'ai laissé hors du document :
  - Les corrections de bugs intermédiaires (icônes Lucide retirées, asChild qui ne
  marche plus avec Base UI — mentionnées comme contexte mais pas comme "étapes")
  - Les choses purement personnalisées par toi (ton vrai nom, ta bio, tes liens) — ce
  n'est pas du framework, c'est du contenu

  Pour la suite

  Quand tu ajouteras une feature significative (un endpoint API, un système
  d'analytics, une 3e langue, etc.), ajoute une Étape 14, 15... en bas, en suivant le
  même format. Tu construis ainsi un historique vivant de ton architecture, utile
  aussi bien pour toi dans 6 mois que pour un futur reviewer.

---

Document de référence pour comprendre **chaque feature** du projet, dans l'ordre logique où elle a été construite, avec le **pourquoi** derrière chaque décision.

---

## Table des matières

1. [Stack technique](#1-stack-technique)
2. [Structure des fichiers](#2-structure-des-fichiers)
3. [Étape 1 — Scaffold Next.js](#étape-1--scaffold-nextjs)
4. [Étape 2 — shadcn/ui](#étape-2--shadcnui)
5. [Étape 3 — Dark mode (next-themes)](#étape-3--dark-mode-next-themes)
6. [Étape 4 — Polices (next/font)](#étape-4--polices-nextfont)
7. [Étape 5 — Modèle de données des projets](#étape-5--modèle-de-données-des-projets)
8. [Étape 6 — Homepage initiale](#étape-6--homepage-initiale)
9. [Étape 7 — Background mosaïque de points](#étape-7--background-mosaïque-de-points)
10. [Étape 8 — Système multilingue FR/EN](#étape-8--système-multilingue-fren)
11. [Étape 9 — Vidéo locale (.mp4)](#étape-9--vidéo-locale-mp4)
12. [Étape 10 — Vidéo distincte par langue](#étape-10--vidéo-distincte-par-langue)
13. [Étape 11 — Décision architecturale : monolithe](#étape-11--décision-architecturale--monolithe)
14. [Étape 12 — Header/Footer dans le layout](#étape-12--headerfooter-dans-le-layout)
15. [Étape 13 — Folder `projects/`](#étape-13--folder-projects)
16. [Règles transversales](#règles-transversales)
17. [Recettes pratiques](#recettes-pratiques)
18. [Glossaire des fichiers](#glossaire-des-fichiers)

---

## 1. Stack technique

| Brique | Version / Choix | Raison |
|---|---|---|
| **Framework** | Next.js 16 — App Router | Le standard React moderne. Routing fichier, server components, code-splitting auto. |
| **Langage** | TypeScript | Sécurité au compile time. Catch les bugs avant exécution. |
| **Styling** | Tailwind CSS v4 | CSS utility-first. Pas de config JS, tout en CSS via `@theme inline`. |
| **UI primitives** | shadcn/ui (sur Base UI) | Composants accessibles **copiés** dans `src/components/ui/`, pas une dépendance npm. |
| **Theming** | next-themes | Bascule light/dark/system avec persistance localStorage. |
| **i18n** | Custom (Context + dictionary) | Suffisant pour 2 langues sur un portfolio. Pas besoin de next-intl. |
| **Polices** | Geist (sans + mono) via next/font | Self-hosted automatiquement, pas de requête vers Google au runtime. |
| **Icônes** | lucide-react + SVG inline pour les brands | Lucide a retiré les icônes brand (GitHub/LinkedIn) en 2025. |
| **Déploiement** | Vercel (free tier) | Build statique, code splitting auto, CDN global. |

---

## 2. Structure des fichiers

```
yanis-portfolio/
├── public/                         ← assets statiques servis à la racine URL
│   ├── intro-fr.mp4                ← vidéo de présentation FR
│   ├── intro-en.mp4                ← vidéo de présentation EN (à ajouter)
│   └── intro-{fr,en}-poster.jpg    ← images d'aperçu (optionnel)
│
├── src/
│   ├── app/                        ← routing App Router
│   │   ├── layout.tsx              ← root layout : header, footer, providers, dot grid
│   │   ├── page.tsx                ← homepage (route /)
│   │   ├── globals.css             ← Tailwind + tokens shadcn + custom dark variant
│   │   └── projects/
│   │       ├── layout.tsx          ← sub-layout : breadcrumb "Retour au portfolio"
│   │       └── <slug>/page.tsx     ← une démo par dossier
│   │
│   ├── components/
│   │   ├── dot-grid.tsx            ← background points (radial-gradient CSS)
│   │   ├── language-provider.tsx   ← Context + state + localStorage
│   │   ├── language-toggle.tsx     ← dropdown FR/EN
│   │   ├── theme-provider.tsx      ← wrapper next-themes
│   │   ├── theme-toggle.tsx        ← dropdown Light/Dark/System
│   │   ├── site-header.tsx         ← header sticky avec toggles
│   │   ├── site-footer.tsx         ← footer avec copyright + "Built with"
│   │   ├── project-card.tsx        ← card multi-mode (internal/external/embed)
│   │   └── ui/                     ← shadcn primitives (button, card, dropdown-menu)
│   │
│   ├── data/
│   │   └── projects.ts             ← liste des projets + types
│   │
│   └── lib/
│       ├── i18n.ts                 ← dictionnaire FR/EN
│       └── utils.ts                ← `cn()` helper (shadcn)
│
└── package.json
```

---

## Étape 1 — Scaffold Next.js

### Commande utilisée

```powershell
npx create-next-app@latest yanis-portfolio --typescript --tailwind --app --eslint --src-dir --import-alias "@/*" --use-npm --turbopack --yes
```

### Ce que ça met en place

- Routing **App Router** (le moderne, basé sur folders)
- Dossier `src/` pour séparer code et configs
- Alias `@/*` → `src/*` (chemin court pour les imports)
- Tailwind CSS v4 préconfiguré
- Turbopack comme bundler (plus rapide que Webpack)

### Pourquoi pas Pages Router ?

App Router est l'avenir de Next.js : server components, layouts en cascade, streaming, route handlers. Pages Router reste supporté mais on perd les nouveautés.

---

## Étape 2 — shadcn/ui

### Commandes

```powershell
npx shadcn@latest init -d
npx shadcn@latest add button card dropdown-menu
```

### Ce que c'est, vraiment

shadcn n'est PAS une bibliothèque npm. C'est un **générateur de code**. Il **copie** des composants stylés dans `src/components/ui/`, et tu en es propriétaire. Tu peux les modifier, les forker, les supprimer — pas de version à mettre à jour.

### Sous le capot : Base UI

shadcn 2025 utilise **Base UI** (de la team Material UI) comme primitives d'accessibilité, **PAS Radix** (comme dans les vieux tutos). Conséquence directe :

| Avant (Radix) | Maintenant (Base UI) |
|---|---|
| `<Button asChild>` pour styler un `<a>` | **N'existe pas**. À la place : appliquer `buttonVariants()` directement sur le `<a>`. |

D'où dans notre code partout :
```tsx
<a className={cn(buttonVariants({ variant: "outline" }))} href="...">
```

au lieu de :
```tsx
<Button asChild><a href="...">...</a></Button>   // ne marche PAS
```

---

## Étape 3 — Dark mode (next-themes)

### Fichiers concernés

- `src/components/theme-provider.tsx` — wrapper minimaliste
- `src/components/theme-toggle.tsx` — dropdown Light / Dark / System
- `src/app/layout.tsx` — englobe `{children}` avec `<ThemeProvider>`
- `src/app/globals.css` — variables CSS `:root` (light) et `.dark` (dark)

### Comment ça marche en 4 étapes

1. `<ThemeProvider attribute="class">` ajoute une classe `dark` sur `<html>` quand le thème est sombre.
2. Tailwind v4 a un `@custom-variant dark (&:is(.dark *))` dans `globals.css` — donc `dark:bg-zinc-900` réagit à cette classe.
3. shadcn fournit des **tokens sémantiques** : `bg-background`, `text-foreground`, `bg-card`, etc. Ils pointent vers des variables CSS différentes selon `:root` ou `.dark`.
4. `localStorage.theme` mémorise le choix entre sessions.

### Le piège évité : flash on load

next-themes injecte un **script bloquant** dans `<head>` qui applique la classe `.dark` AVANT le premier paint. Sans ça, le user verrait un flash blanc avant que React n'hydrate. C'est pour ça qu'on a `suppressHydrationWarning` sur `<html>` dans `layout.tsx`.

---

## Étape 4 — Polices (next/font)

### Code dans `layout.tsx`

```tsx
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({ variable: "--font-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
```

### Ce que ça fait

`next/font` **télécharge les fichiers de police au moment du build** et les sert depuis ton propre domaine. Conséquences :

- **Pas de requête vers Google Fonts au runtime** → meilleur RGPD + perf
- **Pas de FOUT** (Flash of Unstyled Text) → la police arrive instantanément
- Variable CSS `--font-sans` exposée → Tailwind l'utilise via `font-sans`

### Le binding avec shadcn

`globals.css` mappe `--font-sans` → `var(--font-sans)`. Quand on définit la variable côté layout, shadcn pioche automatiquement la bonne police.

---

## Étape 5 — Modèle de données des projets

### `src/data/projects.ts`

```ts
export type ProjectLink =
  | { kind: "internal"; path: string }       // démo dans cette app
  | { kind: "external"; url: string }        // GitHub, HF Space, etc.
  | { kind: "embed"; embedUrl: string };     // iframe

export type Project = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  link: ProjectLink;
  thumbnail?: string;
};
```

### Le concept : **discriminated union** (ou "tagged union")

Un type qui peut prendre plusieurs formes, **distinguées par un champ commun** (`kind` ici). C'est l'équivalent TypeScript des `enum` du Rust ou des `sum types` de Haskell.

### Pourquoi c'est puissant

Quand tu écris dans `ProjectCard` :

```tsx
if (project.link.kind === "internal") {
  // ici TypeScript SAIT que project.link.path existe
  // et que url / embedUrl N'existent PAS
}
```

TypeScript fait du **narrowing automatique**. Tu ne peux pas oublier un cas, et tu ne peux pas accéder à un champ qui n'existe pas dans ta branche. C'est plus sûr que des `Project[]` avec tous les champs optionnels.

---

## Étape 6 — Homepage initiale

### Structure

Quatre `<section>` verticales empilées dans `src/app/page.tsx` :

1. **Hero / CV** — greeting + titre + bio + 3 boutons (mail, GitHub, LinkedIn)
2. **Vidéo de présentation** — `<video>` element
3. **Projets** — grille responsive de `<ProjectCard>` mappée depuis `projects.ts`
4. **Footer** — déplacé plus tard dans le layout (étape 12)

### Icônes brand : SVG inline

Lucide a retiré `Github` et `Linkedin` de ses exports en 2025 (politique de neutralité de marques). Solution : deux composants SVG inline dans `page.tsx` :

```tsx
function GithubIcon({ className }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="currentColor" ...>...</svg>;
}
```

Trade-off : ~30 lignes de SVG en plus, mais 0 dépendance externe.

---

## Étape 7 — Background mosaïque de points

### Fichier : `src/components/dot-grid.tsx`

```tsx
export function DotGrid() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10
                 bg-[radial-gradient(circle,_var(--foreground)_1px,_transparent_1.5px)]
                 bg-[size:24px_24px]
                 opacity-[0.12]"
    />
  );
}
```

### La technique pure CSS

**Deux lignes** font tout le boulot :

1. `radial-gradient(circle, currentColor 1px, transparent 1.5px)` dessine **un seul point** (cercle plein jusqu'à 1px, transparent au-delà de 1.5px — l'entre-deux fait l'anti-aliasing).
2. `background-size: 24px 24px` tuile ce point infiniment.

**Rendu GPU**, **zéro JS**, **zéro coût de perf**.

### Les paramètres à tweaker

| Variable | Rôle | Valeurs typiques |
|---|---|---|
| Rayon du point | Densité visuelle | `0.5px` → `2px` |
| `background-size` | Espacement | `16px` → `40px` |
| `opacity` | Subtilité | `0.05` → `0.30` |

### Theme-aware automatique

`var(--foreground)` = token shadcn qui vaut presque-noir en light, presque-blanc en dark. Aucune logique conditionnelle à écrire.

### Les classes annexes

- `fixed inset-0` → reste collé au viewport, ne scrolle pas
- `-z-10` → derrière tout le contenu
- `pointer-events-none` → **critique** : sans ça, le div mangerait tous les clics

---

## Étape 8 — Système multilingue FR/EN

### Quatre fichiers en jeu

| Fichier | Rôle |
|---|---|
| `src/components/language-provider.tsx` | Context React + state + persistance localStorage |
| `src/lib/i18n.ts` | Dictionnaire FR/EN typé strictement |
| `src/components/language-toggle.tsx` | Dropdown FR/EN dans le header |
| Composants consommateurs | `useLanguage()` + `dictionary[language]` |

### Anatomie du Provider

```tsx
"use client";

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState<Language>("fr");

  useEffect(() => {
    const stored = localStorage.getItem("portfolio-language");
    if (stored === "fr" || stored === "en") setLanguageState(stored);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("portfolio-language", lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
```

### Pourquoi un Context et pas des props

Le bouton de langue est dans le header, le texte est dans la page, le footer aussi peut consommer. Faire passer la langue en `props` à travers ces 3 endroits = **prop-drilling**. Context = canal partagé que n'importe quel descendant peut lire.

### Le piège de l'hydratation SSR

- **Serveur** rend `language === "fr"` (le défaut)
- **Client** veut lire `localStorage` (qui n'existe pas sur serveur)

Si on initialise `useState` avec `localStorage.getItem(...)`, le rendu client diffère du HTML serveur → **hydration mismatch**.

Solution adoptée : SSR rend toujours "fr", puis `useEffect` corrige côté client après mount. Coût : un flash de ~1 frame si l'utilisateur avait choisi EN. Acceptable pour un portfolio.

### Le dictionnaire typé

```ts
export const dictionary = {
  fr: { hero: { ... }, video: { ... }, ... },
  en: { hero: { ... }, video: { ... }, ... },
} as const;

export type Dictionary = (typeof dictionary)["fr"];
```

`as const` fige les valeurs en types littéraux → autocomplétion sur `t.hero.title`. Le type extrait de `fr` **force `en` à avoir exactement la même structure** : si tu oublies une clé, TypeScript hurle au build.

### Le hook custom

```tsx
export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
```

Le `if (!ctx)` est de la **programmation défensive** : si quelqu'un appelle le hook hors du Provider, on lève une erreur explicite au lieu d'un obscur `Cannot read properties of null`.

---

## Étape 9 — Vidéo locale (.mp4)

### Pourquoi local plutôt qu'embed YouTube

| Critère | Local | YouTube |
|---|---|---|
| Contrôle visuel | Total | Logo + suggestions imposés |
| RGPD / cookies | Zéro | Bannière obligatoire en EU |
| Bundle JS | Léger | +500 KB du player YouTube |
| Adaptive bitrate | Non | Oui |
| Découvrabilité | Aucune | Bonus SEO YouTube |

Pour un portfolio FR/BE court : **local gagne**.

### Markup utilisé

```tsx
<video
  controls
  preload="metadata"
  poster="/intro-fr-poster.jpg"
  className="h-full w-full"
>
  <source src="/intro-fr.mp4" type="video/mp4" />
  {t.video.fallback}
</video>
```

| Attribut | Effet |
|---|---|
| `controls` | Barre native (play/pause/volume/fullscreen) |
| `preload="metadata"` | Charge juste durée + dimensions, pas la vidéo entière |
| `poster` | Image affichée avant play (sinon rectangle noir) |
| `<source>` | Permet d'ajouter des formats alternatifs (.webm) plus tard |
| Le texte enfant | Fallback pour très vieux navigateurs |

### Encodage recommandé

```bash
ffmpeg -i input.mov -vcodec libx264 -crf 23 -preset slow \
       -acodec aac -b:a 128k -movflags +faststart \
       -vf "scale='min(1280,iw)':-2" public/intro-fr.mp4
```

`-movflags +faststart` est crucial : déplace les métadonnées au début du fichier pour démarrage instantané.

### Le piège du dossier `public/`

Les fichiers doivent être dans `public/`, **pas à la racine du projet**. Next.js ne sert que `public/`. Le `/` dans `src="/intro.mp4"` = racine URL du site, **pas** racine filesystem.

---

## Étape 10 — Vidéo distincte par langue

### Le pattern

Ajouter `src` et `poster` au **dictionnaire**, puisque la vidéo est du contenu qui dépend de la langue :

```ts
fr: { video: { ..., src: "/intro-fr.mp4", poster: "/intro-fr-poster.jpg" } }
en: { video: { ..., src: "/intro-en.mp4", poster: "/intro-en-poster.jpg" } }
```

Et dans `page.tsx` :

```tsx
<video
  key={language}              // ← LE détail technique critique
  src={t.video.src}
  poster={t.video.poster}
  ...
/>
```

### Pourquoi `key={language}`

React réconcilie les éléments par position dans l'arbre virtuel. Pour un `<video>` qui reste un `<video>` au même endroit, React conclut "même nœud, je mets juste à jour les attributs". Or **`<video>` ne recharge PAS automatiquement quand son `<source>` change** — c'est une spécificité du DOM HTML.

Le `key={language}` force React à **démonter** l'ancien `<video>` et en **monter** un nouveau quand la langue change. Le navigateur charge alors proprement le nouveau fichier.

> **Règle générale** : à chaque media element (`<video>`, `<audio>`, `<iframe>`) dont la source dépend d'un state, mettre un `key` qui suit cette source.

---

## Étape 11 — Décision architecturale : monolithe

### Le choix

Une **seule app Next.js** contient le portfolio + toutes les démos, organisées par routing. PAS plusieurs apps séparées.

### Pourquoi pas l'archipel (plusieurs apps)

| Coût caché de l'archipel | Conséquence |
|---|---|
| Design system dupliqué | Changer une couleur = 5 fichiers, 5 redéploiements |
| Navigation entre démos | Full reload (vs `<Link>` instantané dans le monolithe) |
| Mises à jour | 5 `package.json`, 5 migrations Next.js |
| Maintenance | 5 projets Vercel, 5 CIs |

### L'argument "isolation des bundles lourds" est faux

Next.js fait du **code-splitting automatique par route**. Une démo qui importe `transformers.js` (800 KB) ne pollue PAS la homepage : ce code n'est téléchargé QUE par les visiteurs de cette démo.

### L'escape hatch

Une démo qui nécessite un **vrai backend lourd** (GPU, modèle hébergé) sort du monolithe :
- Portfolio Next.js reste sur Vercel
- Modèle vit sur HuggingFace Space, Modal, Replicate
- La carte projet pointe vers eux en `external` ou `embed`

C'est exactement le pattern que `ProjectLink` permet.

---

## Étape 12 — Header/Footer dans le layout

### Le refactor

**Avant** : header + footer dans `page.tsx` → visibles uniquement sur la homepage.

**Après** : extraits dans `src/components/site-header.tsx` + `site-footer.tsx`, montés dans `src/app/layout.tsx` → visibles sur **toutes les pages**.

### La règle App Router

> Ce qui est **partagé** entre routes → `layout.tsx`. Ce qui est **spécifique** à une route → `page.tsx`.

### Server vs Client components — la frontière correcte

| Composant | Type | Raison |
|---|---|---|
| `SiteHeader` | **Server** | Aucun hook. Compose juste `LanguageToggle` et `ThemeToggle`. |
| `SiteFooter` | **Client** | Appelle `useLanguage()`. Pourrait être server si on hardcodait le texte. |
| `LanguageToggle` | **Client** | `useState` + `onClick` |
| `ThemeToggle` | **Client** | `useTheme()` |
| `page.tsx` | **Client** | Lit `useLanguage()` |
| `ProjectCard` | **Server-safe** | Pas de hook, juste des props |
| `DotGrid` | **Server-safe** | Aucune logique |

### Règle d'or à retenir

`"use client"` se met sur le **composant le plus bas qui a vraiment besoin** d'interactivité. Tu remontes JAMAIS plus haut que nécessaire. Sinon tu envoies du JS inutile au client.

### Le brand link

Remplacement de `<a href="#top">` (ancre intra-page) par `<Link href="/">` (Next.js). Sur une page projet, ce lien ramène vraiment à l'accueil avec navigation client-side.

---

## Étape 13 — Folder `projects/`

### Structure mise en place

```
src/app/projects/
  layout.tsx              ← breadcrumb "← Retour au portfolio" + container
  <slug>/page.tsx         ← contenu spécifique à chaque démo
```

### Le layout en cascade

Quand tu visites `/projects/chatbot`, **deux layouts** s'appliquent automatiquement :

1. `app/layout.tsx` (racine) → header, footer, providers, dot grid
2. `app/projects/layout.tsx` (sub) → breadcrumb "Retour au portfolio"

Puis `app/projects/chatbot/page.tsx` est rendu à l'intérieur. **Tu n'écris JAMAIS le code des layouts dans `page.tsx`**.

### Extension du modèle de données

`ProjectLink` a été étendu avec un troisième cas `internal` :

```ts
export type ProjectLink =
  | { kind: "internal"; path: string }      // démo dans cette app
  | { kind: "external"; url: string }
  | { kind: "embed"; embedUrl: string };
```

Dans `ProjectCard`, le rendu adapte automatiquement :
- `internal` → `<Link href={path}>` avec icône `ArrowRight →` (navigation interne)
- `external` → `<a href target=_blank>` avec icône `ArrowUpRight ↗` (nouvel onglet)
- `embed` → `<iframe>` dans la card

---

## Règles transversales

### Convention URLs (déploiement-safe)

1. **Tout en minuscules** : `/projects/chatbot`, pas `/projects/Chatbot`
2. **Tirets entre les mots** : `/sentiment-analysis`, pas `/sentimentAnalysis`
3. **Langue cohérente avec le code** : `projects` reste en anglais

**Piège Windows** : le filesystem est case-insensitive en local, mais Vercel/Linux est case-sensitive. Un dossier `Chatbot/` fonctionne sur ton PC mais 404 en prod.

### Frontière server/client

- `"use client"` au plus bas niveau possible
- Un fichier qui appelle un hook DOIT être client
- Un server component PEUT rendre des client components (l'inverse n'est pas vrai)
- `<Link>`, `<Image>`, etc. de Next.js fonctionnent dans les deux

### Discriminated unions partout

Quand un type peut prendre plusieurs formes mutuellement exclusives, utiliser un champ `kind`. TypeScript fait du narrowing → impossible d'oublier un cas.

### Tokens shadcn = source de vérité

Toujours utiliser `bg-background`, `text-foreground`, `bg-muted`, `border-border` etc. JAMAIS de couleurs hardcodées comme `bg-white`, `bg-zinc-900`. Sinon le dark mode casse.

---

## Recettes pratiques

### Ajouter un nouveau projet "démo dans la même app"

1. Créer le dossier et page :
   ```powershell
   New-Item -ItemType Directory -Path "src\app\projects\nom-du-projet"
   New-Item -ItemType File -Path "src\app\projects\nom-du-projet\page.tsx"
   ```
2. Écrire le contenu de la démo dans `page.tsx` (juste le body, pas le header)
3. Ajouter une entrée dans `src/data/projects.ts` :
   ```ts
   { slug: "nom-du-projet", title: "...", description: "...", tags: [...],
     link: { kind: "internal", path: "/projects/nom-du-projet" } }
   ```

### Ajouter un projet hébergé ailleurs (HF Space, GitHub)

Dans `projects.ts` uniquement :
```ts
{ ..., link: { kind: "external", url: "https://huggingface.co/spaces/..." } }
```

### Ajouter un projet en iframe embed

```ts
{ ..., link: { kind: "embed", embedUrl: "https://your-space.hf.space" } }
```

### Ajouter une nouvelle langue (ex: ES)

1. Dans `src/components/language-provider.tsx` :
   ```ts
   export type Language = "fr" | "en" | "es";
   ```
2. Dans `src/lib/i18n.ts` : ajouter une clé `es` avec **exactement** la même structure que `fr`
3. Dans `src/components/language-toggle.tsx` : ajouter un `<DropdownMenuItem>` pour ES
4. Ajouter `public/intro-es.mp4` si vidéo distincte

### Ajouter un endpoint API (ex: chat backend)

Créer `src/app/api/chat/route.ts` :
```ts
export async function POST(request: Request) {
  const body = await request.json();
  // appeler OpenAI/Anthropic avec process.env.API_KEY
  return Response.json({ ... });
}
```

URL automatique : `/api/chat`. Variables d'env dans `.env.local` (jamais commit).

---

## Glossaire des fichiers

### Configuration

| Fichier | Rôle |
|---|---|
| `package.json` | Dépendances + scripts (dev/build/lint) |
| `tsconfig.json` | Config TypeScript + alias `@/*` |
| `next.config.ts` | Config Next.js (vide pour l'instant) |
| `postcss.config.mjs` | Plugin Tailwind v4 |
| `components.json` | Config shadcn (où copier les composants) |

### Code source

| Fichier | Type | Rôle |
|---|---|---|
| `src/app/layout.tsx` | Server | Layout racine. Providers, header, footer, dot grid. |
| `src/app/page.tsx` | Client | Homepage. Hero/vidéo/projets. |
| `src/app/globals.css` | CSS | Tailwind, custom-variant dark, tokens shadcn. |
| `src/app/projects/layout.tsx` | Server | Sub-layout : breadcrumb. |
| `src/components/site-header.tsx` | Server | Header sticky + brand + toggles. |
| `src/components/site-footer.tsx` | Client | Footer + builtWith traduit. |
| `src/components/dot-grid.tsx` | Server-safe | Background radial-gradient. |
| `src/components/theme-provider.tsx` | Client | Wrapper next-themes. |
| `src/components/theme-toggle.tsx` | Client | Dropdown Light/Dark/System. |
| `src/components/language-provider.tsx` | Client | Context + state + localStorage. |
| `src/components/language-toggle.tsx` | Client | Dropdown FR/EN. |
| `src/components/project-card.tsx` | Client | Card 3-en-1 (internal/external/embed). |
| `src/components/ui/*` | Server-safe | Primitives shadcn (button, card, dropdown-menu). |
| `src/data/projects.ts` | Module | Liste des projets + types. |
| `src/lib/i18n.ts` | Module | Dictionnaire FR/EN typé. |
| `src/lib/utils.ts` | Module | `cn()` helper pour merger des classes Tailwind. |

### Public

| Fichier | Rôle |
|---|---|
| `public/intro-fr.mp4` | Vidéo de présentation française |
| `public/intro-en.mp4` | Vidéo de présentation anglaise |
| `public/intro-{fr,en}-poster.jpg` | Images d'aperçu avant lecture |
| `public/favicon.ico` | Icône onglet |

---

## Commandes utiles

```powershell
npm run dev       # serveur de dev sur localhost:3000
npm run build     # build de production (vérifie TS + ESLint + génère le statique)
npm run lint      # juste le lint
```

## Variables d'environnement (futures)

À mettre dans `yanis-portfolio/.env.local` (jamais committed) :

```
ANTHROPIC_API_KEY=sk-...
OPENAI_API_KEY=...
HF_TOKEN=...
```

Accessibles côté serveur via `process.env.ANTHROPIC_API_KEY`. **Jamais exposées au client** sauf si préfixées `NEXT_PUBLIC_`.

---

## Ce qui reste à faire

- [ ] Remplacer les 2 projets placeholders par les vrais dans `src/data/projects.ts`
- [ ] Encoder et déposer `public/intro-en.mp4` (+ poster) pour la version anglaise de la vidéo
- [ ] Créer la première vraie page de démo sous `src/app/projects/<slug>/`
- [ ] (Optionnel) Passer `SiteFooter` en server component si la traduction n'est pas nécessaire
- [ ] (Optionnel) Ajouter une route `/api/...` pour les démos qui ont besoin d'un backend
- [ ] Configurer le déploiement Vercel et acheter/configurer le domaine

---

*Document à jour au 2026-05-15. Si tu ajoutes une feature majeure, ajoute une étape ici en suivant le même format (Quoi → Pourquoi → Comment → Pièges).*
