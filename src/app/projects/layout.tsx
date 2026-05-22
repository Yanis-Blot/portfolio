import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex w-full max-w-5xl min-h-0 flex-1 flex-col px-6 py-8 md:px-12 md:py-8">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Retour au portfolio
      </Link>
      {children}
    </div>
  );
}
