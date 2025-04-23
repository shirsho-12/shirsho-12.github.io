
export interface Publication {
  id: string;
  title: string;
  authors: string;
  conference: string;
  year: number;
  abstract: string;
  pdfUrl?: string;
  doiUrl?: string;
}

export const publications: Publication[] = [
  {
    id: "neural-network-optimization",
    title: "Novel Optimization Techniques for Deep Neural Networks in Resource-Constrained Environments",
    authors: "Your Name, Collaborator One, Collaborator Two",
    conference: "International Conference on Machine Learning (ICML)",
    year: 2023,
    abstract: "This paper introduces new optimization methods for deploying deep neural networks on devices with limited computational resources, achieving comparable accuracy with significantly reduced model size and inference time.",
    pdfUrl: "https://example.com/paper1.pdf",
    doiUrl: "https://doi.org/10.1234/example.5678"
  },
  {
    id: "blockchain-privacy",
    title: "Preserving Privacy in Blockchain Transactions Through Zero-Knowledge Proofs",
    authors: "Your Name, Collaborator Three",
    conference: "IEEE Symposium on Security and Privacy",
    year: 2022,
    abstract: "We present a novel framework for implementing zero-knowledge proofs in blockchain transactions that ensures user privacy while maintaining the transparency and integrity benefits of distributed ledgers.",
    pdfUrl: "https://example.com/paper2.pdf",
    doiUrl: "https://doi.org/10.1234/example.5679"
  },
  {
    id: "quantum-algorithms",
    title: "Efficient Quantum Algorithms for Graph Theory Problems",
    authors: "Your Name, Collaborator Four, Collaborator Five",
    conference: "Quantum Information Processing (QIP)",
    year: 2022,
    abstract: "This research explores quantum algorithms for solving classical graph theory problems, demonstrating quadratic speedup for connectivity and path finding problems compared to classical algorithms.",
    doiUrl: "https://doi.org/10.1234/example.5680"
  },
  {
    id: "software-reliability",
    title: "Predicting Software Reliability Using Ensemble Machine Learning Techniques",
    authors: "Your Name, Collaborator Six",
    conference: "International Conference on Software Engineering (ICSE)",
    year: 2021,
    abstract: "We propose an ensemble approach combining multiple machine learning models to predict software failures and improve reliability, validated against large-scale industrial software repositories.",
    pdfUrl: "https://example.com/paper4.pdf",
    doiUrl: "https://doi.org/10.1234/example.5681"
  }
];
