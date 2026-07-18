export const dictionary = {
  fr: {
    nav: {
      home: "Accueil",
      projects: "Projets",
      contact: "Contact",
      menuLabel: "Ouvrir le menu",
    },
    hero: {
      greeting: "Bienvenue, laissez-moi me présenter :",
      title: "Yanis Blot--El Mazouzi - Ingénieur en Apprentissage Automatique",
      bio: "En dernière année d'école d'ingénieur à l'IMT Mines Alès, je conçois des systèmes de machine learning et j'expérimente à travers de nombreux projets.",
      contactCta: "Me contacter",
      copyEmailLabel: "Copier l'email",
      copiedLabel: "Copié !",
    },
    contact: {
      heading: "Me contacter",
      description:
        "Une question, une opportunité ou juste envie d'échanger ? Écrivez-moi.",
    },
    video: {
      heading: "Présentation",
      description: "Une minute pour vous présenter mon projet et ma démarche",
      src: "/intro-fr.mp4",
      poster: "/intro-fr-poster.png",
      fallback: "Votre navigateur ne prend pas en charge la lecture vidéo.",
    },
    projects: {
      heading: "Projets",
      descriptionBefore: "Modèles et démos d'inférence. Ajoute ou modifie les projets dans",
      descriptionAfter: ".",
      openDemo: "Ouvrir la démo",
      viewProject: "Voir le projet",
    },
    footer: {
      builtWith: "Conçu avec Next.js & Tailwind CSS",
    },
  },
  en: {
    nav: {
      home: "Home",
      projects: "Projects",
      contact: "Contact",
      menuLabel: "Open menu",
    },
    hero: {
      greeting: "Welcome, let me introduce myself:",
      title: "Yanis Blot--El Mazouzi - Machine Learning Engineer",
      bio: "Final-year engineering student at IMT Mines Alès, I design machine learning systems and experiment through many personal projects.",
      contactCta: "Contact me",
      copyEmailLabel: "Copy email",
      copiedLabel: "Copied!",
    },
    contact: {
      heading: "Get in touch",
      description:
        "A question, an opportunity, or just want to chat? Drop me a line.",
    },
    video: {
      heading: "Introduction",
      description: "A few minutes about my background and approach.",
      src: "/intro-en.mp4",
      poster: "/intro-en-poster.jpg",
      fallback: "Your browser does not support video playback.",
    },
    projects: {
      heading: "Projects",
      descriptionBefore: "Models and inference demos. Add or edit projects in",
      descriptionAfter: ".",
      openDemo: "Open demo",
      viewProject: "View project",
    },
    footer: {
      builtWith: "Built with Next.js & Tailwind CSS",
    },
  },
} as const;

export type Dictionary = (typeof dictionary)["fr"];
