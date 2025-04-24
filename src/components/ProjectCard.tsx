
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GithubIcon, Link as LinkIcon } from "lucide-react";
import ProjectDialog from "./ProjectDialog";
import type { Project } from "@/data/projects";

const ProjectCard = (project: Project) => {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <Card 
        className="overflow-hidden card-hover cursor-pointer" 
        onClick={() => setShowDialog(true)}
      >
        {project.image && (
          <div className="h-48 overflow-hidden">
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
            />
          </div>
        )}
        
        <CardHeader>
          <CardTitle className="text-xl">{project.title}</CardTitle>
          <div className="flex flex-wrap gap-2 mt-2">
            {project.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-gray-100 text-navy hover:bg-gray-200">
                {tag}
              </Badge>
            ))}
          </div>
        </CardHeader>
        
        <CardContent>
          <CardDescription className="text-gray-600">
            {project.description.length > 100
              ? project.description.slice(0, 100) + "..."
              : project.description}
          </CardDescription>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          {project.githubUrl && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={(e) => {
                e.stopPropagation();
                window.open(project.githubUrl, '_blank');
              }}
              className="flex items-center gap-2"
            >
              <GithubIcon className="h-4 w-4" />
              Code
            </Button>
          )}
          
          {project.liveUrl && (
            <Button 
              size="sm" 
              className="bg-navy hover:bg-navy/90"
              onClick={(e) => {
                e.stopPropagation();
                window.open(project.liveUrl, '_blank');
              }}
            >
              <LinkIcon className="h-4 w-4 mr-2" />
              Live Demo
            </Button>
          )}
        </CardFooter>
      </Card>

      <ProjectDialog 
        project={project}
        open={showDialog}
        onOpenChange={setShowDialog}
      />
    </>
  );
};

export default ProjectCard;
