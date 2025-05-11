import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { FileText, GithubIcon, LinkIcon, YoutubeIcon } from "lucide-react";
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
  youtubeUrl,
  paperUrl,
  onSelect,
}: ProjectCardProps) => {
  return (
    <Card
      className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer flex flex-col h-full"
      onClick={() =>
        onSelect?.({
          id,
          title,
          description,
          tags,
          image,
          githubUrl,
          liveUrl,
          youtubeUrl,
          paperUrl,
        })
      }
    >
      <CardContent className="p-6 flex-grow">
        <h3 className="text-xl font-semibold mb-2 text-primary">{title}</h3>
        <p className="text-sm text-primary mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center text-primary-foreground bg-primary p-6 mt-auto">
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
                Demo
              </a>
            </Button>
          )}

          {youtubeUrl && (
            <Button asChild variant="ghost" size="sm">
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1"
              >
                <YoutubeIcon className="h-4 w-4" />
                YouTube
              </a>
            </Button>
          )}
          {paperUrl && (
            <Button asChild variant="ghost" size="sm">
              <a
                href={paperUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1"
              >
                <FileText className="h-4 w-4 " />
                Paper
              </a>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
