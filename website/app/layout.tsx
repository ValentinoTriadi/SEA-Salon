import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/navbar";
import { auth } from "@/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SEA Salon",
  description: "Beauty and Elegance Redefined",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const isLogin = !!session;

  return (
    <html lang="en" className="scroll-smooth">
      <body className={cn(
        inter.className,
        "bg-gradient-to-br from-background to-background-end"
      )}>
        {children}
        <Navbar isLogin={isLogin}/>
        <Toaster />
      </body>
    </html>
  );
}
