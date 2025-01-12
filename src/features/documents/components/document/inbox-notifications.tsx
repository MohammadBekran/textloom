import { InboxNotification, InboxNotificationList } from "@liveblocks/react-ui";
import {
  ClientSideSuspense,
  useInboxNotifications,
} from "@liveblocks/react/suspense";
import { BellIcon } from "lucide-react";
import { forwardRef } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

const InboxNotifications = () => {
  return (
    <ClientSideSuspense fallback={<InboxNotificationButton disabled />}>
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
      <DropdownMenuTrigger asChild>
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

interface IInboxNotificationButtonProps {
  disabled?: boolean;
  children?: React.ReactNode;
}

const InboxNotificationButton = forwardRef<
  HTMLButtonElement,
  IInboxNotificationButtonProps
>(({ disabled, children, ...props }, ref) => {
  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      disabled={disabled}
      className="relative"
      {...props}
    >
      <BellIcon className="size-5" />
      {children}
    </Button>
  );
});

InboxNotificationButton.displayName = "InboxNotificationButton";
