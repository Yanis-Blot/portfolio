
/* Contrat API vers tout LLM : doivent recevoir le message (string) et renvoyer un string. */
export type LLMAdapter = (message: string) => Promise<string>