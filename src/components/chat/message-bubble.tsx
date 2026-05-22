import { cn } from "@/lib/utils"

type Role = "user" | "assistant"

export function MessageBubble({ children, role }: { children: string, role: Role }){
    const r = role

    return(
        <div className="flex w-full">
            <div className={cn(
                "rounded-2xl w-fit max-w-md h-fit px-4 py-2 text-background break-words mb-2",
                {
                    "bg-chat-user rounded-br-none ml-auto": role === "user",
                    "bg-chat-assistant rounded-bl-none mr-auto": role === "assistant",
                }
            )}
            >
                <p>{ children }</p>
            </div>
        </div>
    )
}