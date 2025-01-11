import { Inter } from "next/font/google";

import NuqsProvider from "@/components/partials/providers/nuqs-provider";
import ClerkProvider from "@/components/partials/providers/clerk-provider";
import QueryProvider from "@/components/partials/providers/query-provider";
import Toaster from "@/components/partials/providers/toaster";
import { cn } from "@/lib/utils";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

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
