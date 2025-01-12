import { useQuery } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/hono";

type TGetDocumentsRequest = InferRequestType<
  (typeof client.api.documents)["$get"]
>;
type TGetDocumentsResponse = InferResponseType<
  (typeof client.api.documents)["$get"],
  200
>;

type TGetDocumentRequest = InferRequestType<
  (typeof client.api.documents)[":documentId"]["$get"]
>;
type TGetDocumentResponse = InferResponseType<
  (typeof client.api.documents)[":documentId"]["$get"],
  200
>;

export const useGetDocuments = ({
  query: documentsQuery,
}: TGetDocumentsRequest) => {
  const query = useQuery<TGetDocumentsResponse, Error>({
    queryKey: ["documents", documentsQuery],
    queryFn: async () => {
      const response = await client.api.documents["$get"]({
        query: documentsQuery,
      });

      if (!response.ok) throw new Error("Failed to get the documents");

      return await response.json();
    },
  });

  return query;
};

export const useGetDocument = ({ param }: TGetDocumentRequest) => {
  const query = useQuery<TGetDocumentResponse, Error>({
    queryKey: ["document", param.documentId],
    queryFn: async () => {
      const response = await client.api.documents[":documentId"]["$get"]({
        param,
      });

      if (!response.ok) throw new Error("Failed to get the document");

      return await response.json();
    },
  });

  return query;
};
