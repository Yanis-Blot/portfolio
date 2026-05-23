export type Role = "assistant" | "user"

export type Message = {
    role: Role;
    content: string;
}