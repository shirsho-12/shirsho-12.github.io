
import { Project, projects as staticProjects } from "@/data/projects";
import { useEffect, useState } from "react";

// This would fetch and parse markdown project files from the assets directory
export async function getMarkdownProjects(): Promise<Project[]> {
  // In a real implementation, this would dynamically import markdown files
  // For now, we'll return an empty array as a placeholder
  return [];
}

// This hook combines projects from both static data and markdown files
export function useProjects() {
  const [allProjects, setAllProjects] = useState<Project[]>(staticProjects);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        const mdProjects = await getMarkdownProjects();
        // Combine static projects with markdown projects
        setAllProjects([...staticProjects, ...mdProjects]);
      } catch (err) {
        console.error("Error loading markdown projects:", err);
        setError(err instanceof Error ? err : new Error("Unknown error loading projects"));
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  return { projects: allProjects, loading, error };
}
