import { Briefcase, Calendar } from "lucide-react";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { ExperienceItem } from "@/utils/cvUtils";
import { Badge } from "@/components/ui/badge";

interface ExperienceSectionProps {
  experiences: ExperienceItem[];
}

const ExperienceSection = ({ experiences }: ExperienceSectionProps) => {
  // Filter featured experiences
  const featuredExperiences = experiences.filter((exp) => exp.featured);

  // Format date from DD/MM/YYYY to Month Year
  const formatDate = (dateStr: string): string => {
    if (!dateStr) return "Present";
    const [day, month, year] = dateStr.split("/").map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <section className="mb-16">
      <div className="flex items-center mb-8">
        <Briefcase className="mr-2 text-navy" size={24} />
        <h2 className="text-2xl font-bold text-navy">Work Experience</h2>
      </div>
      <div className="relative">
        <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-200 dark:bg-gray-700"></div>
        <div className="space-y-12 relative">
          {featuredExperiences.map((experience, index) => (
            <div key={experience.id} className="relative pl-12">
              {/* Timeline dot */}
              <div className="absolute left-0 top-0 w-8 h-8 bg-navy rounded-full flex items-center justify-center -ml-4 mt-1 z-10">
                <Calendar className="h-4 w-4 text-white" />
              </div>

              {/* Experience content */}
              <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex flex-col md:flex-row justify-between mb-2">
                  <h3 className="text-xl font-bold text-navy">
                    {experience.title}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {formatDate(experience.start_date)} -{" "}
                    {formatDate(experience.end_date)}
                  </span>
                </div>

                <div className="flex flex-col md:flex-row md:items-center gap-2 mb-4">
                  <h4 className="font-medium text-gray-700 dark:text-gray-300">
                    {experience.description}
                  </h4>
                  <span className="text-sm text-gray-500 md:ml-2">
                    {experience.address}
                  </span>
                </div>

                <div className="mb-4 flex flex-wrap gap-2">
                  {experience.tags.map((tag, idx) => (
                    <Badge
                      key={idx}
                      variant="outline"
                      className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="prose max-w-none dark:prose-invert">
                  <MarkdownRenderer content={experience.content} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
