import { Contact } from "@/components/section/contact";
import { Service } from "@/components/section/services";
import { HomeComponent } from "@/components/section/home";
import { Review } from "@/components/section/review";
import { Reservation } from "@/components/section/reservation";

export default function Home() {
  return (
    <main className="bg-gradient-to-br from-background to-background-end flex min-h-screen flex-col items-center justify-between">
      <HomeComponent />
      <Service />
      <Reservation />
      <Review />
      <Contact />
    </main>
  );
}
