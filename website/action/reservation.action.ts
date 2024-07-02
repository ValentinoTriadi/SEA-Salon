'use server';

import { db } from '@/lib/db';
import { reservationSchema } from '@/schema';
import { z } from 'zod';
import { getServiceDurationById, getServiceIdByName } from './service.action';

const DEFAULT_DURATION = 60;

export const postReservation = async (
  data: z.infer<typeof reservationSchema>,
  userId: string,
) => {
  try {
    // Validate fields
    const validatedFields = reservationSchema.safeParse(data);
    if (!validatedFields.success) {
      return { error: 'Invalid fields' };
    }

    const { name, phone, service, startSession } = validatedFields.data;

    // Get service id
    const serviceId = await getServiceIdByName(service);
    if (!serviceId) {
      return { error: 'Service not found' };
    }

    // Get end session
    const serviceDuration = await getServiceDurationById(serviceId);
    const duration = serviceDuration ?? DEFAULT_DURATION;
    const hours = duration / 60;
    const minutes = duration % 60;
    const endSession = new Date(startSession);
    endSession.setHours(endSession.getHours() + hours);
    endSession.setMinutes(endSession.getMinutes() + minutes);

    // Create reservation
    const res = await db.reservation.create({
      data: {
        name,
        userId,
        phone,
        serviceId,
        startSession,
        endSession,
      },
    });

    return {
      success:
        res.startSession.toLocaleDateString() +
        ' ' +
        res.startSession.toLocaleTimeString(),
      id: res.id,
    };
  } catch (error) {
    return { error: 'Error creating reservation' };
  }
};

export const deleteReservation = async (id: string) => {
  try {
    await db.reservation.delete({
      where: {
        id,
      },
    });
    return { success: 'Reservation deleted' };
  } catch (error) {
    return { error: 'Error deleting reservation' };
  }
};

export const getReservationByUserId = async (userId: string) => {
  const reservations = await db.reservation.findMany({
    select: {
      id: true,
      name: true,
      phone: true,
      startSession: true,
      endSession: true,
      service: {
        select: {
          name: true,
        },
      },
    },
    where: {
      userId,
    },
  });

  return reservations;
};
