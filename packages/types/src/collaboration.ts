import { Position } from "./schema";
import { User } from "./user";

// User presence in a project
export interface Presence {
  id: string;
  projectId: string;
  userId: string;
  user: User;
  cursorPosition?: Position;
  selectedElements: string[];
  lastActive: Date;
  status: PresenceStatus;
}

export type PresenceStatus = "active" | "idle" | "away";

// Real-time cursor
export interface Cursor {
  userId: string;
  userName: string;
  userColor: string;
  position: Position;
  timestamp: number;
}

// Comment
export interface Comment {
  id: string;
  projectId: string;
  tableId?: string;
  columnId?: string;
  parentId?: string;
  userId: string;
  user: User;
  content: string;
  mentions: string[];
  resolved: boolean;
  resolvedBy?: string;
  createdAt: Date;
  updatedAt: Date;
  replies?: Comment[];
}

// Activity feed item
export interface Activity {
  id: string;
  projectId: string;
  userId: string;
  user: User;
  action: string;
  entityType: string;
  entityId?: string;
  entityName?: string;
  changes?: ChangeSet;
  createdAt: Date;
}

export interface ChangeSet {
  before: Record<string, unknown>;
  after: Record<string, unknown>;
}

// Real-time event types
export type RealtimeEventType =
  | "presence:join"
  | "presence:leave"
  | "presence:update"
  | "cursor:move"
  | "selection:change"
  | "schema:update"
  | "table:create"
  | "table:update"
  | "table:delete"
  | "table:move"
  | "column:create"
  | "column:update"
  | "column:delete"
  | "column:reorder"
  | "relationship:create"
  | "relationship:update"
  | "relationship:delete"
  | "comment:create"
  | "comment:update"
  | "comment:delete"
  | "comment:resolve";

// Real-time event
export interface RealtimeEvent {
  id: string;
  type: RealtimeEventType;
  projectId: string;
  userId: string;
  timestamp: number;
  data: unknown;
  version: number;
}

// Operation for CRDT
export interface Operation {
  id: string;
  type: OperationType;
  entityType: string;
  entityId: string;
  data: unknown;
  timestamp: number;
  userId: string;
  vectorClock: VectorClock;
  dependsOn?: string[];
}

export type OperationType = "insert" | "update" | "delete" | "move";

// Vector clock for causality tracking
export interface VectorClock {
  [userId: string]: number;
}

// Conflict
export interface Conflict {
  id: string;
  operations: Operation[];
  type: ConflictType;
  resolution?: ConflictResolution;
  resolvedAt?: Date;
  resolvedBy?: string;
}

export type ConflictType =
  | "concurrent_update"
  | "delete_update"
  | "parent_delete"
  | "constraint_violation";

export interface ConflictResolution {
  strategy: "last_write_wins" | "first_write_wins" | "merge" | "manual";
  result: Operation;
}

// Sync state
export interface SyncState {
  isOnline: boolean;
  isSyncing: boolean;
  lastSyncedAt?: Date;
  pendingOperations: number;
  conflicts: Conflict[];
  error?: string;
}

// Collaboration settings
export interface CollaborationSettings {
  showCursors: boolean;
  showPresence: boolean;
  showActivities: boolean;
  allowComments: boolean;
  requireApproval: boolean;
  lockTimeout: number; // seconds
}

// Lock for optimistic locking
export interface Lock {
  entityId: string;
  userId: string;
  acquiredAt: Date;
  expiresAt: Date;
}

// Typing indicator
export interface TypingIndicator {
  userId: string;
  userName: string;
  entityId: string;
  startedAt: Date;
}
