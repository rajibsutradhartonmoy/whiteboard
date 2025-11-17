"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { useProjectStore } from "@/stores/project-store";
import type { Project } from "@whiteboard/types";
import { toast } from "sonner";

export function useProjects() {
  const supabase = createClient();
  const queryClient = useQueryClient();
  const { setProjects, setLoading, setError } = useProjectStore();

  const {
    data: projects = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("updated_at", { ascending: false });

      if (error) throw error;

      const mappedProjects = data.map((p) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        description: p.description,
        databaseType: p.database_type,
        ownerId: p.owner_id,
        organizationId: p.organization_id,
        isPublic: p.is_public,
        settings: p.settings as Project["settings"],
        canvasState: p.canvas_state as Project["canvasState"],
        tags: p.tags,
        folderId: p.folder_id,
        archivedAt: p.archived_at ? new Date(p.archived_at) : undefined,
        createdAt: new Date(p.created_at),
        updatedAt: new Date(p.updated_at),
      })) as Project[];

      setProjects(mappedProjects);
      return mappedProjects;
    },
  });

  return {
    projects,
    isLoading,
    error: error ? (error as Error).message : null,
    refetch,
  };
}

export function useProject(projectId: string) {
  const supabase = createClient();
  const { setCurrentProject } = useProjectStore();

  return useQuery({
    queryKey: ["project", projectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", projectId)
        .single();

      if (error) throw error;

      const project: Project = {
        id: data.id,
        name: data.name,
        slug: data.slug,
        description: data.description,
        databaseType: data.database_type as Project["databaseType"],
        ownerId: data.owner_id,
        organizationId: data.organization_id,
        isPublic: data.is_public,
        settings: data.settings as Project["settings"],
        canvasState: data.canvas_state as Project["canvasState"],
        tags: data.tags,
        folderId: data.folder_id,
        archivedAt: data.archived_at ? new Date(data.archived_at) : undefined,
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at),
      };

      setCurrentProject(project);
      return project;
    },
    enabled: !!projectId,
  });
}

export function useCreateProject() {
  const supabase = createClient();
  const queryClient = useQueryClient();
  const { addProject } = useProjectStore();

  return useMutation({
    mutationFn: async (
      data: Pick<Project, "name" | "description" | "databaseType">
    ) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const slug = data.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      const { data: project, error } = await supabase
        .from("projects")
        .insert({
          name: data.name,
          slug: `${slug}-${Date.now()}`,
          description: data.description || null,
          database_type: data.databaseType,
          owner_id: user.id,
          settings: {
            defaultSchema: "public",
            namingConvention: "snake_case",
            autoSave: true,
            autoLayout: false,
            showGridLines: true,
            snapToGrid: true,
            gridSize: 20,
            theme: {
              tableHeaderColor: "#3b82f6",
              tableBodyColor: "#ffffff",
              relationshipColor: "#64748b",
              backgroundColor: "#f8fafc",
              fontFamily: "Inter",
              fontSize: 14,
            },
            diagramNotation: "crow-foot",
          },
          canvas_state: {
            viewport: { x: 0, y: 0, width: 1920, height: 1080 },
            zoom: 1,
            pan: { x: 0, y: 0 },
            selectedNodeIds: [],
            selectedEdgeIds: [],
          },
          tags: [],
        })
        .select()
        .single();

      if (error) throw error;

      return {
        id: project.id,
        name: project.name,
        slug: project.slug,
        description: project.description,
        databaseType: project.database_type,
        ownerId: project.owner_id,
        organizationId: project.organization_id,
        isPublic: project.is_public,
        settings: project.settings,
        canvasState: project.canvas_state,
        tags: project.tags,
        folderId: project.folder_id,
        archivedAt: project.archived_at
          ? new Date(project.archived_at)
          : undefined,
        createdAt: new Date(project.created_at),
        updatedAt: new Date(project.updated_at),
      } as Project;
    },
    onSuccess: (project) => {
      addProject(project);
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project created successfully");
    },
    onError: (error) => {
      toast.error((error as Error).message);
    },
  });
}

export function useUpdateProject() {
  const supabase = createClient();
  const queryClient = useQueryClient();
  const { updateProject } = useProjectStore();

  return useMutation({
    mutationFn: async ({
      id,
      ...updates
    }: Partial<Project> & { id: string }) => {
      const dbUpdates: Record<string, unknown> = {};

      if (updates.name) dbUpdates.name = updates.name;
      if (updates.description !== undefined)
        dbUpdates.description = updates.description;
      if (updates.databaseType)
        dbUpdates.database_type = updates.databaseType;
      if (updates.isPublic !== undefined)
        dbUpdates.is_public = updates.isPublic;
      if (updates.settings) dbUpdates.settings = updates.settings;
      if (updates.canvasState) dbUpdates.canvas_state = updates.canvasState;
      if (updates.tags) dbUpdates.tags = updates.tags;

      dbUpdates.updated_at = new Date().toISOString();

      const { data, error } = await supabase
        .from("projects")
        .update(dbUpdates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data, variables) => {
      updateProject(variables.id, variables);
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project", variables.id] });
    },
    onError: (error) => {
      toast.error((error as Error).message);
    },
  });
}

export function useDeleteProject() {
  const supabase = createClient();
  const queryClient = useQueryClient();
  const { deleteProject } = useProjectStore();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (error) throw error;
      return id;
    },
    onSuccess: (id) => {
      deleteProject(id);
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project deleted");
    },
    onError: (error) => {
      toast.error((error as Error).message);
    },
  });
}
