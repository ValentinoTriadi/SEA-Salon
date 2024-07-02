"use client";

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { StarIcon } from "../icon/StarIcon"
import { getAverageRating } from "@/action/review.action"
import { useEffect, useState } from "react"

export const Review = () => {
  // rating state
  const [rate, setRate] = useState(0);

  // fetch rate data
  async function fetchData() {
    const avg = (await getAverageRating())._avg.rating;
    const rate = avg ? Math.round(avg) : 0;
    setRate(rate);
  }

  // Refresh rate data
  useEffect(() => {
    fetchData();
  
    // Display Star Icon
    function StarRefresh() {
      const avg = Math.round(rate);
      for (let i = 1; i <= 5; i++) {
        const star = document.getElementById(`star-${i}`);
        if (i <= avg) {
          star?.classList.add('fill-accent');
        } else {
          star?.classList.remove('fill-accent');
        }
      }
    }
  
    StarRefresh();
  }, [rate]);

  return (
    <div className="w-full gap-1 lg:p-28 md:p-20 p-10 lg:pl-52 sm:pl-30 pl-15 flex flex-col items-start justify-center" id="review">
      <h1 className="text-3xl md:text-5xl xl:text-7xl font-bold text-start text-primary-foreground">Your feedback matters!</h1>
      <h2 className="text-md md:text-2xl xl:text-3xl font-bold text-start text-accent-foreground">Share your thoughts about our service.</h2>
      <div className="flex items-center justify-start pt-2">
        <StarIcon id="star-1" className="h-10 w-10 text-accent"/>
        <StarIcon id="star-2" className="h-10 w-10 text-accent"/>
        <StarIcon id="star-3" className="h-10 w-10 text-accent"/>
        <StarIcon id="star-4" className="h-10 w-10 text-accent"/>
        <StarIcon id="star-5" className="h-10 w-10 text-accent"/>
        <h1 className="pl-5 text-2xl">{rate} / 5</h1>
      </div>
      <Button className="text-md font-semibold p-5 md:mt-12 mt-8"><Link href="/review">Review</Link></Button>
    </div>
  )
}

