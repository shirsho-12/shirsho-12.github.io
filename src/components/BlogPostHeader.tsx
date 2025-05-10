import { Badge } from "@/components/ui/badge";

interface BlogPostHeaderProps {
  title: string;
  subtitle?: string;
  date: string;
  tags: string[];
}

const BlogPostHeader = ({
  title,
  subtitle,
  date,
  tags,
}: BlogPostHeaderProps) => {
  return (
    <div className="mb-6">
      <h1 className="heading-1">{title}</h1>
      {subtitle && <h2 className="subtitle">{subtitle}</h2>}
      <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
        <span>{date}</span>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="bg-secondary text-secondary-foreground"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPostHeader;
