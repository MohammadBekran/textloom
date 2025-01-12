import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

import { useCreateDocument } from "@/features/documents/core/services/api/mutations.api";

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
import { Label } from "@/components/ui/label";

const CreateDocumentDialog = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const documentTitleInputRef = useRef<HTMLInputElement>(null);
  const { mutate: createDocument, isPending: isCreatingDocumentPending } =
    useCreateDocument();

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    setIsOpenDialog(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createDocument(
      {
        json: {
          title: documentTitleInputRef?.current?.value ?? "Untitled Document",
          initialContent: "",
        },
      },
      {
        onSuccess: ({ data }) => router.push(`/documents/${data.id}`),
      }
    );
  };

  return (
    <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
      <DialogTrigger asChild onClick={(e) => e.stopPropagation()}>
        {children}
      </DialogTrigger>
      <DialogContent onClick={(e) => e.stopPropagation()}>
        <form className="flex flex-col gap-y-2" onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create a new document</DialogTitle>
            <DialogDescription>
              For creating a new document, enter a title to continue
            </DialogDescription>
          </DialogHeader>
          <Label htmlFor="title">Title</Label>
          <Input
            ref={documentTitleInputRef}
            disabled={isCreatingDocumentPending}
            id="title"
            placeholder="Title"
          />
          <DialogFooter>
            <Button
              type="button"
              disabled={isCreatingDocumentPending}
              variant="ghost"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isCreatingDocumentPending}
              onClick={(e) => e.stopPropagation()}
            >
              Continue
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateDocumentDialog;
