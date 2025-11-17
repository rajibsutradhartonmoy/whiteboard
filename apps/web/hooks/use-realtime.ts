"use client";

import { useEffect, useRef, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { RealtimeChannel, RealtimePresenceState } from "@supabase/supabase-js";
import { useAuth } from "./use-auth";

interface RealtimeEvent {
  type: string;
  payload: unknown;
  userId: string;
  timestamp: number;
}

interface PresenceState {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  cursorPosition?: { x: number; y: number };
  selectedElements: string[];
  lastActive: Date;
  color: string;
}

interface UseRealtimeOptions {
  projectId: string;
  onEvent?: (event: RealtimeEvent) => void;
  onPresenceSync?: (users: PresenceState[]) => void;
  onPresenceJoin?: (user: PresenceState) => void;
  onPresenceLeave?: (user: PresenceState) => void;
}

// Generate consistent color for user based on ID
function getUserColor(userId: string): string {
  const colors = [
    "#ef4444", // red
    "#f97316", // orange
    "#eab308", // yellow
    "#22c55e", // green
    "#06b6d4", // cyan
    "#3b82f6", // blue
    "#8b5cf6", // violet
    "#d946ef", // fuchsia
    "#ec4899", // pink
  ];
  const hash = userId.split("").reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  return colors[Math.abs(hash) % colors.length];
}

export function useRealtime({
  projectId,
  onEvent,
  onPresenceSync,
  onPresenceJoin,
  onPresenceLeave,
}: UseRealtimeOptions) {
  const { user } = useAuth();
  const supabase = createClient();
  const channelRef = useRef<RealtimeChannel | null>(null);
  const presenceRef = useRef<PresenceState | null>(null);

  // Broadcast an event to all users in the project
  const broadcast = useCallback(
    (type: string, payload: unknown) => {
      if (!channelRef.current || !user) return;

      channelRef.current.send({
        type: "broadcast",
        event: type,
        payload: {
          type,
          payload,
          userId: user.id,
          timestamp: Date.now(),
        },
      });
    },
    [user]
  );

  // Update presence state
  const updatePresence = useCallback(
    (updates: Partial<Omit<PresenceState, "id" | "name" | "email" | "color">>) => {
      if (!channelRef.current || !presenceRef.current) return;

      presenceRef.current = {
        ...presenceRef.current,
        ...updates,
        lastActive: new Date(),
      };

      channelRef.current.track(presenceRef.current);
    },
    []
  );

  // Update cursor position
  const updateCursor = useCallback(
    (position: { x: number; y: number }) => {
      updatePresence({ cursorPosition: position });
    },
    [updatePresence]
  );

  // Update selected elements
  const updateSelection = useCallback(
    (elementIds: string[]) => {
      updatePresence({ selectedElements: elementIds });
    },
    [updatePresence]
  );

  useEffect(() => {
    if (!projectId || !user) return;

    const channel = supabase.channel(`project:${projectId}`, {
      config: {
        presence: {
          key: user.id,
        },
      },
    });

    // Handle broadcast messages
    channel.on("broadcast", { event: "*" }, ({ payload }) => {
      if (payload.userId !== user.id && onEvent) {
        onEvent(payload as RealtimeEvent);
      }
    });

    // Handle presence
    channel.on("presence", { event: "sync" }, () => {
      const state = channel.presenceState<PresenceState>();
      const users: PresenceState[] = [];

      Object.values(state).forEach((presences) => {
        if (presences.length > 0) {
          users.push(presences[0] as PresenceState);
        }
      });

      if (onPresenceSync) {
        onPresenceSync(users);
      }
    });

    channel.on("presence", { event: "join" }, ({ newPresences }) => {
      if (onPresenceJoin && newPresences.length > 0) {
        onPresenceJoin(newPresences[0] as PresenceState);
      }
    });

    channel.on("presence", { event: "leave" }, ({ leftPresences }) => {
      if (onPresenceLeave && leftPresences.length > 0) {
        onPresenceLeave(leftPresences[0] as PresenceState);
      }
    });

    // Subscribe and track presence
    channel.subscribe(async (status) => {
      if (status === "SUBSCRIBED") {
        presenceRef.current = {
          id: user.id,
          name: user.user_metadata?.full_name || user.email || "Anonymous",
          email: user.email || "",
          avatarUrl: user.user_metadata?.avatar_url,
          cursorPosition: undefined,
          selectedElements: [],
          lastActive: new Date(),
          color: getUserColor(user.id),
        };

        await channel.track(presenceRef.current);
      }
    });

    channelRef.current = channel;

    return () => {
      channel.unsubscribe();
      channelRef.current = null;
      presenceRef.current = null;
    };
  }, [
    projectId,
    user,
    supabase,
    onEvent,
    onPresenceSync,
    onPresenceJoin,
    onPresenceLeave,
  ]);

  return {
    broadcast,
    updatePresence,
    updateCursor,
    updateSelection,
  };
}
