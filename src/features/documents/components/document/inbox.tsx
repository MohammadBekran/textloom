import { ClientSideSuspense } from "@liveblocks/react/suspense";
import { useInboxNotifications } from "@liveblocks/react/suspense";
import { InboxNotification, InboxNotificationList } from "@liveblocks/react-ui";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";

const Inbox = () => {
  return <ClientSideSuspense fallback={null}>Inbox</ClientSideSuspense>;
};

export default Inbox;
