"use client";

import { LoaderIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

import { useGetDocuments } from "@/features/documents/core/services/api/queries.api";
import type { TDocument } from "@/features/documents/core/types";
import DocumentRow from "@/features/home/components/document-row";
import { useDocumentsFilter } from "@/features/home/core/hooks";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const DocumentsTable = () => {
  const [accumulatedDocuments, setAccumulatedDocuments] = useState<TDocument[]>(
    []
  );
  const { filters, setFilters } = useDocumentsFilter();
  const [debouncedText] = useDebounce(filters.search, 1000);
  const { data: documents, isLoading: isDocumentsLoading } = useGetDocuments({
    query: {
      search: debouncedText ?? undefined,
      take: String(filters.take ?? 5),
      skip: String(filters.skip ?? 5),
    },
  });

  useEffect(() => {
    if (documents?.data) {
      if (documents.data.length === 0) setAccumulatedDocuments([]);
      else setAccumulatedDocuments((prev) => [...prev, ...documents.data]);
    }
  }, [documents?.data]);

  const handlePaginate = () => {
    setFilters((prev) => ({
      ...prev,
      skip: (prev.skip ?? 0) + (prev.take ?? 5),
    }));
  };

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
          {accumulatedDocuments.length === 0 ? (
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
              {accumulatedDocuments.map((document, index) => (
                <DocumentRow
                  key={`${document.id}-${index}`}
                  document={document}
                />
              ))}
            </TableBody>
          )}
        </Table>
      )}
      {!isDocumentsLoading && (
        <div className="flex justify-center items-center">
          <Button
            type="button"
            disabled={(documents?.remaining ?? 0) === 0}
            variant="ghost"
            size="sm"
            onClick={handlePaginate}
          >
            {(documents?.remaining ?? 0) === 0 ? "End of results" : "Load more"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default DocumentsTable;
