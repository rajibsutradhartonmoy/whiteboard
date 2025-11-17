import { DatabaseType, SqlDatabaseType } from "./database";

// Export formats
export type ExportFormat =
  | "sql"
  | "prisma"
  | "typeorm"
  | "sequelize"
  | "sqlalchemy"
  | "django"
  | "laravel"
  | "mongoose"
  | "graphql"
  | "rest"
  | "trpc"
  | "markdown"
  | "html"
  | "pdf"
  | "png"
  | "svg"
  | "mermaid"
  | "plantuml"
  | "json"
  | "yaml";

// SQL export options
export interface SqlExportOptions {
  targetDatabase: SqlDatabaseType;
  includeDropStatements: boolean;
  includeIfNotExists: boolean;
  includeComments: boolean;
  includeForeignKeys: boolean;
  includeIndexes: boolean;
  includeTriggers: boolean;
  includeViews: boolean;
  schemaName?: string;
  tablePrefix?: string;
  formatSql: boolean;
  generateMigrations: boolean;
  migrationFormat?: "timestamp" | "sequential";
}

// ORM export options
export interface OrmExportOptions {
  framework:
    | "prisma"
    | "typeorm"
    | "sequelize"
    | "sqlalchemy"
    | "django"
    | "laravel"
    | "mongoose";
  language?: "typescript" | "javascript" | "python" | "php";
  includeRelations: boolean;
  includeValidation: boolean;
  includeTimestamps: boolean;
  generateRepository?: boolean;
  generateMigrations?: boolean;
  namingStrategy?: "camelCase" | "snake_case" | "PascalCase";
}

// API export options
export interface ApiExportOptions {
  type: "graphql" | "rest" | "trpc";
  includeQueries: boolean;
  includeMutations: boolean;
  includeSubscriptions?: boolean;
  generateResolvers?: boolean;
  generateControllers?: boolean;
  generateRoutes?: boolean;
  authStrategy?: "jwt" | "session" | "apikey" | "none";
  paginationStyle?: "offset" | "cursor";
}

// Documentation export options
export interface DocExportOptions {
  format: "markdown" | "html" | "pdf";
  includeTableDescriptions: boolean;
  includeColumnDescriptions: boolean;
  includeRelationships: boolean;
  includeIndexes: boolean;
  includeSampleData: boolean;
  includeErDiagram: boolean;
  tableOfContents: boolean;
  theme?: "light" | "dark";
  customCss?: string;
}

// Diagram export options
export interface DiagramExportOptions {
  format: "png" | "svg" | "pdf" | "mermaid" | "plantuml";
  width?: number;
  height?: number;
  scale?: number;
  quality?: number;
  backgroundColor?: string;
  includeRelationshipLabels: boolean;
  includeColumnTypes: boolean;
  includePrimaryKeys: boolean;
  includeForeignKeys: boolean;
  theme?: "default" | "dark" | "forest" | "neutral";
}

// Export job
export interface ExportJob {
  id: string;
  projectId: string;
  userId: string;
  format: ExportFormat;
  options: ExportOptions;
  status: ExportStatus;
  fileUrl?: string;
  fileSize?: number;
  errorMessage?: string;
  createdAt: Date;
  completedAt?: Date;
}

export type ExportOptions =
  | SqlExportOptions
  | OrmExportOptions
  | ApiExportOptions
  | DocExportOptions
  | DiagramExportOptions;

export type ExportStatus = "pending" | "processing" | "completed" | "failed";

// Export result
export interface ExportResult {
  success: boolean;
  format: ExportFormat;
  content?: string;
  fileUrl?: string;
  fileName?: string;
  mimeType?: string;
  size?: number;
  error?: string;
  warnings?: string[];
}

// Code generation templates
export interface CodeTemplate {
  id: string;
  name: string;
  language: string;
  framework: string;
  template: string;
  variables: TemplateVariable[];
}

export interface TemplateVariable {
  name: string;
  type: "string" | "boolean" | "number" | "array" | "object";
  description: string;
  required: boolean;
  defaultValue?: unknown;
}
