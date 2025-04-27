import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ProjectCard from "@/components/ProjectCard";
import { useState } from "react";
import { useProjects } from "@/utils/projectUtils";
import ProjectDialog from "@/components/ProjectDialog";
import { Project } from "@/data/projects";

const FeaturedProjects = () => {
  const { projects } = useProjects();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const featuredProjects = projects
    .filter((project) => project.featured === true)
    .slice(0, 3);

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
    setDialogOpen(true);
  };

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <h2 className="section-heading mb-0">Featured Projects</h2>
          <Button asChild variant="outline">
            <Link to="/projects">View All Projects</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              title={project.title}
              description={project.description}
              tags={project.tags}
              image={project.image}
              githubUrl={project.githubUrl}
              liveUrl={project.liveUrl}
              onSelect={() => handleProjectSelect(project)}
            />
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectDialog
          project={selectedProject}
          open={dialogOpen}
          onOpenChange={setDialogOpen}
        />
      )}
    </section>
  );
};

export default FeaturedProjects;
