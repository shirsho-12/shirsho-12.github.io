import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GithubIcon, LinkIcon, YoutubeIcon, FileText } from "lucide-react";
import type { Project } from "@/data/projects";

interface ProjectDialogProps {
  project: Project;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProjectDialog = ({ project, open, onOpenChange }: ProjectDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{project.title}</DialogTitle>
        </DialogHeader>

        {project.image && (
          <div className="relative h-64 overflow-hidden rounded-lg">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="flex flex-wrap gap-2 my-4">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="tag">
              {tag}
            </Badge>
          ))}
        </div>

        <DialogDescription className="text-base text-muted-foreground mt-2">
          {project.description}
        </DialogDescription>

        <div className="flex flex-wrap gap-4 mt-6">
          {project.githubUrl && (
            <Button variant="outline" asChild>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <GithubIcon className="h-4 w-4" />
                View Source
              </a>
            </Button>
          )}

          {project.liveUrl && (
            <Button asChild>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <LinkIcon className="h-4 w-4" />
                Live Demo
              </a>
            </Button>
          )}

          {project.youtubeUrl && (
            <Button variant="outline" asChild>
              <a
                href={project.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <YoutubeIcon className="h-4 w-4" />
                YouTube
              </a>
            </Button>
          )}

          {project.paperUrl && (
            <Button variant="outline" asChild>
              <a
                href={project.paperUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                Read Paper
              </a>
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDialog;
