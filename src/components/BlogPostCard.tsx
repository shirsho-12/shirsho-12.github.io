import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface BlogPostCardProps {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  coverImage?: string;
}

const BlogPostCard = ({
  id,
  title,
  date,
  excerpt,
  tags,
  coverImage,
}: BlogPostCardProps) => {
  return (
    <Card className="overflow-hidden card-hover">
      {coverImage && (
        <div className="h-48 overflow-hidden">
          <img
            src={coverImage}
            alt={title}
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
          />
        </div>
      )}

      <CardHeader>
        <CardTitle>
          <Link
            to={`/blog/${id}`}
            className="hover:text-teal transition-colors"
          >
            {title}
          </Link>
        </CardTitle>
        <div className="caption">{date}</div>
      </CardHeader>

      <CardContent>
        <CardDescription className="text-muted-foreground">
          {excerpt}
        </CardDescription>
        <div className="flex flex-wrap gap-2 mt-4">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="bg-gray-100 text-primary hover:bg-gray-200"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter>
        <Link
          to={`/blog/${id}`}
          className="text-teal hover:text-teal/80 font-medium transition-colors"
        >
          Read more →
        </Link>
      </CardFooter>
    </Card>
  );
};

export default BlogPostCard;
