import type { Language } from "@/components/language-provider";

export type Localized<T> = Record<Language, T>;

export type ProjectLink =
  | { kind: "internal"; path: string }
  | { kind: "external"; url: string }
  | { kind: "embed"; embedUrl: string };

export type Project = {
  slug: string;
  title: string;
  description: Localized<string>;
  tags: Localized<string[]>;
  link: ProjectLink;
  thumbnail?: string;
};

export const projects: Project[] = [
  {
    slug: "mini-gpt",
    title: "Mini-GPT",
    description: {
      fr: "Démo d'inférence d'un modèle Transformer (chatbot)",
      en: "Transformer model inference demo (chatbot)",
    },
    tags: {
      fr: ["NLP", "Transformer", "Inférence"],
      en: ["NLP", "Transformer", "Inference"],
    },
    link: {
      kind: "internal",
      path: "/projects/mini-gpt",
    },
  },
  {
    slug: "placeholder-nlp",
    title: "Text Sentiment (placeholder)",
    description: {
      fr: "Modèle NLP de sentiment analysis. Connecte-le à une HuggingFace Space ou un endpoint personnel.",
      en: "NLP sentiment analysis model. Connect it to a HuggingFace Space or a personal endpoint.",
    },
    tags: {
      fr: ["NLP", "Transformers"],
      en: ["NLP", "Transformers"],
    },
    link: {
      kind: "external",
      url: "https://huggingface.co/spaces",
    },
  },
];
