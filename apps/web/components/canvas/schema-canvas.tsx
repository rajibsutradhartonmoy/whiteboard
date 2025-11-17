"use client";

import { useCallback, useRef } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Panel,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  BackgroundVariant,
  ConnectionMode,
  MarkerType,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCanvasStore } from "@/stores/canvas-store";
import { TableNode } from "@/components/nodes/table-node";
import { Button } from "@/components/ui/button";
import { Plus, Table2 } from "lucide-react";

// Custom node types
const nodeTypes = {
  table: TableNode,
};

interface SchemaCanvasProps {
  projectId: string;
}

export function SchemaCanvas({ projectId }: SchemaCanvasProps) {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const {
    zoom,
    setZoom,
    setPan,
    showMinimap,
    showGrid,
    snapToGrid,
    gridSize,
    setSelectedNodes,
    setSelectedEdges,
  } = useCanvasStore();

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: "smoothstep",
            animated: false,
            markerEnd: {
              type: MarkerType.ArrowClosed,
              width: 20,
              height: 20,
            },
          },
          eds
        )
      );
    },
    [setEdges]
  );

  const onSelectionChange = useCallback(
    ({
      nodes: selectedNodes,
      edges: selectedEdges,
    }: {
      nodes: Node[];
      edges: Edge[];
    }) => {
      setSelectedNodes(selectedNodes.map((n) => n.id));
      setSelectedEdges(selectedEdges.map((e) => e.id));
    },
    [setSelectedNodes, setSelectedEdges]
  );

  const handleAddTable = useCallback(() => {
    const newTable: Node = {
      id: `table-${Date.now()}`,
      type: "table",
      position: {
        x: Math.random() * 500,
        y: Math.random() * 500,
      },
      data: {
        name: `new_table_${nodes.length + 1}`,
        columns: [
          {
            id: `col-${Date.now()}`,
            name: "id",
            type: "uuid",
            isPrimaryKey: true,
            isNullable: false,
            isUnique: true,
          },
        ],
        color: "#3b82f6",
      },
    };
    setNodes((nds) => [...nds, newTable]);
  }, [nodes.length, setNodes]);

  return (
    <div ref={reactFlowWrapper} className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onSelectionChange={onSelectionChange}
        nodeTypes={nodeTypes}
        connectionMode={ConnectionMode.Loose}
        snapToGrid={snapToGrid}
        snapGrid={[gridSize, gridSize]}
        fitView
        attributionPosition="bottom-left"
        className="bg-muted/30"
      >
        {showGrid && (
          <Background
            variant={BackgroundVariant.Dots}
            gap={gridSize}
            size={1}
            color="hsl(var(--muted-foreground) / 0.3)"
          />
        )}

        <Controls
          position="bottom-right"
          showZoom={false}
          showFitView={false}
          showInteractive={false}
        />

        {showMinimap && (
          <MiniMap
            position="bottom-left"
            pannable
            zoomable
            className="bg-background border rounded-lg"
          />
        )}

        <Panel position="top-left" className="flex gap-2">
          <Button size="sm" onClick={handleAddTable}>
            <Table2 className="h-4 w-4 mr-2" />
            Add Table
          </Button>
        </Panel>

        <Panel position="top-right" className="bg-background/80 backdrop-blur-sm border rounded-lg p-3">
          <div className="text-xs text-muted-foreground space-y-1">
            <p>
              <strong>Click</strong> canvas to deselect
            </p>
            <p>
              <strong>Drag</strong> from handle to connect
            </p>
            <p>
              <strong>Click</strong> table to select
            </p>
            <p>
              <strong>Delete</strong> to remove selected
            </p>
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
}
