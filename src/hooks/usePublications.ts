import { useState, useEffect } from "react";

interface Publication {
  id: string;
  title: string;
  authors: string;
  conference: string;
  year: number;
  pdfUrl?: string;
  doiUrl?: string;
  selected?: boolean;
}

export const usePublications = () => {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadPublications = async () => {
      try {
        // Load the BibTeX file
        const bibModule = await import(
          "../assets/_bibliography/papers.bib?raw"
        );
        const bibContent = bibModule.default;

        // Parse the BibTeX content
        const parsedPublications: Publication[] = [];
        const entries = bibContent.split("@");

        // Skip the first entry which is empty or contains the YAML frontmatter
        for (let i = 1; i < entries.length; i++) {
          const entry = entries[i].trim();
          if (!entry) continue;

          // Extract the publication type and ID
          const typeAndIdMatch = entry.match(/^(\w+)\s*{\s*([^,]+),/);
          if (!typeAndIdMatch) continue;

          const [, type, id] = typeAndIdMatch;
          if (type !== "article" && type !== "inproceedings") continue;

          // Initialize the publication object
          const publication: Publication = {
            id,
            title: "",
            authors: "",
            conference: "",
            year: 0,
          };

          // Extract the properties
          const titleMatch = entry.match(/title\s*=\s*{([^}]+)}/);
          if (titleMatch) publication.title = titleMatch[1];

          const authorMatch = entry.match(/author\s*=\s*{([^}]+)}/);
          if (authorMatch) publication.authors = authorMatch[1];

          const yearMatch = entry.match(/year\s*=\s*{(\d+)}/);
          if (yearMatch) publication.year = parseInt(yearMatch[1]);

          // Extract conference or journal
          const booktitleMatch = entry.match(/booktitle\s*=\s*{([^}]+)}/);
          const journalMatch = entry.match(/journal\s*=\s*{([^}]+)}/);
          publication.conference = booktitleMatch
            ? booktitleMatch[1]
            : journalMatch
            ? journalMatch[1]
            : "";

          // Extract other fields
          const urlMatch = entry.match(/url\s*=\s*{([^}]+)}/);
          if (urlMatch) publication.doiUrl = urlMatch[1];

          const pdfMatch = entry.match(/pdf\s*=\s*{([^}]+)}/);
          if (pdfMatch) publication.pdfUrl = pdfMatch[1];

          const selectedMatch = entry.match(/selected\s*=\s*{(true|false)}/);
          if (selectedMatch) publication.selected = selectedMatch[1] === "true";

          parsedPublications.push(publication);
        }

        // Sort by year, newest first
        parsedPublications.sort((a, b) => b.year - a.year);

        setPublications(parsedPublications);
        setLoading(false);
      } catch (err) {
        console.error("Error loading publications:", err);
        setError(
          err instanceof Error ? err : new Error("Failed to load publications")
        );
        setLoading(false);
      }
    };

    loadPublications();
  }, []);

  return {
    publications,
    loading,
    error,
  };
};
