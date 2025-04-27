import { Code } from "lucide-react";
import MarkdownRenderer from "@/components/MarkdownRenderer";

interface SkillsSectionProps {
  content: string;
}

const SkillsSection = ({ content }: SkillsSectionProps) => {
  return (
    <section className="mb-16">
      <div className="flex items-center mb-8">
        <Code className="mr-2 text-navy" size={24} />
        <h2 className="text-2xl font-bold text-navy">Skills</h2>
      </div>
      <div className="prose max-w-none">
        <MarkdownRenderer content={content} />
      </div>
    </section>
  );
};

export default SkillsSection;
