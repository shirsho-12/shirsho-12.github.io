import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 z-0"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="text-center md:text-left md:flex md:items-center md:justify-between md:gap-8">
          <div className="md:max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
              <span className="text-primary">Shirshajit</span> <br />
              <span className="text-gradient">Sen Gupta</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto md:mx-0">
              Passionate about artificial intelligence, app development, and
              creating solutions that make a difference. Sharing my journey
              through buggy code, research papers, and blog posts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button asChild size="lg" className="btn-primary">
                <Link to="/projects">View Projects</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="btn-outline"
              >
                <Link to="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
          <div className="hidden md:block md:w-1/4 lg:w-1/5">
            <img
              src="https://raw.githubusercontent.com/shirsho-12/shirsho-12.github.io/refs/heads/master/src/assets/img/prof_pic.jpg"
              alt="Profile Picture"
              className="w-full h-auto object-cover rounded-lg shadow-xl hidden md:block"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
