
import { useState } from "react";
import Layout from "@/components/Layout";
import { useProjects } from "@/utils/projectUtils";
import { 
  Briefcase, 
  GraduationCap, 
  Code, 
  Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/data/projects";
import ProjectDialog from "@/components/ProjectDialog";

const CV = () => {
  const { projects } = useProjects();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
    setDialogOpen(true);
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <header className="mb-16 text-center">
          <h1 className="text-4xl font-bold mb-4 text-navy">Shirshajit Sen Gupta</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            AI Researcher & Software Engineer
          </p>
          <div className="flex justify-center space-x-4">
            <Button variant="outline" className="flex items-center gap-2">
              <a href="/assets/resume.pdf" target="_blank" rel="noopener noreferrer">
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
          
          <div className="space-y-8">
            <div className="relative pl-8 border-l-2 border-gray-200 dark:border-gray-700">
              <div className="absolute w-4 h-4 bg-navy rounded-full -left-[9px] top-1"></div>
              <div>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-lg font-semibold">Senior AI Researcher</h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">2022 - Present</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-1">Google AI Research</p>
                <p className="text-gray-600 dark:text-gray-300">
                  Led research on large language models and their applications in knowledge representation.
                  Published 3 papers in top-tier conferences and collaborated on an open-source model release.
                </p>
              </div>
            </div>
            
            <div className="relative pl-8 border-l-2 border-gray-200 dark:border-gray-700">
              <div className="absolute w-4 h-4 bg-navy rounded-full -left-[9px] top-1"></div>
              <div>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-lg font-semibold">Machine Learning Engineer</h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">2020 - 2022</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-1">DeepMind Technologies</p>
                <p className="text-gray-600 dark:text-gray-300">
                  Developed reinforcement learning algorithms for robotics applications.
                  Improved sample efficiency by 35% and reduced training time for complex tasks.
                </p>
              </div>
            </div>
            
            <div className="relative pl-8 border-l-2 border-gray-200 dark:border-gray-700">
              <div className="absolute w-4 h-4 bg-navy rounded-full -left-[9px] top-1"></div>
              <div>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-lg font-semibold">Software Engineer</h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">2018 - 2020</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-1">Microsoft Research</p>
                <p className="text-gray-600 dark:text-gray-300">
                  Built data processing pipelines and visualization tools for large-scale scientific datasets.
                  Collaborated with researchers to implement algorithms for efficient data analysis.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Education */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <GraduationCap className="mr-2 text-navy" size={24} />
            <h2 className="text-2xl font-bold text-navy">Education</h2>
          </div>
          
          <div className="space-y-8">
            <div className="relative pl-8 border-l-2 border-gray-200 dark:border-gray-700">
              <div className="absolute w-4 h-4 bg-navy rounded-full -left-[9px] top-1"></div>
              <div>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-lg font-semibold">Ph.D. in Computer Science</h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">2014 - 2018</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-1">Stanford University</p>
                <p className="text-gray-600 dark:text-gray-300">
                  Thesis: "Deep Reinforcement Learning for Complex Decision Making"
                  <br />
                  Advisor: Dr. Jane Smith
                </p>
              </div>
            </div>
            
            <div className="relative pl-8 border-l-2 border-gray-200 dark:border-gray-700">
              <div className="absolute w-4 h-4 bg-navy rounded-full -left-[9px] top-1"></div>
              <div>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-lg font-semibold">M.S. in Computer Science</h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">2012 - 2014</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-1">Massachusetts Institute of Technology</p>
                <p className="text-gray-600 dark:text-gray-300">
                  Specialization in Machine Learning and Artificial Intelligence
                  <br />
                  GPA: 3.92/4.0
                </p>
              </div>
            </div>
            
            <div className="relative pl-8 border-l-2 border-gray-200 dark:border-gray-700">
              <div className="absolute w-4 h-4 bg-navy rounded-full -left-[9px] top-1"></div>
              <div>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-lg font-semibold">B.Tech in Computer Science and Engineering</h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">2008 - 2012</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-1">Indian Institute of Technology, Kharagpur</p>
                <p className="text-gray-600 dark:text-gray-300">
                  Graduated with Honors, First Class
                  <br />
                  CGPA: 9.45/10
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <Code className="mr-2 text-navy" size={24} />
            <h2 className="text-2xl font-bold text-navy">Notable Projects</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.slice(0, 4).map(project => (
              <div 
                key={project.id} 
                className="border dark:border-gray-700 rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleProjectSelect(project)}
              >
                <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.slice(0, 3).map(tag => (
                    <Badge key={tag} variant="secondary" className="bg-gray-100 text-navy hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200">
                      {tag}
                    </Badge>
                  ))}
                  {project.tags.length > 3 && (
                    <Badge variant="secondary" className="bg-gray-100 text-navy hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200">
                      +{project.tags.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <Code className="mr-2 text-navy" size={24} />
            <h2 className="text-2xl font-bold text-navy">Skills</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Programming Languages</h3>
              <div className="flex flex-wrap gap-2">
                {["Python", "TypeScript", "JavaScript", "C++", "Java", "SQL"].map(skill => (
                  <Badge key={skill} className="bg-navy text-white py-1 px-3">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Frameworks & Libraries</h3>
              <div className="flex flex-wrap gap-2">
                {["TensorFlow", "PyTorch", "React", "Node.js", "Express", "Django", "FastAPI"].map(skill => (
                  <Badge key={skill} className="bg-teal text-white py-1 px-3">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">AI & Machine Learning</h3>
              <div className="flex flex-wrap gap-2">
                {["Deep Learning", "Reinforcement Learning", "NLP", "Computer Vision", "Time Series Analysis", "Generative AI", "Large Language Models"].map(skill => (
                  <Badge key={skill} className="bg-navy text-white py-1 px-3">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Tools & Platforms</h3>
              <div className="flex flex-wrap gap-2">
                {["Git", "Docker", "Kubernetes", "AWS", "GCP", "Azure", "CI/CD", "Linux"].map(skill => (
                  <Badge key={skill} className="bg-teal text-white py-1 px-3">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Hobbies & Interests */}
        <section>
          <div className="flex items-center mb-8">
            <Heart className="mr-2 text-navy" size={24} />
            <h2 className="text-2xl font-bold text-navy">Hobbies & Interests</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Photography</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Landscape and street photography. Published in local exhibitions.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Chess</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Rated 1850 ELO. Participate in local tournaments.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Mountain Hiking</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Completed treks in the Himalayas and the Alps.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Reading</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Science fiction, philosophy, and popular science.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Playing Guitar</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Self-taught guitarist with a fondness for blues and jazz.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Open Source</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Contributor to several open-source AI and web development projects.
              </p>
            </div>
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
