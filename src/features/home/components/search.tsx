"use client";

import { useRef } from "react";
import { SearchIcon } from "lucide-react";

import { useDocumentsFilter } from "@/features/home/core/hooks";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const Search = ({ hideOnMobile }: { hideOnMobile: boolean }) => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { filters, setFilters } = useDocumentsFilter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchInputRef.current) {
      setFilters({ search: searchInputRef.current.value });
    }
  };

  return (
    <form
      className={cn("w-full max-w-[720px] relative", {
        "hidden lg:block": hideOnMobile,
      })}
      onSubmit={handleSubmit}
    >
      <Input
        ref={searchInputRef}
        value={filters.search}
        placeholder="Search..."
        className="w-full h-[48px] rounded-full px-14 border-none bg-[#F0F4F8] placeholder:text-neutral-800 focus:bg-white focus-visible:shadow-[0_1px_1px_0_rgba(65,69,73,.3),0_1px_1px_0_rgba(65,69,73,.15)]  md:text-base focus-visible:ring-0"
        onChange={(e) =>
          setFilters({
            search: e.target.value,
            take: null,
          })
        }
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
