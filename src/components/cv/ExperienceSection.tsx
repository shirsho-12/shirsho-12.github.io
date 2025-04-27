import { Briefcase } from "lucide-react";
import MarkdownRenderer from "@/components/MarkdownRenderer";

interface ExperienceSectionProps {
  content: string;
}

const ExperienceSection = ({ content }: ExperienceSectionProps) => {
  return (
    <section className="mb-16">
      <div className="flex items-center mb-8">
        <Briefcase className="mr-2 text-navy" size={24} />
        <h2 className="text-2xl font-bold text-navy">Work Experience</h2>
      </div>
      <div className="prose max-w-none">
        <MarkdownRenderer content={content} />
      </div>
    </section>
  );
};

export default ExperienceSection;
