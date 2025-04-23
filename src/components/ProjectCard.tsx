
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GithubIcon, Link as LinkIcon } from "lucide-react";

export interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  image?: string;
  githubUrl?: string;
  liveUrl?: string;
}

const ProjectCard = ({ title, description, tags, image, githubUrl, liveUrl }: ProjectCardProps) => {
  return (
    <Card className="overflow-hidden card-hover">
      {image && (
        <div className="h-48 overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
          />
        </div>
      )}
      
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-gray-100 text-navy hover:bg-gray-200">
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>
      
      <CardContent>
        <CardDescription className="text-gray-600">{description}</CardDescription>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        {githubUrl && (
          <Button variant="outline" size="sm" asChild>
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <GithubIcon className="h-4 w-4" />
              Code
            </a>
          </Button>
        )}
        
        {liveUrl && (
          <Button size="sm" asChild className="bg-navy hover:bg-navy/90">
            <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <LinkIcon className="h-4 w-4" />
              Live Demo
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
