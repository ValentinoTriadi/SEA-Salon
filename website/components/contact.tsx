import Image from "next/image"

export const Contact = () => {
  const contactPerson = [
    {
      name: "Thomas",
      phone: "08123456789",
    },
    {
      name: "Sekar",
      phone: "08164829372",
    },
  ]

  const socialMedia = [
    {
      name: "Instagram",
      image: "/instagram.svg",
      link: "https://instagram.com",
    },
    {
      name: "X",
      image: "/x.svg",
      link: "https://x.com",
    },
  ]

  return (
    <div className="w-full h-fit bg-card p-10 md:p-20 drop-lg" id="contact">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {/* left */}
        <div className="flex flex-col justify-center items-start">
          <h4 className="text-3xl font-bold text-accent pb-5">Contact us</h4>
          {contactPerson.map((person, index) => (
            <div key={index} className="flex flex-col justify-center items-start p-2">
              <h5 className="text-lg font-bold text-primary-foreground">{person.name}</h5>
              <p className="text-md font-normal text-accent-foreground">{person.phone}</p>
            </div>
          ))}
        </div>

        {/* middle */}
        <div className="flex flex-col justify-center items-center">
        </div>

        {/* right */}
        <div className="flex justify-center md:justify-end items-start">
          {socialMedia.map((social, index) => (
            <a key={index} className="flex flex-col justify-center items-center p-2" href={social.link} target="_blank" rel="noreferrer" title={social.name} aria-label={social.name} role="button" tabIndex={0} aria-hidden={true}>
              <Image src={social.image} width={50} height={50} alt={social.name} />
            </a>
          ))  
          }
        </div>
      </div>
    </div>
  )
}