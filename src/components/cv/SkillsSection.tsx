import { Code } from "lucide-react";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { Slider } from "@/components/ui/slider";

interface Language {
  name: string;
  level: number;
}

interface SkillsSectionProps {
  content: string;
}

const LanguageSlider = ({
  language,
  level,
}: {
  language: string;
  level: number;
}) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium">{language}</span>
        <span className="text-sm text-gray-500">{level}/5</span>
      </div>
      <Slider
        value={[level]}
        max={5}
        min={1}
        step={1}
        disabled
        className="w-full"
      />
    </div>
  );
};

const SkillsSection = ({ content }: SkillsSectionProps) => {
  // Extract languages from content
  const languagesMatch = content.match(/### Languages\n\n([\s\S]*?)(?=\n\n|$)/);
  const languagesText = languagesMatch ? languagesMatch[1] : "";

  const languages: Language[] = languagesText
    .split("\n")
    .filter((line) => line.includes(":"))
    .map((line) => {
      const [name, level] = line
        .replace("-", "")
        .trim()
        .split(":")
        .map((s) => s.trim());
      return { name, level: parseInt(level) };
    });

  // Remove the languages section from the content
  const technicalContent = content.replace(/### Languages[\s\S]*$/, "");

  return (
    <section className="mb-16">
      <div className="flex items-center mb-8">
        <Code className="mr-2 text-navy" size={24} />
        <h2 className="text-2xl font-bold text-navy">Skills</h2>
      </div>
      <div className="prose max-w-none mb-8">
        <MarkdownRenderer content={technicalContent} />
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-6">Languages</h3>
        <div className="max-w-md">
          {languages.map((lang) => (
            <LanguageSlider
              key={lang.name}
              language={lang.name}
              level={lang.level}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
