import { LLMAdapter } from "./types"

export function createOllamaAdapter(model: string): LLMAdapter {
    return async (message: string) => {
        const resOllama = await fetch("http://localhost:11434/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                model: model,
                messages: [{ role: "user", content: message }],
                stream: false
            })
        })

        if (!resOllama.ok) throw new Error(`Ollama response : ${resOllama.status}`)

        const data = await resOllama.json()
        return data.message.content
    }
}