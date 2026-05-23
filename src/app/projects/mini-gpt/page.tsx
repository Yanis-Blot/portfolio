"use client"

import { Button } from "@/components/ui/button"
import { MessageBubble } from "@/components/chat/message-bubble"
import { TextField } from "@/components/chat/text-field"
import { useState } from "react"
import type { Message } from "@/lib/chat"


export default function Page() {
    const [input, setInput] = useState("")
    const [messages, setMessages] = useState<Message[]>([])
    const [isLoading, setLoading] = useState<Boolean>(false)

    { /* Cette fonction joue le role d'orchestrateur : il gère l'envoie vers l'API, récupère le message de réponse et le return */}
    async function handleSubmit(){
        if (input.trim() === "") return "No input"

        const userMessage: Message = {content: input, role: "user"}

        setMessages((prev) => [...prev, userMessage])
        setInput("")

        setLoading(true)

        const res = await fetch("/api/mini-gpt", {
            method: "POST",
            headers: { },
            body: JSON.stringify({ message: userMessage.content })
        })

        const assistantMessage: Message = await res.json()

        setLoading(false)
        setMessages((prev) => [...prev, assistantMessage])
    }


    return(
        <div className="flex flex-col items-center flex-1 min-h-0">
            <h1 className="flex font-bold text-5xl mb-4">chatGPT</h1>

            { /* Content area */ }
            <div className="flex-1 flex-col w-full overflow-y-auto">

                { /* single message */ }
                {messages.map((m, i) => (
                    <MessageBubble key={i} role={m.role}>
                        {m.content}
                    </MessageBubble>
                ))
                }
            </div>
            
            { /* Typing area */ }
            <TextField value={input} onChange={setInput} onSubmit={handleSubmit}/>
        </div>
    )
}