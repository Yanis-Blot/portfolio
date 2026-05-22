"use client"

import { Button } from "@/components/ui/button"
import { MessageBubble } from "@/components/chat/message-bubble"
import { TextField } from "@/components/chat/text-field"
import { useState } from "react"

export default function Page() {
    const [input, setInput] = useState("")

    return(
        <div className="flex flex-col items-center flex-1 min-h-0">
            <h1 className="flex font-bold text-5xl mb-4">chatGPT</h1>

            { /* Content area */ }
            <div className="flex-1 flex-col w-full overflow-y-auto">

                { /* single message */ }
                <MessageBubble role="assistant">Bonjour, comment puis-je vous aider ?</MessageBubble>
                <MessageBubble role="user">Salut, aide moi a gérer l'API de mon modèle.</MessageBubble>
                <MessageBubble role="user">Salut, aide moi a gérer l'API de mon modèle.</MessageBubble>
                <MessageBubble role="user">Salut, aide moi a gérer l'API de mon modèle.</MessageBubble>
                <MessageBubble role="user">Salut, aide moi a gérer l'API de mon modèle.</MessageBubble>
                <MessageBubble role="user">Salut, aide moi a gérer l'API de mon modèle.</MessageBubble>
                <MessageBubble role="user">Salut, aide moi a gérer l'API de mon modèle.</MessageBubble>
                <MessageBubble role="user">Salut, aide moi a gérer l'API de mon modèle.</MessageBubble>
                <MessageBubble role="user">Salut, aide moi a gérer l'API de mon modèle.</MessageBubble>
                <MessageBubble role="user">Salut, aide moi a gérer l'API de mon modèle.</MessageBubble>
                <MessageBubble role="user">Salut, aide moi a gérer l'API de mon modèle.</MessageBubble>
                <MessageBubble role="user">Salut, aide moi a gérer l'API de mon modèle.</MessageBubble>
                <MessageBubble role="user">Salut, aide moi a gérer l'API de mon modèle.</MessageBubble>
                <MessageBubble role="user">Salut, aide moi a gérer l'API de mon modèle.</MessageBubble>
                <MessageBubble role="user">Salut, aide moi a gérer l'API de mon modèle.</MessageBubble>
                <MessageBubble role="user">Salut, aide moi a gérer l'API de mon modèle.</MessageBubble>
                <MessageBubble role="user">Salut, aide moi a gérer l'API de mon modèle.</MessageBubble>
            </div>
            
            { /* Typing area */ }
            <TextField value={input} onChange={setInput}/>
        </div>
    )
}