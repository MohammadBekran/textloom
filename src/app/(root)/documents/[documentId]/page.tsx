import Document from "@/features/documents/components/document";

const DocumentPage = async ({
  params,
}: {
  params: Promise<{ documentId: string }>;
}) => {
  const { documentId } = await params;

  console.log({ documentId });

  return <Document />;
};

export default DocumentPage;
