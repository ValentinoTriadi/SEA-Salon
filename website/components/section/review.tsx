import { Button } from "@/components/ui/button"
import Link from "next/link"

export const Review = () => {
  return (
    <div className="w-full gap-1 lg:p-28 p-10 pl-15 lg:pl-52 flex flex-col items-start justify-center" id="review">
      <h1 className="text-4xl md:text-7xl font-bold text-start text-primary-foreground">Your feedback matters!</h1>
      <h2 className="text-xl md:text-3xl font-bold text-start text-accent-foreground">Share your thoughts about our service.</h2>
      <Button className="text-md font-semibold p-5 md:mt-12 mt-8"><Link href="/review">Review</Link></Button>
    </div>
  )
}

