import Image from "next/image"
import { Button } from "../ui/button"
import { ArrowDownIcon } from "@radix-ui/react-icons"
import Link from "next/link"

export const Reservation = () => {
    return (
        <div id="reservation" className="w-full gap-4 lg:p-28 p-10 flex flex-col items-center justify-center">
            <h1 className="text-3xl md:text-5xl font-bold text-center text-primary-foreground">Book your appointment now!</h1>
            <div className="flex items-center justify- pt-10">
                <ArrowDownIcon className="h-10 w-10 animate-bounce"/>
            </div>
            <Button variant="outline" className="text-xl md:text-3xl font-bold p-5 md:p-10"><Link href="/reservation">Book Now</Link></Button>
        </div>
    )
}