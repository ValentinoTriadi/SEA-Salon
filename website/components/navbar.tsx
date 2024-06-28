"use client";

import Image from "next/image"
import { useState, useEffect } from "react";
import { DropdownMenuTrigger, DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu";
import { DropdownMenuIcon } from "@radix-ui/react-icons";

export const Navbar= () => {
    const [scrolled, setScrolled] = useState(false);

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
        <nav className={`flex fixed top-0 w-dvw justify-between items-center drop-shadow-xl px-10 py-2 ${scrolled ? "bg-secondary" : ""}`}>
            <div className="flex w-[25%] justify-start items-center">
                <a href="#home"><Image src="/logo.svg" width={25} height={25} alt="logo" /></a>
            </div>
            <div>
                <h1 className="text-xl font-bold select-none">SEA Salon</h1>
            </div>

            {/* menu large */}
            <div className="hidden md:flex w-[25%] justify-end items-center">
                <ul className="flex gap-4">
                    <li>
                        <a href="#home" className="text-primary-foreground hover:text-accent">Home</a>
                    </li>
                    <li>
                        <a href="#services" className="text-primary-foreground hover:text-accent">Services</a>
                    </li>
                    <li>
                        <a href="#contact" className="text-primary-foreground hover:text-accent">Contact</a>
                    </li>
                </ul>
            </div>

            {/* menu burger */}
            <div className="flex md:hidden w-[25%] justify-end items-center">
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Image src={"/menu.svg"} width={25} height={25} alt="menu"/>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onSelect={() => window.location.href = "#home"}>
                            <p className="text-primary-foreground">Home</p>
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => window.location.href = "#services"}>
                            <p className="text-primary-foreground">Services</p>
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => window.location.href = "#contact"}>
                            <p className="text-primary-foreground">Contact</p>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            

        </nav>
    );
}