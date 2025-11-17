import Dexie, { Table } from "dexie";

// Local database schema types
interface LocalProject {
  id: string;
  remoteId?: string;
  name: string;
  slug: string;
  description?: string;
  databaseType: string;
  ownerId: string;
  settings: object;
  canvasState: object;
  tags: string[];
  syncStatus: "synced" | "pending" | "conflict";
  lastSyncedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface LocalTable {
  id: string;
  remoteId?: string;
  projectId: string;
  name: string;
  schemaName: string;
  description?: string;
  color: string;
  position: { x: number; y: number };
  isView: boolean;
  tableOptions: object;
  metadata: object;
  syncStatus: "synced" | "pending" | "conflict";
  createdAt: Date;
  updatedAt: Date;
}

interface LocalColumn {
  id: string;
  remoteId?: string;
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
  columnOptions: object;
  metadata: object;
  syncStatus: "synced" | "pending" | "conflict";
  createdAt: Date;
  updatedAt: Date;
}

interface LocalRelationship {
  id: string;
  remoteId?: string;
  projectId: string;
  name?: string;
  sourceTableId: string;
  targetTableId: string;
  sourceColumnId: string;
  targetColumnId: string;
  relationshipType: string;
  onDelete: string;
  onUpdate: string;
  isComposite: boolean;
  compositeColumns: object[];
  metadata: object;
  syncStatus: "synced" | "pending" | "conflict";
  createdAt: Date;
  updatedAt: Date;
}

interface PendingOperation {
  id?: number;
  projectId: string;
  operationType: "create" | "update" | "delete";
  entityType: "project" | "table" | "column" | "relationship";
  entityId: string;
  data: object;
  timestamp: number;
  retryCount: number;
  lastError?: string;
}

interface SyncConflict {
  id?: number;
  projectId: string;
  entityType: string;
  entityId: string;
  localData: object;
  remoteData: object;
  conflictType: string;
  resolvedAt?: Date;
  resolution?: string;
  createdAt: Date;
}

export class WhiteboardDatabase extends Dexie {
  projects!: Table<LocalProject>;
  tables!: Table<LocalTable>;
  columns!: Table<LocalColumn>;
  relationships!: Table<LocalRelationship>;
  pendingOperations!: Table<PendingOperation>;
  syncConflicts!: Table<SyncConflict>;

  constructor() {
    super("WhiteboardOfflineDB");

    this.version(1).stores({
      projects: "id, remoteId, ownerId, syncStatus, updatedAt",
      tables: "id, remoteId, projectId, syncStatus, updatedAt",
      columns: "id, remoteId, tableId, syncStatus, updatedAt",
      relationships:
        "id, remoteId, projectId, sourceTableId, targetTableId, syncStatus",
      pendingOperations: "++id, projectId, entityType, entityId, timestamp",
      syncConflicts: "++id, projectId, entityType, entityId, createdAt",
    });
  }

  // Get all pending operations for a project
  async getPendingOperations(projectId?: string): Promise<PendingOperation[]> {
    if (projectId) {
      return this.pendingOperations
        .where("projectId")
        .equals(projectId)
        .sortBy("timestamp");
    }
    return this.pendingOperations.orderBy("timestamp").toArray();
  }

  // Add a pending operation
  async addPendingOperation(
    operation: Omit<PendingOperation, "id" | "timestamp" | "retryCount">
  ): Promise<number> {
    return this.pendingOperations.add({
      ...operation,
      timestamp: Date.now(),
      retryCount: 0,
    });
  }

  // Remove a pending operation
  async removePendingOperation(id: number): Promise<void> {
    await this.pendingOperations.delete(id);
  }

  // Get unsynced changes count
  async getUnsyncedCount(): Promise<number> {
    return this.pendingOperations.count();
  }

  // Clear all pending operations for a project
  async clearPendingOperations(projectId: string): Promise<void> {
    await this.pendingOperations
      .where("projectId")
      .equals(projectId)
      .delete();
  }

  // Save project locally
  async saveProjectLocally(project: LocalProject): Promise<void> {
    await this.projects.put(project);
  }

  // Get project from local storage
  async getLocalProject(id: string): Promise<LocalProject | undefined> {
    return this.projects.get(id);
  }

  // Save table locally
  async saveTableLocally(table: LocalTable): Promise<void> {
    await this.tables.put(table);
  }

  // Get all tables for a project
  async getProjectTables(projectId: string): Promise<LocalTable[]> {
    return this.tables.where("projectId").equals(projectId).toArray();
  }

  // Save column locally
  async saveColumnLocally(column: LocalColumn): Promise<void> {
    await this.columns.put(column);
  }

  // Get all columns for a table
  async getTableColumns(tableId: string): Promise<LocalColumn[]> {
    return this.columns.where("tableId").equals(tableId).toArray();
  }

  // Add conflict
  async addConflict(conflict: Omit<SyncConflict, "id">): Promise<number> {
    return this.syncConflicts.add(conflict);
  }

  // Get unresolved conflicts
  async getUnresolvedConflicts(): Promise<SyncConflict[]> {
    return this.syncConflicts
      .filter((c) => !c.resolvedAt)
      .toArray();
  }

  // Clear all local data
  async clearAllData(): Promise<void> {
    await this.transaction(
      "rw",
      [
        this.projects,
        this.tables,
        this.columns,
        this.relationships,
        this.pendingOperations,
        this.syncConflicts,
      ],
      async () => {
        await this.projects.clear();
        await this.tables.clear();
        await this.columns.clear();
        await this.relationships.clear();
        await this.pendingOperations.clear();
        await this.syncConflicts.clear();
      }
    );
  }
}

// Singleton instance
export const db = new WhiteboardDatabase();
