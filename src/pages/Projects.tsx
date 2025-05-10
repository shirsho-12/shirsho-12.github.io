import { useState } from "react";
import Layout from "@/components/Layout";
import ProjectCard from "@/components/ProjectCard";
import ProjectDialog from "@/components/ProjectDialog";
import { Project } from "@/data/projects";
import { useProjects } from "@/utils/projectUtils";

const Projects = () => {
  const { projects, loading, error } = useProjects();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
    setDialogOpen(true);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-navy mb-4">Projects</h1>
          <p className="text-foreground dark:text-gray-300 max-w-3xl mx-auto text-lg">
            Here are some of the projects I've worked on, spanning various
            technologies and domains. Each project represents a unique challenge
            and learning experience.
          </p>
        </div>

        {loading && (
          <div className="text-center py-8">
            <p>Loading projects...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-8 text-red-500">
            <p>Error loading projects: {error.message}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                title={project.title}
                description={project.description}
                tags={project.tags}
                image={project.image}
                githubUrl={project.githubUrl}
                liveUrl={project.liveUrl}
                youtubeUrl={project.youtubeUrl}
                paperUrl={project.paperUrl}
                onSelect={() => handleProjectSelect(project)}
              />
            ))}
          </div>
        )}
      </div>

      {selectedProject && (
        <ProjectDialog
          project={selectedProject}
          open={dialogOpen}
          onOpenChange={setDialogOpen}
        />
      )}
    </Layout>
  );
};

export default Projects;
