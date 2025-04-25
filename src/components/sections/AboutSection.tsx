
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const AboutSection = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-heading">About Me</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-lg">
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
                  <p className="text-gray-600 dark:text-gray-300">
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
                    <p className="text-gray-600 dark:text-gray-300">
                      Python, Dart, Java, C++, SQL, JavaScript, Bash
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">Technologies</p>
                    <p className="text-gray-600 dark:text-gray-300">
                      PyTorch, Flutter, Next.js, Docker, Git
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">Other Skills</p>
                    <p className="text-gray-600 dark:text-gray-300">
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
  );
};

export default AboutSection;
