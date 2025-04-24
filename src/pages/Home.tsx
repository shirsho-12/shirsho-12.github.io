import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import { blogPosts } from "@/data/blogPosts";
import BlogPostCard from "@/components/BlogPostCard";

const Home = () => {
  // Show only 3 featured projects and blog posts on the home page
  const featuredProjects = projects.slice(0, 3);
  const recentBlogPosts = blogPosts.slice(0, 3);

  return (
    <Layout>
      <Hero />

      {/* About Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-heading">About Me</h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Hi, I'm Shirshajit, a Computer Science and Mathematics graduate
              from NUS with a deep interest in graph neural networks, natural
              language processing, and reinforcement learning. Whether it's
              working on AI-powered applications, exploring new research ideas,
              or creating tools that solve real-world problems, I'm always
              excited by interesting, thought-provoking questions. Thanks for
              stopping by, let's get in touch!
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
                      <p className="font-medium">B.Comp. in Computer Science</p>
                      <p className="text-sm text-gray-500">
                        National University of Singapore, 2021-2025
                      </p>
                    </div>
                    <p className="text-gray-600">
                      Focus areas: Artificial Intelligence, and Database
                      Systems.
                    </p>

                    <div>
                      <p className="font-medium">
                        B.Sc. in Computer Science and Biology
                      </p>
                      <p className="text-sm text-gray-500">
                        McGill University, 2020-2021
                      </p>
                    </div>
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
                      <p className="text-gray-600">
                        Python, Dart, Java, C++, SQL, JavaScript, Bash
                      </p>
                    </div>
                    <div>
                      <p className="font-medium">Technologies</p>
                      <p className="text-gray-600">
                        PyTorch, Flutter, Next.js, Docker, Git
                      </p>
                    </div>
                    <div>
                      <p className="font-medium">Other Skills</p>
                      <p className="text-gray-600">
                        Application Development, Systems Design, Data Analysis,
                        Machine Learning
                      </p>
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
                      <p className="font-medium">Lead Software Developer</p>
                      <p className="text-sm text-gray-500">
                        Source Academy, 2025-Present
                      </p>
                    </div>
                    <div>
                      <p className="font-medium">Data Analyst Intern</p>
                      <p className="text-sm text-gray-500">
                        Procter & Gamble, Fall 2023
                      </p>
                    </div>
                    <div>
                      <p className="font-medium">
                        Junior Deep Learning Researcher
                      </p>
                      <p className="text-sm text-gray-500">Gaze, 2020-2021</p>
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
            {featuredProjects.map((project) => (
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

      {/* Recent Blog Posts Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="section-heading mb-0">Recent Blog Posts</h2>
            <Button asChild variant="outline">
              <Link to="/blog">View All Posts</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentBlogPosts.map((post) => (
              <BlogPostCard
                key={post.id}
                id={post.id}
                title={post.title}
                date={post.date}
                excerpt={post.excerpt}
                tags={post.tags}
                coverImage={post.coverImage}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-navy text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Interested in Collaborating?
          </h2>
          <p className="text-lg mb-8 text-gray-300 max-w-3xl mx-auto">
            I'm always open to discussing new projects, research opportunities,
            or potential collaborations. Feel free to reach out if you'd like to
            connect!
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-navy hover:bg-gray-100"
          >
            <Link to="/contact">Get in Touch</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
