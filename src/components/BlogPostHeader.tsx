
import { Badge } from "@/components/ui/badge";

interface BlogPostHeaderProps {
  title: string;
  subtitle?: string;
  date: string;
  tags: string[];
}

const BlogPostHeader = ({ title, subtitle, date, tags }: BlogPostHeaderProps) => {
  return (
    <div className="mb-6">
      <h1 className="text-3xl md:text-4xl font-bold text-navy mb-4">{title}</h1>
      {subtitle && (
        <h2 className="text-xl md:text-2xl text-gray-600 mb-4">{subtitle}</h2>
      )}
      <div className="flex flex-wrap items-center gap-4 text-gray-600">
        <span>{date}</span>
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <Badge key={tag} variant="secondary" className="bg-gray-100 text-navy">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPostHeader;
