"use client";

import Editor from "@/features/documents/components/document/editor";
import Navbar from "@/features/documents/components/document/navbar";
import { Room } from "@/features/documents/components/document/room";
import Toolbar from "@/features/documents/components/document/toolbar";
import { useGetDocument } from "@/features/documents/core/services/api/queries.api";

const Document = ({ documentId }: { documentId: string }) => {
  const { data: document } = useGetDocument({
    param: {
      documentId,
    },
  });

  return (
    <Room documentId={documentId}>
      <div className="min-h-screen bg-[#FAFBFD]">
        <div className="fixed top-0 left-0 right-0 z-10 flex flex-col gap-y-2 pt-2 px-4 bg-[#FAFBFD] print:hidden">
          <Navbar
            documentId={document?.data.id ?? ""}
            documentTitle={document?.data.title ?? ""}
          />
          <Toolbar />
        </div>
        <div className="pt-[114px] print:pt-0">
          <Editor initialContent={document?.data.initialContent ?? ""} />
        </div>
      </div>
    </Room>
  );
};

export default Document;
