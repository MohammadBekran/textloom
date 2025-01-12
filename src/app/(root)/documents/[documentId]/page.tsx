import type { Metadata } from "next";

import Document from "@/features/documents/components/document";
import { getDocument } from "@/features/documents/core/actions";

export const dynamic = "force-dynamic";

interface IDocumentPageProps {
  params: Promise<{ documentId: string }>;
}

const DocumentPage = async ({ params }: IDocumentPageProps) => {
  const { documentId } = await params;

  return <Document documentId={documentId} />;
};

export const generateMetadata = async ({
  params,
}: IDocumentPageProps): Promise<Metadata> => {
  const { documentId } = await params;

  const document = await getDocument(documentId);

  return {
    title: document.title,
    description: `In this page you have access to edit you document`,
  };
};

export default DocumentPage;
