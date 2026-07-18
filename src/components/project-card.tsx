"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { useLanguage } from "@/components/language-provider";
import { buttonVariants } from "@/components/ui/button";
import { ExternalLink } from "@/components/ui/external-link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Project } from "@/data/projects";
import { dictionary } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function ProjectCard({ project }: { project: Project }) {
  const { language } = useLanguage();
  const t = dictionary[language].projects;
  const buttonClass = cn(buttonVariants({ variant: "outline", size: "sm" }));

  return (
    <Card className="transition-all hover:ring-foreground/20 hover:-translate-y-0.5">
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>{project.description[language]}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        {project.tags[language].map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </CardContent>

      {project.link.kind === "embed" && (
        <CardContent>
          <div className="aspect-video w-full overflow-hidden rounded-md ring-1 ring-foreground/10">
            <iframe
              src={project.link.embedUrl}
              title={project.title}
              className="h-full w-full"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </CardContent>
      )}

      {project.link.kind === "internal" && (
        <CardFooter>
          <Link href={project.link.path} className={buttonClass}>
            {t.openDemo}
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </CardFooter>
      )}

      {project.link.kind === "external" && (
        <CardFooter>
          <ExternalLink href={project.link.url} variant="outline" size="sm">
            {t.viewProject}
            <ArrowUpRight className="ml-1 h-4 w-4" />
          </ExternalLink>
        </CardFooter>
      )}
    </Card>
  );
}
