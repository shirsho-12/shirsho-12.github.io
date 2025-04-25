import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative mt-16 py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-navy/5 to-teal/5 z-0"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="text-center md:text-left md:flex md:items-center md:justify-between md:gap-8">
          <div className="md:max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
              <span className="text-navy">Shirshajit</span> <br />
              <span className="text-gradient">Sen Gupta</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto md:mx-0">
              Passionate about artificial intelligence, app development, and
              creating solutions that make a difference. Sharing my journey
              through buggy code, research papers, and blog posts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button asChild size="lg" className="bg-navy hover:bg-navy/90">
                <Link to="/projects">View Projects</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-navy text-navy hover:bg-navy/5"
              >
                <Link to="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
          <div className="hidden md:block md:w-1/4 lg:w-1/5">
            <img
              src="src/assets/images/prof_pic.jpg"
              alt="Hero Image"
              className="w-full h-80 object-cover rounded-lg shadow-xl hidden md:block"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
