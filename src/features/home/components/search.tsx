"use client";

import { SearchIcon } from "lucide-react";
import { useDebounce } from "use-debounce";

import { useSearch } from "@/features/home/core/hooks";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Search = () => {
  const { search, setSearch } = useSearch();
  const [debouncedValue] = useDebounce(search, 1000);

  console.log({ debouncedValue });

  return (
    <form className="w-full max-w-[720px] relative">
      <Input
        value={search}
        placeholder="Search..."
        className="w-full h-[48px] rounded-full px-14 border-none bg-[#F0F4F8] placeholder:text-neutral-800 focus:bg-white focus-visible:shadow-[0_1px_1px_0_rgba(65,69,73,.3),0_1px_1px_0_rgba(65,69,73,.15)]  md:text-base focus-visible:ring-0"
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button
        type="submit"
        variant="ghost"
        size="icon"
        className="absolute top-1/2 left-3 rounded-full -translate-y-1/2 [&_svg]:size-5"
      >
        <SearchIcon className="size-4" />
      </Button>
    </form>
  );
};

export default Search;
