import { useOthers, useSelf } from "@liveblocks/react";
import { ClientSideSuspense } from "@liveblocks/react/suspense";

import { Separator } from "@/components/ui/separator";
import Image from "next/image";

const Avatars = () => {
  return (
    <ClientSideSuspense fallback={null}>
      <AvatarStack />
    </ClientSideSuspense>
  );
};

export default Avatars;

const AvatarStack = () => {
  const users = useOthers();
  const currentUser = useSelf();

  if (users.length === 0) return;

  return (
    <>
      <div className="flex items-center">
        {currentUser && (
          <div className="relative ml-2">
            <Avatar picture={currentUser.info.avatar} name="You" />
          </div>
        )}
        {users.map(({ connectionId, info: { avatar, name } }) => (
          <Avatar key={connectionId} picture={avatar} name={name} />
        ))}
      </div>
      <Separator orientation="vertical" className="h-6" />
    </>
  );
};

interface IAvatarProps {
  picture: string;
  name: string;
}

const Avatar = ({ picture, name }: IAvatarProps) => {
  return (
    <div className="group size-9 relative flex place-content-center shrink-0 rounded-full border-4 border-white bg=gray-400">
      <div className="absolute top-full z-10 rounded-lg transition-opacity whitespace-nowrap text-xs py-1 px-2 mt-2.5 opacity-0 bg-black text-white group-hover:opacity-100">
        {name}
      </div>
      <Image src={picture} alt={name} fill className="rounded-full" />
    </div>
  );
};
