import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type {
  Table,
  Column,
  Relationship,
  Index,
  EnumType,
} from "@whiteboard/types";

interface SchemaState {
  // Data
  tables: Map<string, Table>;
  columns: Map<string, Column>;
  relationships: Map<string, Relationship>;
  indexes: Map<string, Index>;
  enums: Map<string, EnumType>;

  // Selected
  selectedTableId: string | null;
  selectedColumnId: string | null;

  // Loading
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;

  // Table actions
  addTable: (table: Table) => void;
  updateTable: (id: string, updates: Partial<Table>) => void;
  deleteTable: (id: string) => void;
  setSelectedTable: (id: string | null) => void;

  // Column actions
  addColumn: (column: Column) => void;
  updateColumn: (id: string, updates: Partial<Column>) => void;
  deleteColumn: (id: string) => void;
  reorderColumns: (tableId: string, columnIds: string[]) => void;
  setSelectedColumn: (id: string | null) => void;

  // Relationship actions
  addRelationship: (relationship: Relationship) => void;
  updateRelationship: (id: string, updates: Partial<Relationship>) => void;
  deleteRelationship: (id: string) => void;

  // Index actions
  addIndex: (index: Index) => void;
  deleteIndex: (id: string) => void;

  // Enum actions
  addEnum: (enumType: EnumType) => void;
  updateEnum: (id: string, updates: Partial<EnumType>) => void;
  deleteEnum: (id: string) => void;

  // Bulk operations
  loadSchema: (data: {
    tables: Table[];
    columns: Column[];
    relationships: Relationship[];
    indexes: Index[];
    enums: EnumType[];
  }) => void;
  clearSchema: () => void;

  // State management
  setLoading: (loading: boolean) => void;
  setSaving: (saving: boolean) => void;
  setError: (error: string | null) => void;
}

const initialState = {
  tables: new Map<string, Table>(),
  columns: new Map<string, Column>(),
  relationships: new Map<string, Relationship>(),
  indexes: new Map<string, Index>(),
  enums: new Map<string, EnumType>(),
  selectedTableId: null,
  selectedColumnId: null,
  isLoading: false,
  isSaving: false,
  error: null,
};

export const useSchemaStore = create<SchemaState>()(
  immer((set, get) => ({
    ...initialState,

    // Table actions
    addTable: (table) =>
      set((state) => {
        state.tables.set(table.id, table);
      }),

    updateTable: (id, updates) =>
      set((state) => {
        const table = state.tables.get(id);
        if (table) {
          state.tables.set(id, { ...table, ...updates, updatedAt: new Date() });
        }
      }),

    deleteTable: (id) =>
      set((state) => {
        state.tables.delete(id);
        // Delete associated columns
        const columnsToDelete: string[] = [];
        state.columns.forEach((col, colId) => {
          if (col.tableId === id) columnsToDelete.push(colId);
        });
        columnsToDelete.forEach((colId) => state.columns.delete(colId));

        // Delete associated relationships
        const relsToDelete: string[] = [];
        state.relationships.forEach((rel, relId) => {
          if (rel.sourceTableId === id || rel.targetTableId === id) {
            relsToDelete.push(relId);
          }
        });
        relsToDelete.forEach((relId) => state.relationships.delete(relId));

        // Delete associated indexes
        const indexesToDelete: string[] = [];
        state.indexes.forEach((idx, idxId) => {
          if (idx.tableId === id) indexesToDelete.push(idxId);
        });
        indexesToDelete.forEach((idxId) => state.indexes.delete(idxId));

        if (state.selectedTableId === id) {
          state.selectedTableId = null;
        }
      }),

    setSelectedTable: (id) =>
      set((state) => {
        state.selectedTableId = id;
        state.selectedColumnId = null;
      }),

    // Column actions
    addColumn: (column) =>
      set((state) => {
        state.columns.set(column.id, column);
      }),

    updateColumn: (id, updates) =>
      set((state) => {
        const column = state.columns.get(id);
        if (column) {
          state.columns.set(id, {
            ...column,
            ...updates,
            updatedAt: new Date(),
          });
        }
      }),

    deleteColumn: (id) =>
      set((state) => {
        state.columns.delete(id);
        // Delete relationships that reference this column
        const relsToDelete: string[] = [];
        state.relationships.forEach((rel, relId) => {
          if (rel.sourceColumnId === id || rel.targetColumnId === id) {
            relsToDelete.push(relId);
          }
        });
        relsToDelete.forEach((relId) => state.relationships.delete(relId));

        if (state.selectedColumnId === id) {
          state.selectedColumnId = null;
        }
      }),

    reorderColumns: (tableId, columnIds) =>
      set((state) => {
        columnIds.forEach((id, index) => {
          const column = state.columns.get(id);
          if (column && column.tableId === tableId) {
            state.columns.set(id, { ...column, ordinalPosition: index });
          }
        });
      }),

    setSelectedColumn: (id) =>
      set((state) => {
        state.selectedColumnId = id;
      }),

    // Relationship actions
    addRelationship: (relationship) =>
      set((state) => {
        state.relationships.set(relationship.id, relationship);
      }),

    updateRelationship: (id, updates) =>
      set((state) => {
        const rel = state.relationships.get(id);
        if (rel) {
          state.relationships.set(id, {
            ...rel,
            ...updates,
            updatedAt: new Date(),
          });
        }
      }),

    deleteRelationship: (id) =>
      set((state) => {
        state.relationships.delete(id);
      }),

    // Index actions
    addIndex: (index) =>
      set((state) => {
        state.indexes.set(index.id, index);
      }),

    deleteIndex: (id) =>
      set((state) => {
        state.indexes.delete(id);
      }),

    // Enum actions
    addEnum: (enumType) =>
      set((state) => {
        state.enums.set(enumType.id, enumType);
      }),

    updateEnum: (id, updates) =>
      set((state) => {
        const enumType = state.enums.get(id);
        if (enumType) {
          state.enums.set(id, { ...enumType, ...updates });
        }
      }),

    deleteEnum: (id) =>
      set((state) => {
        state.enums.delete(id);
      }),

    // Bulk operations
    loadSchema: (data) =>
      set((state) => {
        state.tables.clear();
        state.columns.clear();
        state.relationships.clear();
        state.indexes.clear();
        state.enums.clear();

        data.tables.forEach((t) => state.tables.set(t.id, t));
        data.columns.forEach((c) => state.columns.set(c.id, c));
        data.relationships.forEach((r) => state.relationships.set(r.id, r));
        data.indexes.forEach((i) => state.indexes.set(i.id, i));
        data.enums.forEach((e) => state.enums.set(e.id, e));
      }),

    clearSchema: () =>
      set((state) => {
        state.tables.clear();
        state.columns.clear();
        state.relationships.clear();
        state.indexes.clear();
        state.enums.clear();
        state.selectedTableId = null;
        state.selectedColumnId = null;
      }),

    // State management
    setLoading: (loading) =>
      set((state) => {
        state.isLoading = loading;
      }),

    setSaving: (saving) =>
      set((state) => {
        state.isSaving = saving;
      }),

    setError: (error) =>
      set((state) => {
        state.error = error;
      }),
  }))
);

// Selectors
export const selectTableColumns = (tableId: string) => {
  const state = useSchemaStore.getState();
  const columns: Column[] = [];
  state.columns.forEach((col) => {
    if (col.tableId === tableId) columns.push(col);
  });
  return columns.sort((a, b) => a.ordinalPosition - b.ordinalPosition);
};

export const selectTableRelationships = (tableId: string) => {
  const state = useSchemaStore.getState();
  const relationships: Relationship[] = [];
  state.relationships.forEach((rel) => {
    if (rel.sourceTableId === tableId || rel.targetTableId === tableId) {
      relationships.push(rel);
    }
  });
  return relationships;
};

export const selectTableIndexes = (tableId: string) => {
  const state = useSchemaStore.getState();
  const indexes: Index[] = [];
  state.indexes.forEach((idx) => {
    if (idx.tableId === tableId) indexes.push(idx);
  });
  return indexes;
};
