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
