import { Briefcase } from "lucide-react";
import MarkdownRenderer from "@/components/MarkdownRenderer";

interface ExperienceSectionProps {
  content: string;
}

const ExperienceSection = ({ content }: ExperienceSectionProps) => {
  // Process content to add end dates and organize by date
  const processContent = (markdownContent: string) => {
    // Parse experience entries to extract company, location, position, duration
    const experienceEntries = [];
    const regex =
      /## ([^#\n]+)\n\n_([^_]+)_\s*\n\*\*([^*]+)\*\*\s*\n_([^_]+)_/g;
    let match;

    while ((match = regex.exec(markdownContent)) !== null) {
      const company = match[1].trim();
      const location = match[2].trim();
      const position = match[3].trim();
      const duration = match[4].trim();

      // Extract start and end dates from duration (e.g., "Feb 2020 - Jan 2021")
      const [startDate, endDate] = duration.split("-").map((d) => d.trim());

      // Get the matching content block
      const startIndex = match.index;
      const nextMatch = regex.exec(markdownContent);
      regex.lastIndex = match.index; // Reset the regex to the current match

      const endIndex = nextMatch ? nextMatch.index : markdownContent.length;
      const contentBlock = markdownContent.substring(startIndex, endIndex);

      experienceEntries.push({
        company,
        location,
        position,
        startDate,
        endDate: endDate || "Present",
        contentBlock,
      });
    }

    // Sort entries by end date (most recent first)
    experienceEntries.sort((a, b) => {
      // Extract year from end date
      const getYear = (date) => {
        const yearMatch = date.match(/\d{4}/);
        return yearMatch ? parseInt(yearMatch[0]) : 0;
      };

      const yearA = getYear(a.endDate);
      const yearB = getYear(b.endDate);

      return yearB - yearA;
    });

    // Reconstruct the markdown with sorted entries
    return experienceEntries.map((entry) => entry.contentBlock).join("\n\n");
  };

  const processedContent = processContent(content);

  return (
    <section className="mb-16">
      <div className="flex items-center mb-8">
        <Briefcase className="mr-2 text-navy" size={24} />
        <h2 className="text-2xl font-bold text-navy">Work Experience</h2>
      </div>
      <div className="relative">
        <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-200 dark:bg-gray-700"></div>
        <div className="space-y-12 relative">
          <div className="prose max-w-none pl-12">
            <MarkdownRenderer content={processedContent} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
