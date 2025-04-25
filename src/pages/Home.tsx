
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import AboutSection from "@/components/sections/AboutSection";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import RecentBlogPosts from "@/components/sections/RecentBlogPosts";
import CallToAction from "@/components/sections/CallToAction";

const Home = () => {
  return (
    <Layout>
      <Hero />
      <AboutSection />
      <FeaturedProjects />
      <RecentBlogPosts />
      <CallToAction />
    </Layout>
  );
};

export default Home;
