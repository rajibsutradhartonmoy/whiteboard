"use client";

import { memo } from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import { Key, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface TableColumn {
  id: string;
  name: string;
  type: string;
  isPrimaryKey: boolean;
  isNullable: boolean;
  isUnique: boolean;
}

interface TableNodeData {
  name: string;
  columns: TableColumn[];
  color: string;
}

export const TableNode = memo(({ data, selected }: NodeProps) => {
  const { name, columns, color } = data as TableNodeData;

  return (
    <div
      className={cn(
        "min-w-[200px] bg-card border-2 rounded-lg shadow-sm overflow-hidden",
        selected && "ring-2 ring-primary ring-offset-2"
      )}
      style={{ borderColor: color }}
    >
      {/* Table header */}
      <div
        className="px-3 py-2 font-semibold text-sm text-white"
        style={{ backgroundColor: color }}
      >
        {name}
      </div>

      {/* Columns */}
      <div className="divide-y divide-border">
        {columns.map((column) => (
          <div
            key={column.id}
            className="px-3 py-1.5 flex items-center gap-2 text-xs relative group hover:bg-muted/50"
          >
            {/* Source handle (left) */}
            <Handle
              type="source"
              position={Position.Left}
              id={`${column.id}-source`}
              className="!w-2 !h-2 !bg-muted-foreground/50 !border-0 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ left: -4 }}
            />

            {/* Primary key indicator */}
            {column.isPrimaryKey && (
              <Key className="h-3 w-3 text-yellow-500 flex-shrink-0" />
            )}
            {!column.isPrimaryKey && <div className="w-3" />}

            {/* Column name */}
            <span className="font-medium flex-1 truncate">{column.name}</span>

            {/* Column type */}
            <span className="text-muted-foreground">{column.type}</span>

            {/* Nullable indicator */}
            {!column.isNullable && (
              <Circle className="h-2 w-2 fill-primary text-primary flex-shrink-0" />
            )}

            {/* Target handle (right) */}
            <Handle
              type="target"
              position={Position.Right}
              id={`${column.id}-target`}
              className="!w-2 !h-2 !bg-muted-foreground/50 !border-0 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ right: -4 }}
            />
          </div>
        ))}
      </div>

      {/* Empty state */}
      {columns.length === 0 && (
        <div className="px-3 py-2 text-xs text-muted-foreground italic">
          No columns defined
        </div>
      )}
    </div>
  );
});

TableNode.displayName = "TableNode";
