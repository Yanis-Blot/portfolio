"use client";

import { useState } from "react";

import { MessageBubble } from "@/components/chat/message-bubble";
import { TextField } from "@/components/chat/text-field";
import type { Message } from "@/lib/chat";

type ChatMessage = Message & { id: string };

export default function Page() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setLoading] = useState(false);

  // Orchestrateur : envoie le message à l'API et ajoute la réponse à la conversation.
  async function handleSubmit() {
    const content = input.trim();
    if (content === "" || isLoading) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/mini-gpt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: content }),
      });

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      const data: Message = await res.json();
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "assistant", content: data.content },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "Une erreur est survenue. Réessayez plus tard.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col items-center">
      <h1 className="mb-4 text-5xl font-bold">Chatbot</h1>

      <div className="w-full flex-1 overflow-y-auto scrollbar-hide">
        {messages.map((m) => (
          <MessageBubble key={m.id} role={m.role}>
            {m.content}
          </MessageBubble>
        ))}
        {isLoading && <MessageBubble role="assistant">…</MessageBubble>}
      </div>

      <TextField
        value={input}
        onChange={setInput}
        onSubmit={handleSubmit}
        disabled={isLoading}
      />
    </div>
  );
}
