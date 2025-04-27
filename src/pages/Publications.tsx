import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import PublicationCard from "@/components/PublicationCard";

interface Publication {
  id: string;
  title: string;
  authors: string;
  conference: string;
  year: number;
  abstract: string;
  pdfUrl?: string;
  doiUrl?: string;
  html?: string;
  preview?: string;
  selected?: boolean;
}

const Publications = () => {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPublications = async () => {
      try {
        // Load the BibTeX file
        const bibModule = await import(
          "../assets/_bibliography/papers.bib?raw"
        );
        const bibContent = bibModule.default;

        // Parse the BibTeX content
        const publications: Publication[] = [];
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
            abstract: "",
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

          const htmlMatch = entry.match(/html\s*=\s*{([^}]+)}/);
          if (htmlMatch) publication.html = htmlMatch[1];

          const pdfMatch = entry.match(/pdf\s*=\s*{([^}]+)}/);
          if (pdfMatch) publication.pdfUrl = pdfMatch[1];

          const previewMatch = entry.match(/preview\s*=\s*{([^}]+)}/);
          if (previewMatch) publication.preview = previewMatch[1];

          const selectedMatch = entry.match(/selected\s*=\s*{(true|false)}/);
          if (selectedMatch) publication.selected = selectedMatch[1] === "true";

          // Create a simple abstract
          publication.abstract = `A ${
            type === "article" ? "journal article" : "conference paper"
          } published in ${publication.conference} (${publication.year}).`;

          publications.push(publication);
        }

        // Sort by year, newest first
        publications.sort((a, b) => b.year - a.year);

        setPublications(publications);
        setLoading(false);
      } catch (error) {
        console.error("Error loading publications:", error);
        setError(
          `Failed to load publications: ${
            error instanceof Error ? error.message : "Unknown error"
          }`
        );
        setLoading(false);
      }
    };

    loadPublications();
  }, []);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-navy mb-4">Publications</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A collection of my research papers and publications in academic
            conferences and journals. My research primarily focuses on machine
            learning, blockchain technology, and software engineering.
          </p>
        </div>

        {loading && (
          <div className="text-center py-8">
            <p>Loading publications...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-8 text-red-500">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && publications.length > 0 && (
          <div className="grid grid-cols-1 gap-8">
            {publications.map((publication) => (
              <PublicationCard
                key={publication.id}
                title={publication.title}
                authors={publication.authors}
                conference={publication.conference}
                year={publication.year}
                abstract={publication.abstract}
                pdfUrl={publication.pdfUrl}
                doiUrl={publication.html || publication.doiUrl}
              />
            ))}
          </div>
        )}

        {!loading && !error && publications.length === 0 && (
          <div className="text-center py-8">
            <p>No publications found.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Publications;
