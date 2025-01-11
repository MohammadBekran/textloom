"use client";

import { useEffect } from "react";
import {
  OrganizationSwitcher,
  useOrganization,
  UserButton,
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
      <OrganizationSwitcher
        afterLeaveOrganizationUrl="/"
        afterCreateOrganizationUrl=""
        afterSelectOrganizationUrl=""
        afterSelectPersonalUrl=""
      />
      <UserButton />
    </div>
  );
};

export default UserButtons;
