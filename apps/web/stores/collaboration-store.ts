import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface Cursor {
  userId: string;
  userName: string;
  userColor: string;
  position: { x: number; y: number };
  timestamp: number;
}

interface Presence {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  color: string;
  cursorPosition?: { x: number; y: number };
  selectedElements: string[];
  lastActive: Date;
}

interface CollaborationState {
  // Online users
  onlineUsers: Map<string, Presence>;

  // Cursors
  cursors: Map<string, Cursor>;

  // Connection status
  isConnected: boolean;
  connectionError: string | null;

  // Actions
  setOnlineUsers: (users: Presence[]) => void;
  addOnlineUser: (user: Presence) => void;
  removeOnlineUser: (userId: string) => void;
  updateCursor: (userId: string, cursor: Cursor) => void;
  removeCursor: (userId: string) => void;
  setConnected: (connected: boolean) => void;
  setConnectionError: (error: string | null) => void;
  reset: () => void;
}

const initialState = {
  onlineUsers: new Map<string, Presence>(),
  cursors: new Map<string, Cursor>(),
  isConnected: false,
  connectionError: null,
};

export const useCollaborationStore = create<CollaborationState>()(
  immer((set) => ({
    ...initialState,

    setOnlineUsers: (users) =>
      set((state) => {
        state.onlineUsers.clear();
        users.forEach((user) => {
          state.onlineUsers.set(user.id, user);
          if (user.cursorPosition) {
            state.cursors.set(user.id, {
              userId: user.id,
              userName: user.name,
              userColor: user.color,
              position: user.cursorPosition,
              timestamp: Date.now(),
            });
          }
        });
      }),

    addOnlineUser: (user) =>
      set((state) => {
        state.onlineUsers.set(user.id, user);
      }),

    removeOnlineUser: (userId) =>
      set((state) => {
        state.onlineUsers.delete(userId);
        state.cursors.delete(userId);
      }),

    updateCursor: (userId, cursor) =>
      set((state) => {
        state.cursors.set(userId, cursor);
      }),

    removeCursor: (userId) =>
      set((state) => {
        state.cursors.delete(userId);
      }),

    setConnected: (connected) =>
      set((state) => {
        state.isConnected = connected;
        if (!connected) {
          state.onlineUsers.clear();
          state.cursors.clear();
        }
      }),

    setConnectionError: (error) =>
      set((state) => {
        state.connectionError = error;
      }),

    reset: () => set(initialState),
  }))
);
