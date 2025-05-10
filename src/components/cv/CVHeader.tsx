import { Button } from "@/components/ui/button";

const CVHeader = () => {
  return (
    <header className="mb-16 text-center">
      <h1 className="heading-1 mb-4">Shirshajit Sen Gupta</h1>
      <p className="text-xl text-muted-foreground dark:text-gray-300 mb-6">
        AI Researcher & Software Engineer
      </p>
      <div className="flex justify-center space-x-4">
        <Button variant="outline" className="flex items-center gap-2">
          <a
            href="https://raw.githubusercontent.com/shirsho-12/shirsho-12.github.io/refs/heads/master/src/assets/resume/Shirshajit_Sen_Gupta_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download Resume
          </a>
        </Button>
        <Button asChild className="btn-primary">
          <a href="mailto:contact@shirshajit.com">Contact Me</a>
        </Button>
      </div>
    </header>
  );
};

export default CVHeader;
