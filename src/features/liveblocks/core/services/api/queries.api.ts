import { useQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";

import { client } from "@/lib/hono";

type TGetUsersResponse = InferResponseType<
  (typeof client.api.liveblocks.users)["$get"],
  200
>;

export const useGetUsers = () => {
  const query = useQuery<TGetUsersResponse, Error>({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await client.api.liveblocks.users["$get"]();

      if (!response.ok) throw new Error("Failed to fetch users");

      return await response.json();
    },
  });

  return query;
};
