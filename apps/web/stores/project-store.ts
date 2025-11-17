import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import type { Project, ProjectSettings } from "@whiteboard/types";

interface ProjectState {
  // Current project
  currentProject: Project | null;
  projects: Project[];
  isLoading: boolean;
  error: string | null;

  // Actions
  setCurrentProject: (project: Project | null) => void;
  setProjects: (projects: Project[]) => void;
  addProject: (project: Project) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  updateProjectSettings: (settings: Partial<ProjectSettings>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const initialState = {
  currentProject: null,
  projects: [],
  isLoading: false,
  error: null,
};

export const useProjectStore = create<ProjectState>()(
  persist(
    immer((set) => ({
      ...initialState,

      setCurrentProject: (project) =>
        set((state) => {
          state.currentProject = project;
        }),

      setProjects: (projects) =>
        set((state) => {
          state.projects = projects;
        }),

      addProject: (project) =>
        set((state) => {
          state.projects.push(project);
        }),

      updateProject: (id, updates) =>
        set((state) => {
          const index = state.projects.findIndex((p) => p.id === id);
          if (index !== -1) {
            state.projects[index] = { ...state.projects[index], ...updates };
          }
          if (state.currentProject?.id === id) {
            state.currentProject = { ...state.currentProject, ...updates };
          }
        }),

      deleteProject: (id) =>
        set((state) => {
          state.projects = state.projects.filter((p) => p.id !== id);
          if (state.currentProject?.id === id) {
            state.currentProject = null;
          }
        }),

      updateProjectSettings: (settings) =>
        set((state) => {
          if (state.currentProject) {
            state.currentProject.settings = {
              ...state.currentProject.settings,
              ...settings,
            };
          }
        }),

      setLoading: (loading) =>
        set((state) => {
          state.isLoading = loading;
        }),

      setError: (error) =>
        set((state) => {
          state.error = error;
        }),

      reset: () => set(initialState),
    })),
    {
      name: "whiteboard-projects",
      partialize: (state) => ({
        // Only persist the current project ID, not the full project data
        currentProjectId: state.currentProject?.id,
      }),
    }
  )
);
