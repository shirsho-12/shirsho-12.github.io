import { Heart } from "lucide-react";
import MarkdownRenderer from "@/components/MarkdownRenderer";

interface ActivitiesSectionProps {
  content: string;
}

const ActivitiesSection = ({ content }: ActivitiesSectionProps) => {
  return (
    <section>
      <div className="flex items-center mb-8">
        <Heart className="mr-2 text-navy" size={24} />
        <h2 className="text-2xl font-bold text-navy">Activities & Interests</h2>
      </div>
      <div className="prose max-w-none">
        <MarkdownRenderer content={content} />
      </div>
    </section>
  );
};

export default ActivitiesSection;
