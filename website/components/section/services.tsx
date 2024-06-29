import Image from "next/image"

export const Service = () => {
  const services = [
    {
      image: "/haircut.jpg",
      title: "Haircuts and Styling",
      description: "We offer a variety haircuts and styling services for all hair types and lengths.",
    },
    {
      image: "/nails.jpg",
      title: "Manicure and Pedicure",
      description: "Our nail technicians are skilled in the latest nail trends and techniques.",
    },
    {
      image: "/facial.jpg",
      title: "Facials Treatments",
      description: "We offer a variety of facial treatments to help you achieve your skin goals.",
    }
  ]

  return (
    <div className="w-full flex flex-col lg:p-24 p-10 items-center justify-start" id="services">
      <h1 className="text-5xl md:text-7xl font-bold text-left text-primary-foreground">Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-center items-start gap-8 mt-12 md:mt-24 max-w-[95%]">
        {services.map((service, index) => (
          <div key={index} className="bg-card h-full p-8 rounded-lg flex flex-col justify-between items-center">
            <Image src={service.image} alt={service.title} width={250} height={350} loading="lazy" className="rounded-lg"/>
            <h2 className="text-2xl font-bold text-left text-primary-foreground mt-4">{service.title}</h2>
            <p className="text-lg font-normal text-justify text-accent-foreground mt-2">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
  