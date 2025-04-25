export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image?: string;
  githubUrl?: string;
  liveUrl?: string;
  content?: string;
}

// export const projects: Project[] = [
// {
//   id: "ai-image-generator",
//   title: "AI Image Generator",
//   description:
//     "A web application that uses machine learning to generate images from text descriptions using OpenAI's DALL-E API.",
//   tags: ["React", "TypeScript", "Node.js", "OpenAI"],
//   image: "https://placehold.co/600x400/1a202c/ffffff?text=AI+Image+Generator",
//   githubUrl: "https://github.com",
//   liveUrl: "https://example.com",
// },
// {
//   id: "blockchain-voting",
//   title: "Blockchain Voting System",
//   description:
//     "A secure and transparent voting system built on blockchain technology that ensures vote integrity and prevents fraud.",
//   tags: ["Solidity", "Ethereum", "Web3.js", "React"],
//   image: "https://placehold.co/600x400/1a202c/ffffff?text=Blockchain+Voting",
//   githubUrl: "https://github.com",
// },
// {
//   id: "data-visualization",
//   title: "Data Visualization Dashboard",
//   description:
//     "An interactive dashboard for visualizing complex datasets with customizable charts, filters, and real-time updates.",
//   tags: ["D3.js", "React", "Node.js", "MongoDB"],
//   image: "https://placehold.co/600x400/1a202c/ffffff?text=Data+Visualization",
//   liveUrl: "https://example.com",
// },
// {
//   id: "ml-recommendation",
//   title: "ML Recommendation System",
//   description:
//     "A machine learning-based recommendation system that analyzes user behavior to suggest relevant products or content.",
//   tags: ["Python", "TensorFlow", "Flask", "SQL"],
//   image: "https://placehold.co/600x400/1a202c/ffffff?text=ML+Recommendation",
//   githubUrl: "https://github.com",
// },
// {
//   id: "real-time-chat",
//   title: "Real-time Chat Application",
//   description:
//     "A scalable chat application supporting multiple rooms, direct messaging, and media sharing with end-to-end encryption.",
//   tags: ["Socket.io", "React", "Express", "MongoDB"],
//   image: "https://placehold.co/600x400/1a202c/ffffff?text=Real-time+Chat",
//   githubUrl: "https://github.com",
//   liveUrl: "https://example.com",
// },
// {
//   id: "os-scheduler",
//   title: "Operating System Scheduler",
//   description:
//     "A simulation of various CPU scheduling algorithms, including round-robin, priority scheduling, and shortest job first.",
//   tags: ["C++", "Data Structures", "Algorithms"],
//   image: "https://placehold.co/600x400/1a202c/ffffff?text=OS+Scheduler",
//   githubUrl: "https://github.com",
// },
// ];
