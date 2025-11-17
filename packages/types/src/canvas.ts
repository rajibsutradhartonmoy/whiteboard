import { Position } from "./schema";
import { Table, Column, Relationship } from "./schema";

// React Flow node data
export interface TableNodeData {
  table: Table;
  columns: Column[];
  isSelected: boolean;
  isHighlighted: boolean;
  isEditing: boolean;
  validationIssues: string[];
}

export interface GroupNodeData {
  id: string;
  name: string;
  color: string;
  tableIds: string[];
  collapsed: boolean;
}

export interface NoteNodeData {
  id: string;
  content: string;
  color: string;
  fontSize: number;
}

// React Flow edge data
export interface RelationshipEdgeData {
  relationship: Relationship;
  sourceTableName: string;
  targetTableName: string;
  sourceColumnName: string;
  targetColumnName: string;
  isSelected: boolean;
  isHighlighted: boolean;
}

// Node types
export type CanvasNodeType = "table" | "group" | "note" | "enum";

// Edge types
export type CanvasEdgeType = "relationship";

// Layout algorithms
export type LayoutAlgorithm =
  | "force-directed"
  | "hierarchical"
  | "circular"
  | "dagre"
  | "elk"
  | "manual";

// Connection line types
export type ConnectionLineType =
  | "straight"
  | "step"
  | "smoothstep"
  | "bezier";

// Edge routing
export type EdgeRouting =
  | "orthogonal"
  | "straight"
  | "curved"
  | "smart";

// Canvas viewport
export interface CanvasViewport {
  x: number;
  y: number;
  zoom: number;
}

// Canvas selection
export interface CanvasSelection {
  nodeIds: string[];
  edgeIds: string[];
  selectionBox?: SelectionBox;
}

export interface SelectionBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

// Canvas interaction mode
export type InteractionMode =
  | "select"
  | "pan"
  | "zoom"
  | "create-table"
  | "create-relationship"
  | "create-note"
  | "create-group";

// Canvas state
export interface CanvasStore {
  // Viewport
  viewport: CanvasViewport;
  setViewport: (viewport: CanvasViewport) => void;

  // Selection
  selection: CanvasSelection;
  selectNodes: (ids: string[]) => void;
  selectEdges: (ids: string[]) => void;
  clearSelection: () => void;

  // Interaction
  interactionMode: InteractionMode;
  setInteractionMode: (mode: InteractionMode) => void;

  // UI state
  showMinimap: boolean;
  showGrid: boolean;
  snapToGrid: boolean;
  gridSize: number;
  connectionLineType: ConnectionLineType;

  // Actions
  fitView: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
}

// Minimap settings
export interface MinimapSettings {
  visible: boolean;
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  width: number;
  height: number;
  nodeColor: string;
  maskColor: string;
}

// Grid settings
export interface GridSettings {
  visible: boolean;
  size: number;
  color: string;
  snap: boolean;
}

// Canvas toolbar action
export interface ToolbarAction {
  id: string;
  label: string;
  icon: string;
  shortcut?: string;
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
}

// Canvas context menu
export interface ContextMenuItem {
  id: string;
  label: string;
  icon?: string;
  shortcut?: string;
  onClick: () => void;
  disabled?: boolean;
  divider?: boolean;
  children?: ContextMenuItem[];
}

// Export canvas settings
export interface CanvasExportSettings {
  format: "png" | "svg" | "pdf" | "jpg";
  quality: number;
  scale: number;
  backgroundColor: string;
  includeWatermark: boolean;
  padding: number;
}

// Auto-layout options
export interface AutoLayoutOptions {
  algorithm: LayoutAlgorithm;
  direction?: "TB" | "BT" | "LR" | "RL";
  spacing: {
    node: number;
    rank: number;
  };
  centerGraph: boolean;
  animate: boolean;
}
