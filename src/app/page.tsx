"use client";

import { ContactButton } from "@/components/contact-button";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { useLanguage } from "@/components/language-provider";
import { ProjectCard } from "@/components/project-card";
import { ExternalLink } from "@/components/ui/external-link";
import { projects } from "@/data/projects";
import { dictionary } from "@/lib/i18n";

const EMAIL = "yanisblotelmazouzi@gmail.com";

function SocialLinks() {
  return (
    <>
      <ExternalLink href="https://github.com/Yanis-Blot">
        <GithubIcon className="mr-2 h-4 w-4" />
        GitHub
      </ExternalLink>
      <ExternalLink href="https://linkedin.com/in/yanis-blot-el-mazouzi">
        <LinkedinIcon className="mr-2 h-4 w-4" />
        LinkedIn
      </ExternalLink>
    </>
  );
}

export default function Home() {
  const { language } = useLanguage();
  const t = dictionary[language];

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-12 px-6 py-16 md:px-12 md:py-8">
      {/* Hero / CV */}
      <section id="accueil" className="flex scroll-mt-20 flex-col gap-6">
        <h1 className="font-heading text-2xl font-semibold tracking-tight md:text-2xl">
          {t.hero.title}
        </h1>
        <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
          {t.hero.bio}
        </p>
        <div className="flex flex-wrap gap-3">
          <ContactButton>{EMAIL}</ContactButton>
          <SocialLinks />
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
      <section id="projets" className="flex scroll-mt-20 flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="font-heading text-2xl font-semibold tracking-tight md:text-3xl">
            {t.projects.heading}
          </h2>
          <p className="text-muted-foreground">
            {t.projects.descriptionBefore}
            <code className="mx-1 rounded bg-muted px-1.5 py-0.5 text-sm">
              src/data/projects.ts
            </code>
            {t.projects.descriptionAfter}
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="flex scroll-mt-20 flex-col gap-4">
        <h2 className="font-heading text-2xl font-semibold tracking-tight md:text-3xl">
          {t.contact.heading}
        </h2>
        <p className="max-w-2xl text-muted-foreground">
          {t.contact.description}
        </p>
        <div className="flex flex-wrap gap-3">
          <ContactButton>{EMAIL}</ContactButton>
          <SocialLinks />
        </div>
      </section>
    </main>
  );
}
