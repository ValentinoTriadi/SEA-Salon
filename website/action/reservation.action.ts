'use server'

import { db } from '@/lib/db'
import { reservationSchema } from '@/schema'
import { z } from 'zod'

export const postReservation = async (
  data: z.infer<typeof reservationSchema>,
) => {
  try {
    // Validate fields
    const validatedFields = reservationSchema.safeParse(data)
    if (!validatedFields.success) {
      return { error: 'Invalid fields' }
    }

    const { name, phone, service, startSession } = validatedFields.data
    const endSession = new Date(startSession)
    endSession.setHours(endSession.getHours() + 1)

    // Create reservation
    const res = await db.reservation.create({
      data: {
        name,
        phone,
        service,
        startSession,
        endSession,
      },
    })

    return { success: res.startSession.toLocaleDateString() + " " + res.startSession.toLocaleTimeString(), id: res.id }
  } catch (error) {
    return { error: 'Error creating reservation' }
  }
}

export const deleteReservation = async (id: string) => {
  try {
    await db.reservation.delete({
      where: {
        id,
      },
    })
    return { success: 'Reservation deleted' }
  } catch (error) {
    return { error: 'Error deleting reservation' }
  }
}
