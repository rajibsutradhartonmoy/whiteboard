import { Schema } from "./schema";
import { DatabaseType } from "./database";

// Import source types
export type ImportSource =
  | "sql-file"
  | "database-connection"
  | "csv"
  | "excel"
  | "json"
  | "yaml"
  | "prisma"
  | "typeorm"
  | "sequelize"
  | "mongoose"
  | "graphql"
  | "openapi";

// SQL file import options
export interface SqlImportOptions {
  sourceDatabase: DatabaseType;
  parseComments: boolean;
  inferRelationships: boolean;
  preserveTableOrder: boolean;
  schemaFilter?: string[];
  tableFilter?: string[];
}

// Database connection import
export interface DatabaseConnectionOptions {
  type: DatabaseType;
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  ssl?: boolean;
  schema?: string;
  includeViews?: boolean;
  includeTriggers?: boolean;
}

// CSV/Excel import
export interface SpreadsheetImportOptions {
  hasHeaders: boolean;
  delimiter?: string;
  inferTypes: boolean;
  tableName: string;
  sheetName?: string;
  dateFormat?: string;
  nullValues?: string[];
}

// ORM schema import
export interface OrmImportOptions {
  framework: "prisma" | "typeorm" | "sequelize" | "mongoose";
  inferRelationships: boolean;
  preserveDecorators: boolean;
}

// GraphQL schema import
export interface GraphqlImportOptions {
  includeQueries: boolean;
  includeMutations: boolean;
  includeSubscriptions: boolean;
  inferRelationships: boolean;
}

// OpenAPI/Swagger import
export interface OpenApiImportOptions {
  version: "2.0" | "3.0" | "3.1";
  includeRequestBodies: boolean;
  includeResponses: boolean;
  flattenSchemas: boolean;
}

// Import job
export interface ImportJob {
  id: string;
  projectId: string;
  userId: string;
  source: ImportSource;
  options: ImportOptions;
  status: ImportStatus;
  sourceFileUrl?: string;
  result?: ImportResult;
  errorMessage?: string;
  createdAt: Date;
  completedAt?: Date;
}

export type ImportOptions =
  | SqlImportOptions
  | DatabaseConnectionOptions
  | SpreadsheetImportOptions
  | OrmImportOptions
  | GraphqlImportOptions
  | OpenApiImportOptions;

export type ImportStatus =
  | "pending"
  | "validating"
  | "processing"
  | "completed"
  | "failed";

// Import result
export interface ImportResult {
  success: boolean;
  schema: Schema;
  warnings: ImportWarning[];
  errors: ImportError[];
  statistics: ImportStatistics;
}

export interface ImportWarning {
  type: string;
  message: string;
  location?: string;
  suggestion?: string;
}

export interface ImportError {
  type: string;
  message: string;
  location?: string;
  fatal: boolean;
}

export interface ImportStatistics {
  tablesImported: number;
  columnsImported: number;
  relationshipsInferred: number;
  indexesImported: number;
  enumsImported: number;
  triggersImported: number;
  viewsImported: number;
  parseTime: number;
  totalTime: number;
}

// Import preview
export interface ImportPreview {
  source: ImportSource;
  detectedDatabase?: DatabaseType;
  tables: ImportTablePreview[];
  relationships: ImportRelationshipPreview[];
  issues: ImportWarning[];
}

export interface ImportTablePreview {
  name: string;
  columnCount: number;
  columns: ImportColumnPreview[];
  hasIssues: boolean;
}

export interface ImportColumnPreview {
  name: string;
  dataType: string;
  nullable: boolean;
  isPrimaryKey: boolean;
  isForeignKey: boolean;
  hasIssues: boolean;
  issue?: string;
}

export interface ImportRelationshipPreview {
  sourceTable: string;
  targetTable: string;
  type: string;
  inferred: boolean;
}

// File upload for import
export interface ImportFileUpload {
  file: File;
  fileName: string;
  fileSize: number;
  mimeType: string;
  uploadProgress: number;
  uploadedUrl?: string;
}
