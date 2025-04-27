import { FileText } from "lucide-react";
import { usePublications } from "@/hooks/usePublications";
import { Button } from "@/components/ui/button";

const PublicationsSection = () => {
  const { publications, loading, error } = usePublications();

  return (
    <section className="mb-16">
      <div className="flex items-center mb-8">
        <FileText className="mr-2 text-navy" size={24} />
        <h2 className="text-2xl font-bold text-navy">Publications</h2>
      </div>
      <div className="relative">
        <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-200 dark:bg-gray-700"></div>
        <div className="space-y-8 relative">
          {loading && <p>Loading publications...</p>}
          {error && (
            <p className="text-red-500">
              Error loading publications: {error.message}
            </p>
          )}
          {publications?.map((pub) => (
            <div key={pub.id} className="pl-12 relative">
              <div className="absolute left-2 top-2 w-4 h-4 bg-white border-2 border-navy rounded-full dark:bg-gray-900"></div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {pub.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {pub.authors}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                {pub.conference}, {pub.year}
              </p>
              <div className="flex gap-4 mt-4">
                {pub.pdfUrl && (
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={pub.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      PDF
                    </a>
                  </Button>
                )}
                {pub.doiUrl && (
                  <Button
                    size="sm"
                    className="bg-navy hover:bg-navy/90"
                    asChild
                  >
                    <a
                      href={pub.doiUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      DOI
                    </a>
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PublicationsSection;
