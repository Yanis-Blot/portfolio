"use client";

import { ContactButton } from "@/components/contact-button";
import { useLanguage } from "@/components/language-provider";
import { ProjectCard } from "@/components/project-card";
import { buttonVariants } from "@/components/ui/button";
import { projects } from "@/data/projects";
import { dictionary } from "@/lib/i18n";
import { cn } from "@/lib/utils";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.27-1.68-1.27-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.34.96.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.3-.51-1.47.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.58.23 2.75.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.4-5.27 5.69.42.36.78 1.07.78 2.16v3.2c0 .31.21.68.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0Z" />
    </svg>
  );
}

export default function Home() {
  const { language } = useLanguage();
  const t = dictionary[language];

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-12 px-6 py-16 md:px-12 md:py-8">
      {/* Hero / CV */}
      <section className="flex flex-col gap-6">
        <h1 className="font-heading text-2xl font-semibold tracking-tight md:text-2xl">
          {t.hero.title}
        </h1>
        <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
          {t.hero.bio}
        </p>
        <div className="flex flex-wrap gap-3">
          <ContactButton>yanisblotelmazouzi@gmail.com</ContactButton>
          <a
            href="https://github.com/Yanis-Blot"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            <GithubIcon className="mr-2 h-4 w-4" />
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/yanis-blot-el-mazouzi"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            <LinkedinIcon className="mr-2 h-4 w-4" />
            LinkedIn
          </a>
        </div>
      </section>

      {/* Vidéo de présentation */}
      <section className="flex flex-col gap-4">
        <h2 className="font-heading text-2xl font-semibold tracking-tight md:text-3xl">
          {t.video.heading}
        </h2>
        <p className="text-muted-foreground">{t.video.description}</p>
        <div className="aspect-video w-full overflow-hidden rounded-xl bg-muted ring-1 ring-foreground/10">
          <video
            key={language}
            controls
            preload="metadata"
            poster={t.video.poster}
            className="h-full w-full"
          >
            <source src={t.video.src} type="video/mp4" />
            {t.video.fallback}
          </video>
        </div>
      </section>

      {/* Projets ML */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="font-heading text-2xl font-semibold tracking-tight md:text-3xl">
            {t.projects.heading}
          </h2>
          <p className="text-muted-foreground">
            {t.projects.descriptionBefore}
            <code className="mx-1 rounded bg-muted px-1.5 py-0.5 text-sm">src/data/projects.ts</code>
            {t.projects.descriptionAfter}
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </main>
  );
}
