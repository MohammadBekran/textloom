import { useState } from "react";
import { useRouter } from "next/navigation";

import { useDeleteDocument } from "@/features/documents/core/services/api/mutations.api";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface IDeleteDocumentDialogProps {
  documentId: string;
  children: React.ReactNode;
}

const DeleteDocumentDialog = ({
  documentId,
  children,
}: IDeleteDocumentDialogProps) => {
  const router = useRouter();
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const { mutate: deleteDocument, isPending: isDeletingDocumentPending } =
    useDeleteDocument();

  const handleDeleteDocument = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    deleteDocument(
      {
        param: {
          documentId,
        },
      },
      {
        onSuccess: () => {
          setIsOpenDialog(false);

          router.push("/");
        },
      }
    );
  };

  return (
    <AlertDialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            document.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isDeletingDocumentPending}
            onClick={handleDeleteDocument}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDocumentDialog;
