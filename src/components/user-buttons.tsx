"use client";

import { useEffect } from "react";
import {
  OrganizationSwitcher,
  useOrganization,
  UserButton,
  ClerkLoaded,
} from "@clerk/nextjs";
import { useQueryClient } from "@tanstack/react-query";

const UserButtons = () => {
  const queryClient = useQueryClient();
  const organization = useOrganization();

  useEffect(() => {
    if (organization) {
      queryClient.invalidateQueries({
        queryKey: ["documents"],
      });
    }
  }, [organization, queryClient]);

  return (
    <div className="flex items-center gap-3 pl-6">
      <ClerkLoaded>
        <OrganizationSwitcher
          afterLeaveOrganizationUrl="/"
          afterCreateOrganizationUrl=""
          afterSelectOrganizationUrl=""
          afterSelectPersonalUrl=""
        />
        <UserButton />
      </ClerkLoaded>
    </div>
  );
};

export default UserButtons;
