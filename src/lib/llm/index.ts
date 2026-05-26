/* Factory pattern : 
    - return the correct adaptater, depending on environment variable 'LLM_PROVIDER'
*/

import { createOllamaAdapter } from "./ollama-adapter"
import { askMock } from "./mock-adapter"
import { LLMAdapter } from "./types"

export function createLLM(): LLMAdapter {
    const llm = process.env.LLM_PROVIDER
    switch(llm) {
        case "ollama":
            return createOllamaAdapter(process.env.LLM_MODEL ?? "mistral")
        case "mock":
            return askMock
        default:
            throw new Error("No / Invalid LLM provider selected (check .env file).")
    }
}