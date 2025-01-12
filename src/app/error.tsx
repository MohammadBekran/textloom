"use client";

import { TriangleAlertIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface IErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const ErrorPage = ({ error, reset }: IErrorPageProps) => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-y-4">
      <div className="rounded-full p-3 bg-rose-100">
        <TriangleAlertIcon className="size-10 text-rose-600" />
      </div>
      <h1 className="text-xl font-semibold text-gray-900">
        Something went wrong
      </h1>
      <p className="max-w-[90%] overflow-hidden text-center">{error.message}</p>
      <div className="flex gap-x-3">
        <Button className="px-6 font-medium" onClick={reset}>
          Try again
        </Button>
        <Button asChild variant="ghost" className="font-medium" onClick={reset}>
          <Link href="/">Go back</Link>
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
