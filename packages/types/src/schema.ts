import {
  DatabaseType,
  IndexType,
  ReferentialAction,
  ConstraintType,
} from "./database";

// Base entity with common fields
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// Position on canvas
export interface Position {
  x: number;
  y: number;
}

// Table definition
export interface Table extends BaseEntity {
  projectId: string;
  name: string;
  schemaName: string;
  description?: string;
  color: string;
  position: Position;
  isView: boolean;
  viewDefinition?: string;
  options: TableOptions;
  metadata: Record<string, unknown>;
}

export interface TableOptions {
  engine?: string; // MySQL: InnoDB, MyISAM, etc.
  charset?: string;
  collation?: string;
  tablespace?: string;
  partitioning?: PartitioningOptions;
  temporary?: boolean;
  unlogged?: boolean; // PostgreSQL
}

export interface PartitioningOptions {
  type: "range" | "list" | "hash" | "key";
  columns: string[];
  partitions: Partition[];
}

export interface Partition {
  name: string;
  values?: string[];
  from?: string;
  to?: string;
}

// Column definition
export interface Column extends BaseEntity {
  tableId: string;
  name: string;
  dataType: string;
  isPrimaryKey: boolean;
  isNullable: boolean;
  isUnique: boolean;
  isArray: boolean;
  defaultValue?: string;
  checkConstraint?: string;
  description?: string;
  ordinalPosition: number;
  options: ColumnOptions;
  metadata: Record<string, unknown>;
}

export interface ColumnOptions {
  length?: number;
  precision?: number;
  scale?: number;
  autoIncrement?: boolean;
  generated?: GeneratedColumnOptions;
  enumValues?: string[];
  foreignKey?: ForeignKeyOptions;
  collation?: string;
  charset?: string;
  srid?: number; // Spatial reference ID
  onUpdate?: string; // MySQL CURRENT_TIMESTAMP
}

export interface GeneratedColumnOptions {
  type: "stored" | "virtual";
  expression: string;
}

export interface ForeignKeyOptions {
  referencedTableId: string;
  referencedColumnId: string;
  onDelete: ReferentialAction;
  onUpdate: ReferentialAction;
  constraintName?: string;
}

// Relationship (Edge between tables)
export interface Relationship extends BaseEntity {
  projectId: string;
  name?: string;
  sourceTableId: string;
  targetTableId: string;
  sourceColumnId: string;
  targetColumnId: string;
  type: RelationshipType;
  onDelete: ReferentialAction;
  onUpdate: ReferentialAction;
  isComposite: boolean;
  compositeColumns: CompositeColumn[];
  metadata: Record<string, unknown>;
}

export type RelationshipType = "one-to-one" | "one-to-many" | "many-to-many";

export interface CompositeColumn {
  sourceColumnId: string;
  targetColumnId: string;
}

// Index definition
export interface Index extends BaseEntity {
  tableId: string;
  name: string;
  type: IndexType;
  columnIds: string[];
  isUnique: boolean;
  whereClause?: string;
  includeColumnIds?: string[];
  options: IndexOptions;
}

export interface IndexOptions {
  fillFactor?: number;
  method?: string;
  operatorClass?: string;
  sortOrder?: "ASC" | "DESC";
  nullsPosition?: "FIRST" | "LAST";
}

// Check constraint
export interface CheckConstraint extends BaseEntity {
  tableId: string;
  name: string;
  expression: string;
  columnIds?: string[];
}

// Unique constraint (when not on single column)
export interface UniqueConstraint extends BaseEntity {
  tableId: string;
  name: string;
  columnIds: string[];
}

// Enum type
export interface EnumType extends BaseEntity {
  projectId: string;
  name: string;
  values: string[];
  description?: string;
}

// Trigger
export interface Trigger extends BaseEntity {
  tableId: string;
  name: string;
  timing: "BEFORE" | "AFTER" | "INSTEAD OF";
  event: "INSERT" | "UPDATE" | "DELETE" | "TRUNCATE";
  forEach: "ROW" | "STATEMENT";
  functionName: string;
  functionBody?: string;
  condition?: string;
  enabled: boolean;
}

// View
export interface View extends BaseEntity {
  projectId: string;
  name: string;
  schemaName: string;
  definition: string;
  isMaterialized: boolean;
  columns: ViewColumn[];
}

export interface ViewColumn {
  name: string;
  dataType: string;
}

// Complete schema representation
export interface Schema {
  projectId: string;
  databaseType: DatabaseType;
  tables: Table[];
  columns: Column[];
  relationships: Relationship[];
  indexes: Index[];
  enums: EnumType[];
  triggers: Trigger[];
  views: View[];
  checkConstraints: CheckConstraint[];
  uniqueConstraints: UniqueConstraint[];
}

// Schema validation result
export interface ValidationIssue {
  id: string;
  type: "error" | "warning" | "info";
  category:
    | "naming"
    | "structure"
    | "performance"
    | "security"
    | "best-practice";
  entityType: "table" | "column" | "relationship" | "index" | "constraint";
  entityId: string;
  message: string;
  suggestion?: string;
  autoFixable: boolean;
}

export interface ValidationResult {
  isValid: boolean;
  issues: ValidationIssue[];
  score: number; // 0-100
}
