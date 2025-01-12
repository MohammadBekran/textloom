"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";

import { useLiveblocksAuth } from "@/features/liveblocks/core/services/api/mutations.api";
import { useGetUsers } from "@/features/liveblocks/core/services/api/queries.api";

import FullScreenLoader from "@/components/fullscreen-loader";

interface IRoomProps {
  documentId: string;
  children: ReactNode;
}

export const Room = ({ documentId, children }: IRoomProps) => {
  const { mutateAsync: liveblocksAuth } = useLiveblocksAuth();
  const { data: users } = useGetUsers();

  return (
    <LiveblocksProvider
      throttle={16}
      authEndpoint={async () => {
        const response = await liveblocksAuth({
          json: { room: documentId },
        });

        return response;
      }}
      resolveUsers={async ({ userIds }) => {
        return userIds.map((userId) => {
          return users?.data.find((user) => user.id === userId);
        });
      }}
      resolveMentionSuggestions={({ text }) => {
        let filteredUsers = users?.data;

        if (text) {
          filteredUsers = users?.data.filter((user) => {
            user.name.toLowerCase().includes(text.toLowerCase());
          });
        }

        return filteredUsers?.map((user) => user.id) ?? [];
      }}
    >
      <RoomProvider id={documentId}>
        <ClientSideSuspense fallback={<FullScreenLoader />}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
};
