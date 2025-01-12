import { useStatus } from "@liveblocks/react";
import { LoaderIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { BsCloudCheck, BsCloudSlash } from "react-icons/bs";

import { useUpdateDocument } from "@/features/documents/core/services/api/mutations.api";

import { useDebounce } from "@/core/hooks";
import { toast } from "@/lib/utils";

interface IDocumentInputProps {
  documentId: string;
  documentTitle: string;
}

const DocumentInput = ({ documentId, documentTitle }: IDocumentInputProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(true);
  const [title, setTitle] = useState(documentTitle);
  const documentTitleInputRef = useRef<HTMLInputElement>(null);
  const status = useStatus();
  const { mutate: updateDocument, isPending: isUpdatingDocumentPending } =
    useUpdateDocument();

  const isLoading =
    isUpdatingDocumentPending ||
    status === "connecting" ||
    status === "reconnecting";
  const isError = status === "disconnected";

  const debouncedUpdate = useDebounce((newTitle: string) => {
    updateDocument(
      {
        param: {
          documentId,
        },
        json: {
          title: newTitle,
        },
      },
      {
        onSuccess: () => {
          toast.success("Document updated");

          setIsEditing(false);
          router.refresh();
        },
        onError: () => setIsEditing(false),
      }
    );
  }, 1000);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;

    setTitle(newTitle);
    debouncedUpdate(newTitle);
  };

  const handleDocumentTitleClick = () => {
    setIsEditing(true);

    setTimeout(() => {
      documentTitleInputRef.current?.focus();
    }, 0);
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
        onSuccess: () => setIsEditing(false),
        onError: () => setIsEditing(false),
      }
    );
  };

  return (
    <div className="flex items-center gap-2">
      {isEditing ? (
        <form onSubmit={handleSubmit} className="relative w-fit max-w-[50ch]">
          <span className="invisible whitespace-pre px-1.5 text-lg">
            {title ?? " "}
          </span>
          <input
            ref={documentTitleInputRef}
            value={title}
            className="absolute inset-0 text-lg px-1.5 truncate bg-transparent text-black"
            onBlur={() => setIsEditing(true)}
            onChange={handleInputChange}
          />
        </form>
      ) : (
        <span
          className="text-lg px-1.5 cursor-pointer truncate"
          onClick={handleDocumentTitleClick}
        >
          {title}
        </span>
      )}
      {isLoading && (
        <LoaderIcon className="size-4 text-muted-foreground animate-spin" />
      )}
      {isError && <BsCloudSlash className="size-4" />}
      {!isLoading && !isError && <BsCloudCheck className="size-4" />}
    </div>
  );
};

export default DocumentInput;
