import { useEffect, useState } from "react";

interface Education {
  institution: string;
  degree: string;
  location: string;
  duration: string;
  focus?: string;
  modules?: string[];
}

interface Experience {
  company: string;
  location: string;
  position: string;
  duration: string;
  responsibilities: string[];
}

interface Skills {
  technical: string[];
  languages: Record<string, number>;
}

interface CCA {
  activities: {
    organization: string;
    position: string;
    duration: string;
    responsibilities: string[];
  }[];
  interests: string[];
}

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

export function useCVContent() {
  const [education, setEducation] = useState<string>("");
  const [experience, setExperience] = useState<string>("");
  const [skills, setSkills] = useState<string>("");
  const [cca, setCCA] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchContent() {
      try {
        setLoading(true);
        const [educationMd, experienceMd, skillsMd, ccaMd] = await Promise.all([
          import("../assets/others/education.md?raw"),
          import("../assets/others/experience.md?raw"),
          import("../assets/others/skills.md?raw"),
          import("../assets/others/cca.md?raw"),
        ]);

        setEducation(educationMd);
        setExperience(experienceMd);
        setSkills(skillsMd);
        setCCA(ccaMd);
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

  return { education, experience, skills, cca, loading, error };
}
