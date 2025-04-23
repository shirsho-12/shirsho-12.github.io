
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-navy/5 to-teal/5 z-0"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center md:text-left md:flex md:items-center md:justify-between">
          <div className="md:max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
              <span className="text-navy">Computer Science Student</span> <br />
              <span className="text-gradient">& Developer</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto md:mx-0">
              Passionate about software development, research, and creating solutions that make a difference.
              Sharing my journey through code, research papers, and blog posts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button asChild size="lg" className="bg-navy hover:bg-navy/90">
                <Link to="/projects">View Projects</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-navy text-navy hover:bg-navy/5">
                <Link to="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
          <div className="hidden md:block md:w-1/3 lg:w-2/5">
            <div className="w-full h-80 bg-gradient-to-tr from-teal/20 to-navy/20 rounded-lg shadow-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
