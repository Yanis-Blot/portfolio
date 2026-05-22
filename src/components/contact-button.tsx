"use client";

import { useState } from "react";
import { Popover } from "@base-ui/react/popover";
import { Check, Copy, Mail } from "lucide-react";

import { useLanguage } from "@/components/language-provider";
import { buttonVariants } from "@/components/ui/button";
import { dictionary } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function ContactButton({ children }:{ children:string }) {
  const { language } = useLanguage();
  const t = dictionary[language].hero;
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Popover.Root>
      <Popover.Trigger className={cn(buttonVariants({ variant: "default" }))}>
        <Mail className="mr-2 h-4 w-4" />
        {t.contactCta}
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner side="bottom" align="start" sideOffset={6}>
          <Popover.Popup
            className={cn(
              "z-50 origin-(--transform-origin) rounded-lg bg-popover p-1.5 text-popover-foreground shadow-md ring-1 ring-foreground/10 outline-none duration-100",
              "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95",
              "data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            )}
          >
            <div className="flex items-center gap-2 pl-2">
              <span className="font-mono text-sm">{children}</span>
              <button
                type="button"
                onClick={handleCopy}
                aria-label={copied ? t.copiedLabel : t.copyEmailLabel}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon-sm" }),
                )}
              >
                {copied ? (
                  <Check className="text-green-600 dark:text-green-500" />
                ) : (
                  <Copy />
                )}
              </button>
            </div>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}
