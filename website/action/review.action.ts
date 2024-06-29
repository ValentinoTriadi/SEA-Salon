"use server";

import { Review } from "@/app/review/interface";
import { db } from "@/lib/db";


export const postReview = async (data: Review) => {
    const { name, rating, comment } = data;

    return await db.review.create({
        data: {
            name,
            rating,
            comment,
        },
    });
}

export const getAverageRating = async () => {
    return await db.review.aggregate({
        _avg: {
            rating: true,
        },
    });
}