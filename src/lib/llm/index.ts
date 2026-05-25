/* Factory pattern : 
    - return the correct adaptater, depending on environment variable 'LLM_PROVIDER'
*/

import { askOllama } from "./ollama-adapter"
import { askMock } from "./mock-adapter"
import { LLMAdapter } from "./types"

export function createLLM(): LLMAdapter {
    const llm = process.env.LLM_PROVIDER
    switch(llm) {
        case "ollama":
            return askOllama
        case "mock":
            return askMock
        default:
            throw new Error("No / Invalid LLM provider selected (check .env file).")
    }
}