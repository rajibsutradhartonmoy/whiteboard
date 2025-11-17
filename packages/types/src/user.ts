import { BaseEntity } from "./schema";

// User profile
export interface User extends BaseEntity {
  email: string;
  fullName?: string;
  avatarUrl?: string;
  username?: string;
  bio?: string;
  preferences: UserPreferences;
}

export interface UserPreferences {
  theme: "light" | "dark" | "system";
  language: string;
  timezone: string;
  notifications: NotificationPreferences;
  editor: EditorPreferences;
  keyboard: KeyboardPreferences;
}

export interface NotificationPreferences {
  email: boolean;
  inApp: boolean;
  projectUpdates: boolean;
  collaboratorJoined: boolean;
  mentionedInComment: boolean;
  weeklyDigest: boolean;
}

export interface EditorPreferences {
  autoSave: boolean;
  autoSaveInterval: number; // seconds
  showMinimap: boolean;
  showGridLines: boolean;
  snapToGrid: boolean;
  defaultZoom: number;
  animationsEnabled: boolean;
}

export interface KeyboardPreferences {
  vimMode: boolean;
  customShortcuts: Record<string, string>;
}

// Organization
export interface Organization extends BaseEntity {
  name: string;
  slug: string;
  logoUrl?: string;
  settings: OrganizationSettings;
  subscriptionTier: SubscriptionTier;
}

export interface OrganizationSettings {
  allowPublicProjects: boolean;
  requireTwoFactor: boolean;
  ipWhitelist?: string[];
  defaultProjectSettings: Record<string, unknown>;
  sso?: SSOConfig;
}

export interface SSOConfig {
  provider: "saml" | "oidc";
  enabled: boolean;
  metadata?: string;
}

export type SubscriptionTier = "free" | "starter" | "pro" | "team" | "enterprise";

// Organization member
export interface OrganizationMember extends BaseEntity {
  organizationId: string;
  userId: string;
  role: OrganizationRole;
  invitedBy?: string;
  joinedAt: Date;
}

export type OrganizationRole = "owner" | "admin" | "member";

// Invitation
export interface Invitation extends BaseEntity {
  email: string;
  type: "project" | "organization";
  targetId: string;
  role: string;
  invitedBy: string;
  expiresAt: Date;
  acceptedAt?: Date;
}

// API Key
export interface ApiKey extends BaseEntity {
  userId: string;
  name: string;
  keyPrefix: string;
  lastUsedAt?: Date;
  expiresAt?: Date;
  permissions: ApiKeyPermission[];
}

export type ApiKeyPermission =
  | "read:projects"
  | "write:projects"
  | "delete:projects"
  | "read:schemas"
  | "write:schemas"
  | "export"
  | "import";

// Audit log
export interface AuditLog extends BaseEntity {
  userId?: string;
  action: string;
  resourceType: string;
  resourceId?: string;
  oldValues?: Record<string, unknown>;
  newValues?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
}

// Session info
export interface Session {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
}

// Auth state
export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  session: Session | null;
  error: string | null;
}
