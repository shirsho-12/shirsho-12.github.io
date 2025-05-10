import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { GithubIcon, LinkIcon } from "lucide-react";
import { Project } from "@/data/projects";

interface ProjectCardProps extends Project {
  onSelect?: (project: Project) => void;
}

const ProjectCard = ({
  id,
  title,
  description,
  tags,
  image,
  githubUrl,
  liveUrl,
  onSelect,
}: ProjectCardProps) => {
  return (
    <Card
      className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer dark:bg-card flex flex-col h-full"
      onClick={() =>
        onSelect?.({ id, title, description, tags, image, githubUrl, liveUrl })
      }
    >
      <CardContent className="p-6 flex-grow">
        <h3 className="text-xl font-semibold mb-2 text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center bg-secondary p-6 mt-auto">
        <div className="flex gap-2">
          {githubUrl && (
            <Button asChild variant="ghost" size="sm">
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1"
              >
                <GithubIcon className="h-4 w-4" />
                GitHub
              </a>
            </Button>
          )}
          {liveUrl && (
            <Button asChild variant="ghost" size="sm">
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1"
              >
                <LinkIcon className="h-4 w-4" />
                Live Demo
              </a>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
