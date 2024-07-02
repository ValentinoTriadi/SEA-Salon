import { getServiceList } from "@/action/service.action"
import Image from "next/image"

export const Service = async () => {
  const services = await getServiceList();

  return (
    <div className="w-full flex flex-col lg:p-24 pt-24 p-10 items-center justify-start" id="services">
      <h1 className="text-5xl md:text-7xl font-bold text-left text-primary-foreground">Services</h1>
      <div className="flex flex-wrap items-start justify-center gap-8 mt-12 md:mt-24 max-w-[95%]">
        {services.map((service, index) => (
          <div key={index} className="basis-[100%] md:basis-[45%] xl:basis-[30%] bg-card h-full p-8 rounded-lg flex flex-col justify-between items-center">
            <Image src={service.image ? service.image : "/logo.svg"} alt={service.name} width={250} height={350} loading="lazy" className="rounded-lg h-[350px]"/>
            <h2 className="text-2xl font-bold text-left text-primary-foreground mt-4">{service.name}</h2>
            <p className="text-lg font-normal text-justify text-accent-foreground mt-2">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
  