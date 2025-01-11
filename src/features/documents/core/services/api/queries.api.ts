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
