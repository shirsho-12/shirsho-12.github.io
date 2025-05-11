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
        <span className="text-sm text-muted-foreground">{level}/5</span>
      </div>
      <Slider
        value={[level]}
        max={5}
        min={0}
        step={1}
        disabled
        className="w-full"
      />
    </div>
  );
};

const SkillsSection = ({ content }: SkillsSectionProps) => {
  const languagesMatch = content.match(
    /\|\s*Language\s*\|\s*Proficiency\s*\|([\s\S]*?)(?=\n\n|$)/
  );
  const languagesText = languagesMatch ? languagesMatch[1] : "";

  const languages: Language[] = languagesText
    .split("\n")
    .filter((line) => line.includes("|"))
    .map((line) => {
      const [_, name, level] = line.split("|").map((s) => s.trim());
      if (!name || !level) return null;
      return {
        name,
        level: parseInt(level),
      };
    })
    .filter((lang): lang is Language => lang !== null);

  const technicalContent = content.replace(/### Languages[\s\S]*$/, "");

  return (
    <section className="mb-16">
      <div className="flex items-center mb-8">
        <Code className="mr-2 text-primary" size={24} />
        <h2 className="text-2xl font-bold text-primary">Skills</h2>
      </div>
      <div className="prose max-w-none mb-8">
        <MarkdownRenderer content={technicalContent} />
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-6">Languages</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
