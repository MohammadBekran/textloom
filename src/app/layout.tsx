import type { Metadata } from "next";
import { Inter } from "next/font/google";

import ClerkProvider from "@/components/partials/providers/clerk-provider";
import NuqsProvider from "@/components/partials/providers/nuqs-provider";
import QueryProvider from "@/components/partials/providers/query-provider";
import Toaster from "@/components/toaster";
import { cn } from "@/lib/utils";

import "@liveblocks/react-tiptap/styles.css";
import "@liveblocks/react-ui/styles.css";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TextLoom - Home",
  description:
    "In this page, you can see all of your documents and create new ones",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("antialiased", inter.className)}>
        <ClerkProvider>
          <NuqsProvider>
            <QueryProvider>
              <Toaster />
              {children}
            </QueryProvider>
          </NuqsProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
