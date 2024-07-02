'use server'

import { db } from '@/lib/db'
import { reviewSchema } from '@/schema'
import { z } from 'zod'

export const postReview = async (data: z.infer<typeof reviewSchema>) => {
  try {
    // Validate fields
    const validatedFields = reviewSchema.safeParse(data)
    if (!validatedFields.success) {
      return { error: 'Invalid fields' }
    }

    const { name, rating, comment } = validatedFields.data
    const rate = parseInt(rating);

    const res = await db.review.create({
      data: {
        name,
        rating: rate,
        comment,
      },
    })

    return { success: res.rating }
  } catch (error) {
    return { error: 'Error sending review' }
  }
}

export const getAverageRating = async () => {
  return await db.review.aggregate({
    _avg: {
      rating: true,
    },
  })
}
