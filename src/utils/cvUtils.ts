import { useEffect, useState } from "react";

export const getMarkdownContent = async (path: string): Promise<string> => {
  try {
    const response = await fetch(path);
    const text = await response.text();
    return text;
  } catch (error) {
    console.error(`Error loading markdown from ${path}:`, error);
    return "";
  }
};

export interface ExperienceItem {
  id: string;
  title: string;
  description: string;
  address: string;
  start_date: string;
  end_date: string;
  tags: string[];
  featured: boolean;
  content: string;
}

export function useCVContent() {
  const [education, setEducation] = useState<string>("");
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [skills, setSkills] = useState<string>("");
  const [cca, setCCA] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchContent() {
      try {
        setLoading(true);
        const educationModule = await import(
          "../assets/others/education.md?raw"
        );
        const skillsModule = await import("../assets/others/skills.md?raw");
        const ccaModule = await import("../assets/others/cca.md?raw");

        setEducation(educationModule.default || "");
        setSkills(skillsModule.default || "");
        setCCA(ccaModule.default || "");

        // Fetch all experience markdown files
        const experienceModules = import.meta.glob(
          "../assets/experiences/*.md",
          { as: "raw", eager: true }
        );

        const experienceItems: ExperienceItem[] = [];

        // Process each experience file
        for (const path in experienceModules) {
          const content = experienceModules[path];

          // Extract frontmatter
          const frontmatterMatch = content.match(
            /^---\s*([\s\S]*?)\s*---\s*([\s\S]*)$/
          );

          if (frontmatterMatch) {
            const [, frontmatter, markdownContent] = frontmatterMatch;

            // Parse frontmatter
            const idMatch = frontmatter.match(/id:\s*(.+)$/m);
            const titleMatch = frontmatter.match(/title:\s*(.+)$/m);
            const descriptionMatch = frontmatter.match(/description:\s*(.+)$/m);
            const addressMatch = frontmatter.match(/address:\s*(.+)$/m);
            const startDateMatch = frontmatter.match(/start_date:\s*(.+)$/m);
            const endDateMatch = frontmatter.match(/end_date:\s*(.+)$/m);
            const tagsMatch = frontmatter.match(/tags:\s*\[(.*)\]/);
            const featuredMatch = frontmatter.match(/featured:\s*(true|false)/);

            if (titleMatch) {
              const tags = tagsMatch
                ? tagsMatch[1]
                    .split(",")
                    .map((tag) => tag.trim().replace(/['"]/g, ""))
                : [];

              experienceItems.push({
                id: idMatch ? idMatch[1].trim() : "",
                title: titleMatch[1].trim(),
                description: descriptionMatch ? descriptionMatch[1].trim() : "",
                address: addressMatch ? addressMatch[1].trim() : "",
                start_date: startDateMatch ? startDateMatch[1].trim() : "",
                end_date: endDateMatch ? endDateMatch[1].trim() : "",
                tags,
                featured: featuredMatch ? featuredMatch[1] === "true" : false,
                content: markdownContent.trim(),
              });
            }
          }
        }

        // Sort experiences by end_date (most recent first)
        experienceItems.sort((a, b) => {
          // Convert DD/MM/YYYY to Date objects
          if (a.end_date.toLowerCase() === "present" || a.end_date === "")
            return -1;
          if (b.end_date.toLowerCase() === "present" || b.end_date === "")
            return 1;
          const [dayA, monthA, yearA] = a.end_date.split("/").map(Number);
          const [dayB, monthB, yearB] = b.end_date.split("/").map(Number);

          const dateA = new Date(yearA, monthA - 1, dayA);
          const dateB = new Date(yearB, monthB - 1, dayB);

          return dateB.getTime() - dateA.getTime();
        });

        setExperiences(experienceItems);
      } catch (err) {
        console.error("Error loading CV content:", err);
        setError(
          err instanceof Error ? err : new Error("Error loading CV content")
        );
      } finally {
        setLoading(false);
      }
    }

    fetchContent();
  }, []);

  return { education, experiences, skills, cca, loading, error };
}
