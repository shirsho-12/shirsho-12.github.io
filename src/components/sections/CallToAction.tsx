import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-6">
          Interested in Collaborating?
        </h2>
        <p className="text-lg mb-8 text-primary-foreground/80 max-w-3xl mx-auto">
          I'm always open to discussing new projects, research opportunities, or
          potential collaborations. Feel free to reach out if you'd like to
          connect!
        </p>
        <Button
          asChild
          size="lg"
          className="bg-background text-text hover:bg-background/90"
        >
          <Link to="/contact">Get in Touch</Link>
        </Button>
      </div>
    </section>
  );
};

export default CallToAction;
