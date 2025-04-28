import { Project } from "@/data/projects";
import { useEffect, useState } from "react";

// This would fetch and parse markdown project files from the assets directory
export async function getMarkdownProjects(): Promise<Project[]> {
  try {
    // Get the list of all markdown files in the projects directory
    const projectModules = import.meta.glob("../assets/projects/*.md", {
      as: "raw",
    });
    const loadedProjects: Project[] = [];

    for (const path in projectModules) {
      try {
        const content = await projectModules[path]();
        const filename = path.split("/").pop() || "";

        // Split content to separate frontmatter from markdown
        const parts = content.split("---");
        if (parts.length < 3) {
          console.error(`Invalid markdown format in ${filename}`);
          continue;
        }

        // Extract frontmatter
        const frontmatter = parts[1];
        // Join the rest as content (in case there are more --- in the content)
        const markdown = parts.slice(2).join("---");

        // Parse frontmatter
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const meta: Record<string, any> = {};
        frontmatter.split("\n").forEach((line: string) => {
          if (!line.trim()) return;

          const colonIndex = line.indexOf(":");
          if (colonIndex === -1) return;

          const key = line.slice(0, colonIndex).trim();
          let value = line.slice(colonIndex + 1).trim();

          // Handle tags which are in [tag1, tag2] format
          if (key === "tags") {
            const match = value.match(/\[(.*)\]/);
            if (match && match[1]) {
              value = match[1];
            }
            meta[key] = value
              .split(",")
              .map((tag: string) => tag.trim().replace(/^"|"$/g, ""));
          } else if (key == "featured") {
            // convert string to boolean
            meta[key] = value === "true" ? true : false;
          } else {
            meta[key] = value;
          }
        });

        loadedProjects.push({
          id: meta.id || filename.replace(".md", ""),
          title: meta.title || "",
          description: meta.description || "",
          tags: meta.tags || [],
          image: meta.image,
          githubUrl: meta.githubUrl,
          liveUrl: meta.liveUrl,
          content: markdown.trim(),
          featured: meta.featured || false,
        });
      } catch (error) {
        console.error(`Error loading project ${path}:`, error);
      }
    }

    return loadedProjects;
  } catch (error) {
    console.error("Error loading markdown projects:", error);
    return [];
  }
}

// This hook combines projects from both static data and markdown files
export function useProjects() {
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        const mdProjects = await getMarkdownProjects();
        // Combine static projects with markdown projects
        setAllProjects([...mdProjects]);
      } catch (err) {
        console.error("Error loading markdown projects:", err);
        setError(
          err instanceof Error
            ? err
            : new Error("Unknown error loading projects")
        );
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  return { projects: allProjects, loading, error };
}
