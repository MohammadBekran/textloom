import Image from "next/image";
import { UserButton } from "@clerk/nextjs";

import Search from "@/features/home/components/search";

const Header = () => {
  return (
    <div className="size-full flex justify-between items-center">
      <div className="flex items-center gap-3 pr-6">
        <Image src="/logo.svg" alt="Logo" width={36} height={36} />
        <span className="text-xl">TextLoom</span>
      </div>
      <Search />
      <UserButton />
    </div>
  );
};

export default Header;
