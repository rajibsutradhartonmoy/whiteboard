import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface CanvasState {
  // Viewport
  zoom: number;
  pan: { x: number; y: number };

  // Selection
  selectedNodeIds: string[];
  selectedEdgeIds: string[];

  // UI state
  showMinimap: boolean;
  showGrid: boolean;
  snapToGrid: boolean;
  gridSize: number;

  // Interaction mode
  interactionMode: "select" | "pan" | "create-table" | "create-relationship";

  // Actions
  setZoom: (zoom: number) => void;
  setPan: (pan: { x: number; y: number }) => void;
  setSelectedNodes: (ids: string[]) => void;
  setSelectedEdges: (ids: string[]) => void;
  clearSelection: () => void;
  toggleMinimap: () => void;
  toggleGrid: () => void;
  toggleSnapToGrid: () => void;
  setGridSize: (size: number) => void;
  setInteractionMode: (
    mode: "select" | "pan" | "create-table" | "create-relationship"
  ) => void;
  reset: () => void;
}

const initialState = {
  zoom: 1,
  pan: { x: 0, y: 0 },
  selectedNodeIds: [],
  selectedEdgeIds: [],
  showMinimap: true,
  showGrid: true,
  snapToGrid: true,
  gridSize: 20,
  interactionMode: "select" as const,
};

export const useCanvasStore = create<CanvasState>()(
  immer((set) => ({
    ...initialState,

    setZoom: (zoom) =>
      set((state) => {
        state.zoom = Math.max(0.1, Math.min(4, zoom));
      }),

    setPan: (pan) =>
      set((state) => {
        state.pan = pan;
      }),

    setSelectedNodes: (ids) =>
      set((state) => {
        state.selectedNodeIds = ids;
      }),

    setSelectedEdges: (ids) =>
      set((state) => {
        state.selectedEdgeIds = ids;
      }),

    clearSelection: () =>
      set((state) => {
        state.selectedNodeIds = [];
        state.selectedEdgeIds = [];
      }),

    toggleMinimap: () =>
      set((state) => {
        state.showMinimap = !state.showMinimap;
      }),

    toggleGrid: () =>
      set((state) => {
        state.showGrid = !state.showGrid;
      }),

    toggleSnapToGrid: () =>
      set((state) => {
        state.snapToGrid = !state.snapToGrid;
      }),

    setGridSize: (size) =>
      set((state) => {
        state.gridSize = size;
      }),

    setInteractionMode: (mode) =>
      set((state) => {
        state.interactionMode = mode;
      }),

    reset: () => set(initialState),
  }))
);
