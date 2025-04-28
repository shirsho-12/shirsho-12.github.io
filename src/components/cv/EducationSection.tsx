import { GraduationCap } from "lucide-react";
import MarkdownRenderer from "@/components/MarkdownRenderer";

interface EducationSectionProps {
  content: string;
}

const EducationSection = ({ content }: EducationSectionProps) => {
  return (
    <section className="mb-16">
      <div className="flex items-center mb-8">
        <GraduationCap className="mr-2 text-navy" size={24} />
        <h2 className="text-2xl font-bold text-navy">Education</h2>
      </div>
      <div className="prose max-w-none">
        <MarkdownRenderer content={content} />
      </div>
    </section>
  );
};

export default EducationSection;
