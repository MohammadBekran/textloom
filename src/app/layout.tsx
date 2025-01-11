import { Inter } from "next/font/google";

import NuqsProvider from "@/components/partials/providers/nuqs-provider";
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
        <NuqsProvider>{children}</NuqsProvider>
      </body>
    </html>
  );
}
