"use client";

import { use } from "react";
import { useProject } from "@/hooks/use-projects";
import { SchemaCanvas } from "@/components/canvas/schema-canvas";
import { DesignerHeader } from "@/components/canvas/designer-header";
import { Loader2 } from "lucide-react";

interface DesignerPageProps {
  params: Promise<{ "project-id": string }>;
}

export default function DesignerPage({ params }: DesignerPageProps) {
  const resolvedParams = use(params);
  const projectId = resolvedParams["project-id"];
  const { data: project, isLoading, error } = useProject(projectId);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Project not found</h2>
          <p className="text-muted-foreground">
            {error ? (error as Error).message : "Unable to load project"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <DesignerHeader project={project} />
      <div className="flex-1 relative">
        <SchemaCanvas projectId={projectId} />
      </div>
    </div>
  );
}
