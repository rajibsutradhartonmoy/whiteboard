"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useProjects, useDeleteProject } from "@/hooks/use-projects";
import { CreateProjectDialog } from "@/components/dialogs/create-project-dialog";
import {
  Database,
  Search,
  MoreVertical,
  Trash2,
  ExternalLink,
  Clock,
  Loader2,
  FolderOpen,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDistanceToNow } from "@/lib/date-utils";
import type { Project } from "@whiteboard/types";

export default function DashboardPage() {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { projects, isLoading, error } = useProjects();
  const deleteProject = useDeleteProject();
  const router = useRouter();

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getDatabaseIcon = (type: string) => {
    const colors: Record<string, string> = {
      postgresql: "text-blue-500",
      mysql: "text-orange-500",
      sqlite: "text-green-500",
      sqlserver: "text-red-500",
      mongodb: "text-emerald-500",
    };
    return colors[type] || "text-gray-500";
  };

  return (
    <>
      <Header onCreateProject={() => setShowCreateDialog(true)} />

      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground mt-1">
            Manage your database schema designs
          </p>
        </div>

        {/* Search and filters */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive">
            {error}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !error && projects.length === 0 && (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <FolderOpen className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
              <p className="text-muted-foreground text-center mb-4">
                Create your first database schema design project
              </p>
              <Button onClick={() => setShowCreateDialog(true)}>
                Create Project
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Projects grid */}
        {!isLoading && filteredProjects.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onDelete={() => deleteProject.mutate(project.id)}
                onOpen={() => router.push(`/designer/${project.id}`)}
              />
            ))}
          </div>
        )}

        {/* No results */}
        {!isLoading &&
          searchQuery &&
          filteredProjects.length === 0 &&
          projects.length > 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No projects found matching &quot;{searchQuery}&quot;
            </div>
          )}
      </main>

      <CreateProjectDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
      />
    </>
  );
}

interface ProjectCardProps {
  project: Project;
  onDelete: () => void;
  onOpen: () => void;
}

function ProjectCard({ project, onDelete, onOpen }: ProjectCardProps) {
  const getDatabaseLabel = (type: string) => {
    const labels: Record<string, string> = {
      postgresql: "PostgreSQL",
      mysql: "MySQL",
      sqlite: "SQLite",
      sqlserver: "SQL Server",
      mongodb: "MongoDB",
      mariadb: "MariaDB",
      oracle: "Oracle",
    };
    return labels[type] || type;
  };

  return (
    <Card className="group hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Database className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">{project.name}</CardTitle>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onOpen}>
                <ExternalLink className="mr-2 h-4 w-4" />
                Open
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={onDelete}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {project.description && (
          <CardDescription className="line-clamp-2">
            {project.description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium">
            {getDatabaseLabel(project.databaseType)}
          </span>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>Updated {formatDistanceToNow(project.updatedAt)}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
