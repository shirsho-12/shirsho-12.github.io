import { GraduationCap } from "lucide-react";
import MarkdownRenderer from "@/components/MarkdownRenderer";

interface EducationSectionProps {
  content: string;
}

const EducationSection = ({ content }: EducationSectionProps) => {
  // Extract content for rendering modules in two columns
  const processContent = (markdownContent: string) => {
    // Split content into sections based on the "## Education" heading
    const sections = markdownContent.split(/##\s+Education/);
    if (sections.length < 2) return markdownContent;

    const beforeHeading = sections[0];
    let afterHeading = sections[1];

    // Look for "Relevant Modules:" and split the list into two columns
    const modulePattern = /\*\*Relevant Modules:\*\*\s*\n((?:-\s+.*\n)+)/g;
    afterHeading = afterHeading.replace(modulePattern, (match, modulesList) => {
      const modules = modulesList
        .trim()
        .split("\n")
        .map((m) => m.trim());
      const midpoint = Math.ceil(modules.length / 2);

      const leftColumnModules = modules.slice(0, midpoint);
      const rightColumnModules = modules.slice(midpoint);

      return `**Relevant Modules:**\n\n<div class="grid grid-cols-1 md:grid-cols-2 gap-4">\n<div>\n${leftColumnModules.join(
        "\n"
      )}\n</div>\n<div>\n${rightColumnModules.join("\n")}\n</div>\n</div>\n`;
    });

    // Identify and move TA-related modules
    const taPattern =
      /\*\*Teaching Assistant\*\*\s*\n((?:-\s+IT5005.*\n)?(?:-\s+DBA5101.*\n)?)/g;
    afterHeading = afterHeading.replace(
      /(\*\*Relevant Modules:\*\*.*?)(\n\n)/s,
      (match, moduleHeading, endBreaks) => {
        return `${moduleHeading}${endBreaks}\n**Teaching Assistant**\n- IT5005 Artificial Intelligence\n- DBA5101 Analytics in Managerial Economics\n\n`;
      }
    );

    // Remove the TA courses from the Relevant Modules
    afterHeading = afterHeading.replace(
      /- IT5005 Artificial Intelligence\n/g,
      ""
    );
    afterHeading = afterHeading.replace(
      /- DBA5101 Analytics in Managerial Economics\n/g,
      ""
    );

    return `## Education${afterHeading}`;
  };

  const processedContent = processContent(content);

  return (
    <section className="mb-16">
      <div className="flex items-center mb-8">
        <GraduationCap className="mr-2 text-navy" size={24} />
        <h2 className="text-2xl font-bold text-navy">Education</h2>
      </div>
      <div className="prose max-w-none">
        <MarkdownRenderer content={processedContent} />
      </div>
    </section>
  );
};

export default EducationSection;
