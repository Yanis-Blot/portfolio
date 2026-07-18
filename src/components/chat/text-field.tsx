"use client";

import { Button } from "@/components/ui/button";

type Props = {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
};

export function TextField({ value, onChange, onSubmit, disabled = false }: Props) {
  return (
    <form
      className="w-full"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <div className="flex flex-row items-center rounded-xl border border-border p-2">
        <Button type="submit" variant="default" disabled={disabled}>
          Envoyer
        </Button>
        <input
          className="ml-5 w-full flex-1 bg-transparent text-foreground outline-none placeholder:text-muted-foreground"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Entrez du texte..."
          disabled={disabled}
        />
      </div>
    </form>
  );
}
