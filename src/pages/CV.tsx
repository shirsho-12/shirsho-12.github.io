import Layout from "@/components/Layout";
import { useProjects } from "@/utils/projectUtils";
import { useCVContent } from "@/utils/cvUtils";
import ProjectDialog from "@/components/ProjectDialog";
import { Project } from "@/data/projects";
import { useState } from "react";
import CVHeader from "@/components/cv/CVHeader";
import EducationSection from "@/components/cv/EducationSection";
import ExperienceSection from "@/components/cv/ExperienceSection";
import SkillsSection from "@/components/cv/SkillsSection";
import ActivitiesSection from "@/components/cv/ActivitiesSection";

const CV = () => {
  const { education, experience, skills, cca, loading, error } = useCVContent();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  if (loading) {
    return (
      <Layout>
        <div className="max-w-5xl mx-auto px-4 py-16">
          <p>Loading CV content...</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="max-w-5xl mx-auto px-4 py-16">
          <p className="text-red-500">
            Error loading CV content: {error.message}
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <CVHeader />
        <ExperienceSection content={experience} />
        <EducationSection content={education} />
        <SkillsSection content={skills} />
        <ActivitiesSection content={cca} />
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

export default CV;
