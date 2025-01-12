import { ClientSideSuspense } from "@liveblocks/react/suspense";
import { useInboxNotifications } from "@liveblocks/react/suspense";
import { InboxNotification, InboxNotificationList } from "@liveblocks/react-ui";
import { BellIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";

const InboxNotifications = () => {
  return (
    <ClientSideSuspense fallback={<InboxNotificationButton />}>
      <InboxDropdown />
      <Separator orientation="vertical" className="h-6" />
    </ClientSideSuspense>
  );
};

export default InboxNotifications;

const InboxDropdown = () => {
  const { inboxNotifications } = useInboxNotifications();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <InboxNotificationButton>
          {inboxNotifications.length > 0 && (
            <span className="absolute -top-1 -right-1 size-4 flex justify-center items-center rounded-full text-xs text-white bg-sky-500">
              {inboxNotifications.length}
            </span>
          )}
        </InboxNotificationButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {inboxNotifications.length > 0 ? (
          <InboxNotificationList>
            {inboxNotifications.map((inboxNotification) => (
              <InboxNotification
                key={inboxNotification.id}
                inboxNotification={inboxNotification}
              />
            ))}
          </InboxNotificationList>
        ) : (
          <div className="w-[400px] p-2 text-center text-sm text-muted-foreground">
            No notifications
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const InboxNotificationButton = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  return (
    <Button variant="ghost" size="icon" className="relative">
      <BellIcon className="size-5" />
      {children}
    </Button>
  );
};
