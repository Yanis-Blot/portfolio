export const dictionary = {
  fr: {
    hero: {
      greeting: "Bienvenue, laissez moi me présenter :",
      title: "Yanis Blot--El Mazouzi - Ingénieur en Apprentissage Automatique",
      bio: "En dernière année d'école d'ingénieur a l'IMT Mines Alès, je concoit des systèmes de machine learning et expérimente a travers de nombreux projets. ",
      contactCta: "Me contacter",
      copyEmailLabel: "Copier l'email",
      copiedLabel: "Copié !",
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
      builtWith: "yanis.com",
    },
  },
  en: {
    hero: {
      greeting: "Welcome, let me introduce myself:",
      title: "Yanis Blot--El Mazouzi - Machine Learning Engineer",
      bio: "I build machine learning systems, from prototyping to production inference. This page gathers my background and personal projects. Replace this text with your real bio.",
      contactCta: "Contact me",
      copyEmailLabel: "Copy email",
      copiedLabel: "Copied!",
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
      builtWith: "yanis.com",
    },
  },
} as const;

export type Dictionary = (typeof dictionary)["fr"];
