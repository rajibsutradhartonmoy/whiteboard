import { DatabaseType } from "./database";
import { Schema } from "./schema";
import { BaseEntity, Position } from "./schema";

// Project
export interface Project extends BaseEntity {
  name: string;
  slug: string;
  description?: string;
  databaseType: DatabaseType;
  ownerId: string;
  organizationId?: string;
  isPublic: boolean;
  settings: ProjectSettings;
  canvasState: CanvasState;
  tags: string[];
  folderId?: string;
  archivedAt?: Date;
}

export interface ProjectSettings {
  defaultSchema: string;
  namingConvention: NamingConvention;
  autoSave: boolean;
  autoLayout: boolean;
  showGridLines: boolean;
  snapToGrid: boolean;
  gridSize: number;
  theme: ProjectTheme;
  diagramNotation: DiagramNotation;
}

export type NamingConvention =
  | "snake_case"
  | "camelCase"
  | "PascalCase"
  | "kebab-case";

export type DiagramNotation = "crow-foot" | "chen" | "uml" | "idef1x";

export interface ProjectTheme {
  tableHeaderColor: string;
  tableBodyColor: string;
  relationshipColor: string;
  backgroundColor: string;
  fontFamily: string;
  fontSize: number;
}

export interface CanvasState {
  viewport: Viewport;
  zoom: number;
  pan: Position;
  selectedNodeIds: string[];
  selectedEdgeIds: string[];
}

export interface Viewport {
  x: number;
  y: number;
  width: number;
  height: number;
}

// Project folder
export interface ProjectFolder extends BaseEntity {
  name: string;
  parentId?: string;
  ownerId: string;
  organizationId?: string;
}

// Project collaborator
export interface ProjectCollaborator extends BaseEntity {
  projectId: string;
  userId: string;
  role: CollaboratorRole;
  invitedBy?: string;
  acceptedAt?: Date;
}

export type CollaboratorRole = "owner" | "editor" | "viewer";

// Project share link
export interface ProjectShare extends BaseEntity {
  projectId: string;
  shareToken: string;
  accessLevel: "view" | "comment" | "edit";
  passwordProtected: boolean;
  expiresAt?: Date;
  maxViews?: number;
  viewCount: number;
  createdBy: string;
}

// Project version/snapshot
export interface ProjectVersion extends BaseEntity {
  projectId: string;
  versionNumber: number;
  name?: string;
  description?: string;
  snapshot: Schema;
  parentVersionId?: string;
  isBranch: boolean;
  branchName?: string;
  createdBy: string;
}

// Project template
export interface ProjectTemplate extends BaseEntity {
  name: string;
  slug: string;
  description?: string;
  category: TemplateCategory;
  databaseType: DatabaseType;
  schemaData: Schema;
  previewImageUrl?: string;
  isOfficial: boolean;
  createdBy?: string;
  useCount: number;
}

export type TemplateCategory =
  | "ecommerce"
  | "saas"
  | "blog"
  | "social-network"
  | "crm"
  | "erp"
  | "inventory"
  | "booking"
  | "education"
  | "healthcare"
  | "finance"
  | "custom";

// Project activity
export interface ProjectActivity extends BaseEntity {
  projectId: string;
  userId: string;
  action: ActivityAction;
  entityType: ActivityEntityType;
  entityId?: string;
  changes?: Record<string, unknown>;
}

export type ActivityAction =
  | "created"
  | "updated"
  | "deleted"
  | "renamed"
  | "moved"
  | "shared"
  | "exported"
  | "imported"
  | "commented"
  | "snapshot_created"
  | "restored";

export type ActivityEntityType =
  | "project"
  | "table"
  | "column"
  | "relationship"
  | "index"
  | "constraint"
  | "comment"
  | "version";

// Project statistics
export interface ProjectStats {
  tableCount: number;
  columnCount: number;
  relationshipCount: number;
  indexCount: number;
  lastModified: Date;
  collaboratorCount: number;
  versionCount: number;
}
