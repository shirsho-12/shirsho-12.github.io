
import Layout from "@/components/Layout";
import PublicationCard from "@/components/PublicationCard";
import { publications } from "@/data/publications";

const Publications = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-navy mb-4">Publications</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A collection of my research papers and publications in academic conferences and journals.
            My research primarily focuses on machine learning, blockchain technology, and software engineering.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8">
          {publications.map(publication => (
            <PublicationCard
              key={publication.id}
              title={publication.title}
              authors={publication.authors}
              conference={publication.conference}
              year={publication.year}
              abstract={publication.abstract}
              pdfUrl={publication.pdfUrl}
              doiUrl={publication.doiUrl}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Publications;
