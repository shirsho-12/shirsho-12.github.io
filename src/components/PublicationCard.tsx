import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Link as LinkIcon } from "lucide-react";

export interface PublicationCardProps {
  title: string;
  authors: string;
  conference: string;
  year: number;
  abstract: string;
  pdfUrl?: string;
  doiUrl?: string;
}

const PublicationCard = ({
  title,
  authors,
  conference,
  year,
  abstract,
  pdfUrl,
  doiUrl,
}: PublicationCardProps) => {
  return (
    <Card className="card-hover">
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        <div className="caption mt-1">
          <p>{authors}</p>
          <p className="mt-1 font-medium">
            {conference}, {year}
          </p>
        </div>
      </CardHeader>

      <CardContent>
        <CardDescription className="text-muted-foreground">
          {abstract}
        </CardDescription>
      </CardContent>

      <CardFooter className="flex gap-4">
        {pdfUrl && (
          <Button variant="outline" size="sm" asChild>
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              PDF
            </a>
          </Button>
        )}

        {doiUrl && (
          <Button size="sm" className="btn-primary" asChild>
            <a
              href={doiUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <LinkIcon className="h-4 w-4" />
              DOI
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default PublicationCard;
