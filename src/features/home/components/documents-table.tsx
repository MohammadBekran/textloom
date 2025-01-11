"use client";

import { useDebounce } from "use-debounce";
import { LoaderIcon } from "lucide-react";

import { useGetDocuments } from "@/features/documents/core/services/api/queries.api";
import { useSearch } from "@/features/home/core/hooks";
import DocumentRow from "@/features/home/components/document-row";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const DocumentsTable = () => {
  const { search } = useSearch();
  const [debouncedText] = useDebounce(search, 1000);
  const { data: documents, isLoading: isDocumentsLoading } = useGetDocuments({
    query: {
      search: debouncedText ?? undefined,
    },
  });

  return (
    <div className="max-w-screen-xl mx-auto flex flex-col gap-5 py-6 px-16">
      {isDocumentsLoading ? (
        <div className="h-24 flex justify-center items-center">
          <LoaderIcon className="size-5 text-muted-foreground animate-spin" />
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="border-none hover:bg-transparent">
              <TableHead>Name</TableHead>
              <TableHead>&nbsp;</TableHead>
              <TableHead className="hidden md:table-cell">Shared</TableHead>
              <TableHead className="hidden md:table-cell">Created at</TableHead>
            </TableRow>
          </TableHeader>
          {documents?.data.length === 0 ? (
            <TableBody>
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={4}
                  className="h-24 text-center text-muted-foreground"
                >
                  No documents found
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {documents?.data.map((document) => (
                <DocumentRow key={document.id} document={document} />
              ))}
            </TableBody>
          )}
        </Table>
      )}
    </div>
  );
};

export default DocumentsTable;
