
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

const Home = () => {
  // Show only 3 featured projects on the home page
  const featuredProjects = projects.slice(0, 3);

  return (
    <Layout>
      <Hero />
      
      {/* About Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-heading">About Me</h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              I'm a Computer Science student passionate about building innovative software 
              and exploring cutting-edge technologies. My research interests include 
              machine learning, distributed systems, and cybersecurity.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-navy">Education</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium">B.S. in Computer Science</p>
                      <p className="text-sm text-gray-500">University Name, 2020-2024</p>
                    </div>
                    <p className="text-gray-600">
                      Focus areas: Artificial Intelligence, Data Structures, Algorithms, 
                      Operating Systems, and Database Systems.
                    </p>
                  </div>
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-navy">Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium">Programming Languages</p>
                      <p className="text-gray-600">Python, JavaScript, Java, C++, SQL</p>
                    </div>
                    <div>
                      <p className="font-medium">Technologies</p>
                      <p className="text-gray-600">React, Node.js, TensorFlow, Docker, Git</p>
                    </div>
                    <div>
                      <p className="font-medium">Other Skills</p>
                      <p className="text-gray-600">Algorithms, Data Structures, Machine Learning</p>
                    </div>
                  </div>
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-navy">Experience</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium">Research Assistant</p>
                      <p className="text-sm text-gray-500">University Research Lab, 2022-Present</p>
                    </div>
                    <div>
                      <p className="font-medium">Software Development Intern</p>
                      <p className="text-sm text-gray-500">Tech Company Inc., Summer 2023</p>
                    </div>
                    <div>
                      <p className="font-medium">Teaching Assistant</p>
                      <p className="text-sm text-gray-500">Introduction to Programming, 2021-2022</p>
                    </div>
                  </div>
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Featured Projects Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="section-heading mb-0">Featured Projects</h2>
            <Button asChild variant="outline">
              <Link to="/projects">View All Projects</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map(project => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                tags={project.tags}
                image={project.image}
                githubUrl={project.githubUrl}
                liveUrl={project.liveUrl}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-navy text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Interested in Collaborating?</h2>
          <p className="text-lg mb-8 text-gray-300 max-w-3xl mx-auto">
            I'm always open to discussing new projects, research opportunities, or potential collaborations.
            Feel free to reach out if you'd like to connect!
          </p>
          <Button asChild size="lg" className="bg-white text-navy hover:bg-gray-100">
            <Link to="/contact">Get in Touch</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
