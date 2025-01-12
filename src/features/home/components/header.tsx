import Image from "next/image";

import Search from "@/features/home/components/search";

import UserButtons from "@/components/user-buttons";

const Header = () => {
  return (
    <div className="size-full flex justify-between items-center">
      <div className="flex items-center gap-3 pr-6">
        <Image src="/logo.svg" alt="Logo" width={36} height={36} />
        <span className="text-xl">TextLoom</span>
      </div>
      <Search hideOnMobile />
      <div className="flex justify-between items-center">
        <UserButtons />
      </div>
    </div>
  );
};

export default Header;
