import { useRouter } from "next/navigation";
import { SiGoogledocs } from "react-icons/si";
import { format } from "date-fns";
import { Document } from "@prisma/client";
import { Building2Icon, CircleUserIcon } from "lucide-react";

import DocumentActions from "@/features/home/components/document-actions";

import { TableCell, TableRow } from "@/components/ui/table";

interface IDocumentRowProps {
  document: Omit<Document, "createdAt" | "updatedAt"> & {
    createdAt: string;
    updatedAt: string;
  };
}

const DocumentRow = ({
  document: { id, title, organizationId, createdAt },
}: IDocumentRowProps) => {
  const router = useRouter();

  const formattedDate = format(createdAt, "MMM dd, yyyy");

  return (
    <TableRow
      className="cursor-pointer"
      onClick={() => router.push(`/documents/${id}`)}
    >
      <TableCell className="w-[50px]">
        <SiGoogledocs className="size-6 fill-blue-500" />
      </TableCell>
      <TableCell className="md:w-[45%] font-medium">{title}</TableCell>
      <TableCell className="hidden items-center gap-2 text-muted-foreground md:flex">
        {organizationId ? (
          <Building2Icon className="size-4" />
        ) : (
          <CircleUserIcon className="size-4" />
        )}
        {organizationId ? "Organization" : "Personal"}
      </TableCell>
      <TableCell className="hidden text-muted-foreground md:table-cell">
        {formattedDate}
      </TableCell>
      <TableCell className="flex justify-end">
        <DocumentActions documentId={id} title={title} />
      </TableCell>
    </TableRow>
  );
};

export default DocumentRow;
