import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/hono";
import { toast } from "@/lib/utils";

type TCreateDocumentRequest = InferRequestType<
  (typeof client.api.documents)["$post"]
>;
type TCreateDocumentResponse = InferResponseType<
  (typeof client.api.documents)["$post"],
  200
>;

type TUpdateDocumentRequest = InferRequestType<
  (typeof client.api.documents)[":documentId"]["$patch"]
>;
type TUpdateDocumentResponse = InferResponseType<
  (typeof client.api.documents)[":documentId"]["$patch"],
  200
>;

type TDeleteDocumentRequest = InferRequestType<
  (typeof client.api.documents)[":documentId"]["$delete"]
>;
type TDeleteDocumentResponse = InferResponseType<
  (typeof client.api.documents)[":documentId"]["$delete"],
  200
>;

export const useCreateDocument = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    TCreateDocumentResponse,
    Error,
    TCreateDocumentRequest
  >({
    mutationKey: ["create-document"],
    mutationFn: async ({ json }) => {
      const response = await client.api.documents["$post"]({ json });

      if (!response.ok) throw new Error("Failed to create the document");

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Document created");

      queryClient.invalidateQueries({
        queryKey: ["documents"],
      });
    },
    onError: () => toast.error("Failed to create the document"),
  });

  return mutation;
};

export const useUpdateDocument = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    TUpdateDocumentResponse,
    Error,
    TUpdateDocumentRequest
  >({
    mutationKey: ["update-document"],
    mutationFn: async ({ param, json }) => {
      const response = await client.api.documents[":documentId"]["$patch"]({
        param,
        json,
      });

      if (!response.ok) throw new Error("Failed to update the document");

      return await response.json();
    },
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({
        queryKey: ["documents"],
      });
      queryClient.invalidateQueries({
        queryKey: ["document", data.id],
      });
    },
    onError: () => toast.error("Failed to update the document"),
  });

  return mutation;
};

export const useDeleteDocument = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    TDeleteDocumentResponse,
    Error,
    TDeleteDocumentRequest
  >({
    mutationKey: ["delete-document"],
    mutationFn: async ({ param }) => {
      const response = await client.api.documents[":documentId"]["$delete"]({
        param,
      });

      if (!response.ok) throw new Error("Failed to delete the document");

      return await response.json();
    },
    onSuccess: ({ data }) => {
      toast.success("Document deleted");

      queryClient.invalidateQueries({
        queryKey: ["documents"],
      });
      queryClient.invalidateQueries({
        queryKey: ["document", data.id],
      });
    },
    onError: () => toast.error("Failed to delete the document"),
  });

  return mutation;
};
