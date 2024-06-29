import { Contact } from "@/components/section/contact";
import { Service } from "@/components/section/services";
import { HomeComponent } from "@/components/section/home";
import { Navbar } from "@/components/section/navbar";
import { Review } from "@/components/section/review";

export default function Home() {
  return (
    <main className="bg-gradient-to-br from-background to-background-end flex min-h-screen flex-col items-center justify-between">
      <Navbar />
      <HomeComponent />
      <Service />
      <Review />
      <Contact />
    </main>
  );
}
