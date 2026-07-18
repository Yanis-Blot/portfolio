import { cn } from "@/lib/utils"
import type { Role } from "@/lib/chat"

export function MessageBubble({ children, role }: { children: string; role: Role }) {
    return (
        <div className="flex w-full">
            <div className={cn(
                "rounded-2xl w-fit max-w-md h-fit px-4 py-2 break-words mb-2",
                {
                    "bg-chat-user text-text-user rounded-br-none ml-auto": role === "user",
                    "bg-chat-assistant text-text-assistant rounded-bl-none mr-auto": role === "assistant",
                }
            )}
            >
                <p>{ children }</p>
            </div>
        </div>
    )
}