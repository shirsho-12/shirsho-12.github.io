import Layout from "@/components/Layout";
import { useProjects } from "@/utils/projectUtils";
import { useCVContent } from "@/utils/cvUtils";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import ProjectDialog from "@/components/ProjectDialog";
import { Project } from "@/data/projects";
import { useState } from "react";
import { Briefcase, GraduationCap, Code, Heart } from "lucide-react";

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
        <header className="mb-16 text-center">
          <h1 className="text-4xl font-bold mb-4 text-navy">
            Shirshajit Sen Gupta
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            AI Researcher & Software Engineer
          </p>
          <div className="flex justify-center space-x-4">
            <Button variant="outline" className="flex items-center gap-2">
              <a
                href="/assets/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download Resume
              </a>
            </Button>
            <Button asChild className="bg-navy hover:bg-navy/90">
              <a href="mailto:contact@shirshajit.com">Contact Me</a>
            </Button>
          </div>
        </header>

        {/* Work Experience */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <Briefcase className="mr-2 text-navy" size={24} />
            <h2 className="text-2xl font-bold text-navy">Work Experience</h2>
          </div>
          <div className="prose max-w-none">
            <MarkdownRenderer content={experience} />
          </div>
        </section>

        {/* Education */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <GraduationCap className="mr-2 text-navy" size={24} />
            <h2 className="text-2xl font-bold text-navy">Education</h2>
          </div>
          <div className="prose max-w-none">
            <MarkdownRenderer content={education} />
          </div>
        </section>

        {/* Skills */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <Code className="mr-2 text-navy" size={24} />
            <h2 className="text-2xl font-bold text-navy">Skills</h2>
          </div>
          <div className="prose max-w-none">
            <MarkdownRenderer content={skills} />
          </div>
        </section>

        {/* Activities & Interests */}
        <section>
          <div className="flex items-center mb-8">
            <Heart className="mr-2 text-navy" size={24} />
            <h2 className="text-2xl font-bold text-navy">
              Activities & Interests
            </h2>
          </div>
          <div className="prose max-w-none">
            <MarkdownRenderer content={cca} />
          </div>
        </section>
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
