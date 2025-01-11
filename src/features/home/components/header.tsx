import Image from "next/image";

import Search from "@/features/home/components/search";

const Header = () => {
  return (
    <div className="size-full flex justify-between items-center">
      <div className="flex items-center gap-3 pr-6">
        <Image src="/logo.svg" alt="Logo" width={36} height={36} />
        <span className="text-xl">TextLoom</span>
      </div>
      <Search />
      <div />
    </div>
  );
};

export default Header;
