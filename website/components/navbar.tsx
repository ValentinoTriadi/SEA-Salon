"use client";

import Image from "next/image"
import { useState, useEffect } from "react";
import { DropdownMenuTrigger, DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu";

export const Navbar= () => {
    const [scrolled, setScrolled] = useState(false);

    const menuItems = [
        {
            title: "Services",
            link: "/#services"
        },
        {
            title: "Reservation",
            link: "/reservation"
        },
        {
            title: "Review",
            link: "/review"
        },
        {
            title: "Contact",
            link: "/#contact"
        },
    ]

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY >= 10;
            setScrolled(isScrolled);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <nav className={`flex fixed top-0 w-dvw justify-between items-center drop-shadow-xl md:px-10 px-4 py-2 ${scrolled ? "bg-secondary" : ""}`}>
            <div className="flex w-[25%] justify-start items-center">
                <a href="#home"><Image src="/logo.svg" width={20} height={20} alt="logo" /></a>
            </div>
            <div>
                <h1 className="text-xl font-semibold select-none text-accent">SEA Salon</h1>
            </div>

            {/* menu large */}
            <div className="hidden lg:flex w-[25%] justify-end items-center">
                <ul className="flex gap-4">
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            <a href={item.link} className="text-primary-foreground hover:text-accent">{item.title}</a>
                        </li>
                    ))}
                </ul>
            </div>

            {/* menu burger */}
            <div className="flex lg:hidden w-[25%] justify-end items-center">
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Image src={"/menu.svg"} width={25} height={25} alt="menu"/>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {menuItems.map((item, index) => (
                            <DropdownMenuItem key={index} onSelect={() => window.location.href = item.link}>
                                <p className="text-primary-foreground">{item.title}</p>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </nav>
    );
}