import { Contact } from "@/components/contact";
import { Service } from "@/components/services";
import { HomeComponent } from "@/components/home";
import Image from "next/image";
import { Navbar } from "@/components/navbar";

export default function Home() {
  return (
    <main className="bg-gradient-to-br from-background to-background-end flex min-h-screen flex-col items-center justify-between">
      <Navbar />
      <HomeComponent />
      <Service />
      <Contact />
    </main>
  );
}
