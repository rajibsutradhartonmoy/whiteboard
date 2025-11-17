// API response wrapper
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: ApiError;
  meta?: ApiMeta;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  stack?: string;
}

export interface ApiMeta {
  timestamp: string;
  requestId: string;
  duration?: number;
}

// Pagination
export interface PaginationParams {
  page?: number;
  limit?: number;
  cursor?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
  nextCursor?: string;
}

// Filter and search
export interface FilterParams {
  search?: string;
  filters?: Record<string, unknown>;
  dateRange?: {
    from: Date;
    to: Date;
  };
}

// Webhook
export interface Webhook {
  id: string;
  userId: string;
  url: string;
  secret: string;
  events: WebhookEvent[];
  active: boolean;
  lastTriggeredAt?: Date;
  failureCount: number;
  createdAt: Date;
}

export type WebhookEvent =
  | "project.created"
  | "project.updated"
  | "project.deleted"
  | "schema.updated"
  | "export.completed"
  | "import.completed"
  | "collaborator.added"
  | "collaborator.removed";

export interface WebhookPayload {
  id: string;
  event: WebhookEvent;
  timestamp: string;
  data: Record<string, unknown>;
  signature: string;
}

// Rate limiting
export interface RateLimitInfo {
  limit: number;
  remaining: number;
  reset: Date;
}

// Health check
export interface HealthStatus {
  status: "healthy" | "degraded" | "unhealthy";
  version: string;
  uptime: number;
  services: ServiceHealth[];
}

export interface ServiceHealth {
  name: string;
  status: "up" | "down" | "degraded";
  latency?: number;
  lastChecked: Date;
}

// Feature flags
export interface FeatureFlags {
  enableAI: boolean;
  enableCollaboration: boolean;
  enableOffline: boolean;
  enableExport: boolean;
  enableImport: boolean;
  enableTemplates: boolean;
  enableVersionHistory: boolean;
  maxTablesPerProject: number;
  maxProjectsPerUser: number;
  maxCollaboratorsPerProject: number;
}

// Billing/Subscription (for future Stripe integration)
export interface Subscription {
  id: string;
  userId: string;
  organizationId?: string;
  tier: "free" | "starter" | "pro" | "team" | "enterprise";
  status: "active" | "past_due" | "canceled" | "trialing";
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  stripeSubscriptionId?: string;
}

export interface UsageMetrics {
  projectsUsed: number;
  projectsLimit: number;
  tablesUsed: number;
  tablesLimit: number;
  exportsThisMonth: number;
  exportsLimit: number;
  collaboratorsUsed: number;
  collaboratorsLimit: number;
  storageUsedMb: number;
  storageLimitMb: number;
}

// Notification
export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: Record<string, unknown>;
  read: boolean;
  createdAt: Date;
}

export type NotificationType =
  | "info"
  | "success"
  | "warning"
  | "error"
  | "mention"
  | "invite"
  | "share"
  | "export"
  | "system";
