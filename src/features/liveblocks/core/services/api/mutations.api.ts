import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/hono";
import { toast } from "@/lib/utils";

type TLiveblocksAuthRequest = InferRequestType<
  (typeof client.api.liveblocks)["liveblocks-auth"]["$post"]
>;
type TLiveblocksAuthResponse = InferResponseType<
  (typeof client.api.liveblocks)["liveblocks-auth"]["$post"],
  200
>;

export const useLiveblocksAuth = () => {
  const mutation = useMutation<
    TLiveblocksAuthResponse,
    Error,
    TLiveblocksAuthRequest
  >({
    mutationKey: ["liveblocks-auth"],
    mutationFn: async ({ json }) => {
      const response = await client.api.liveblocks["liveblocks-auth"]["$post"]({
        json,
      });

      if (!response.ok) throw new Error("Failed to authorize");

      return await response.json();
    },
    onSuccess: () => toast.success("Authorized"),
    onError: () => toast.error("Failed to authorize"),
  });

  return mutation;
};
