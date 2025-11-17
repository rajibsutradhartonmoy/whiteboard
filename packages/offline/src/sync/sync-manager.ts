import { db } from "../indexeddb/database";

interface SyncResult {
  success: boolean;
  syncedCount: number;
  failedCount: number;
  conflicts: number;
  errors: string[];
}

interface NetworkStatus {
  isOnline: boolean;
  lastChecked: Date;
}

export class SyncManager {
  private isRunning = false;
  private networkStatus: NetworkStatus = {
    isOnline: typeof navigator !== "undefined" ? navigator.onLine : true,
    lastChecked: new Date(),
  };

  constructor() {
    if (typeof window !== "undefined") {
      window.addEventListener("online", () => this.handleOnline());
      window.addEventListener("offline", () => this.handleOffline());
    }
  }

  private handleOnline(): void {
    this.networkStatus.isOnline = true;
    this.networkStatus.lastChecked = new Date();
    // Trigger sync when coming back online
    this.syncAll();
  }

  private handleOffline(): void {
    this.networkStatus.isOnline = false;
    this.networkStatus.lastChecked = new Date();
  }

  isOnline(): boolean {
    return this.networkStatus.isOnline;
  }

  async syncAll(): Promise<SyncResult> {
    if (this.isRunning) {
      return {
        success: false,
        syncedCount: 0,
        failedCount: 0,
        conflicts: 0,
        errors: ["Sync already in progress"],
      };
    }

    if (!this.isOnline()) {
      return {
        success: false,
        syncedCount: 0,
        failedCount: 0,
        conflicts: 0,
        errors: ["No internet connection"],
      };
    }

    this.isRunning = true;
    const result: SyncResult = {
      success: true,
      syncedCount: 0,
      failedCount: 0,
      conflicts: 0,
      errors: [],
    };

    try {
      const pendingOps = await db.getPendingOperations();

      for (const op of pendingOps) {
        try {
          await this.processOperation(op);
          await db.removePendingOperation(op.id!);
          result.syncedCount++;
        } catch (error) {
          result.failedCount++;
          result.errors.push(
            `Failed to sync ${op.entityType} ${op.entityId}: ${(error as Error).message}`
          );

          // Update retry count
          if (op.retryCount < 3) {
            await db.pendingOperations.update(op.id!, {
              retryCount: op.retryCount + 1,
              lastError: (error as Error).message,
            });
          }
        }
      }

      result.success = result.failedCount === 0;
    } catch (error) {
      result.success = false;
      result.errors.push((error as Error).message);
    } finally {
      this.isRunning = false;
    }

    return result;
  }

  private async processOperation(
    op: Awaited<ReturnType<typeof db.getPendingOperations>>[0]
  ): Promise<void> {
    // This would be implemented to actually sync with Supabase
    // For now, just simulate the operation
    console.log(`Processing ${op.operationType} for ${op.entityType}:`, op.data);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    // In real implementation:
    // 1. Send operation to Supabase
    // 2. Handle conflicts
    // 3. Update local data with remote IDs
    // 4. Mark as synced
  }

  async getQueuedOperationsCount(): Promise<number> {
    return db.getUnsyncedCount();
  }

  async clearQueue(projectId?: string): Promise<void> {
    if (projectId) {
      await db.clearPendingOperations(projectId);
    } else {
      await db.pendingOperations.clear();
    }
  }
}

// Singleton instance
export const syncManager = new SyncManager();
