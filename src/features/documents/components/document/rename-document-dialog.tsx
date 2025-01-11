import { useState } from "react";

import { useUpdateDocument } from "@/features/documents/core/services/api/mutations.api";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface IRenameDocumentDialogProps {
  documentId: string;
  title: string;
  children: React.ReactNode;
}

const RenameDocumentDialog = ({
  documentId,
  title: documentTitle,
  children,
}: IRenameDocumentDialogProps) => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [title, setTitle] = useState(documentTitle);
  const { mutate: updateDocument, isPending: isUpdatingDocumentPending } =
    useUpdateDocument();

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();

    setIsOpenDialog(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateDocument(
      {
        param: {
          documentId,
        },
        json: {
          title,
        },
      },
      {
        onSuccess: () => setIsOpenDialog(false),
      }
    );
  };

  return (
    <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Rename document</DialogTitle>
            <DialogDescription>
              Enter a new name for this document
            </DialogDescription>
          </DialogHeader>
          <div className="my-4">
            <Input
              type="text"
              disabled={isUpdatingDocumentPending}
              value={title}
              placeholder="Document name"
              onChange={(e) => setTitle(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              disabled={isUpdatingDocumentPending}
              variant="ghost"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isUpdatingDocumentPending}
              onClick={(e) => e.stopPropagation()}
            >
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RenameDocumentDialog;
