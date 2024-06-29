import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SEA Salon",
  description: "Beauty and Elegance Redefined",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={cn(
        inter.className,
        "bg-gradient-to-br from-background to-background-end"
      )}>
        {children}
        <Navbar />
        <Toaster />
      </body>
    </html>
  );
}
