import Image from "next/image"

export const HomeComponent = () => {
  return (
    <div className="w-full h-screen md:gap-20 gap-10 flex flex-col md:flex-row justify-center items-center md:p-24" id="home">
      <Image src="/logo.svg" width={250} height={250} loading="lazy" alt="logo" />
      <div>
        <h1 className="text-5xl font-bold md:text-left text-center text-primary-foreground">SEA Salon</h1>
        <p className="text-xl font-normal md:text-left text-center text-accent-foreground">“Beauty and Elegance Redefined”</p>
      </div>
    </div>
  )
}