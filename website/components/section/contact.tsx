"use client";

import { useEffect, useState } from "react";
import Image from "next/image"

export const Contact = () => {
  // Data
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

  // State
  const [imageSizes, setImageSizes] = useState(30);
  
  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      setImageSizes(window.innerWidth > 768 ? 50 : 30);
    };
  
    handleResize(); // Set initial value
  
    window.addEventListener("resize", handleResize);
  
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  
  return (
    <div className="w-full h-fit bg-card p-10 md:p-20 drop-lg" id="contact">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {/* left */}
        <div className="flex flex-col justify-center items-start">
          <h4 className="text-3xl md:text-5xl font-bold text-accent pb-5">Contact us</h4>
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
              <Image src={social.image} width={imageSizes} height={imageSizes} alt={social.name} />
            </a>
          ))  
          }
        </div>
      </div>
    </div>
  )
}