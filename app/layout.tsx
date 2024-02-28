import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";

import { ModalProvider } from "@/providers/modal-provider";

import "./globals.css";
import { QueryProvider } from "@/providers/query-provider";
import { QueryDevToolsProvider } from "@/providers/query-devtools-provider";
import { ToasterProvider } from "@/providers/toast-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <QueryProvider>
        <html lang="en">
          <body className={inter.className}>
            <ToasterProvider />
            <ModalProvider />
            {children}
            <QueryDevToolsProvider />
          </body>
        </html>
      </QueryProvider>
    </ClerkProvider>
  );
}
