"use client";

import { useCollaborationStore } from "@/stores/collaboration-store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function PresenceAvatars() {
  const { onlineUsers } = useCollaborationStore();
  const users = Array.from(onlineUsers.values());

  if (users.length === 0) {
    return null;
  }

  return (
    <TooltipProvider>
      <div className="flex items-center -space-x-2">
        {users.slice(0, 5).map((user) => (
          <Tooltip key={user.id}>
            <TooltipTrigger asChild>
              <Avatar
                className="h-8 w-8 border-2 border-background"
                style={{ borderColor: user.color }}
              >
                <AvatarImage src={user.avatarUrl} alt={user.name} />
                <AvatarFallback style={{ backgroundColor: user.color }}>
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2)}
                </AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </TooltipContent>
          </Tooltip>
        ))}
        {users.length > 5 && (
          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium border-2 border-background">
            +{users.length - 5}
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}
