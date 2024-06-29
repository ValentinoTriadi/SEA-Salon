"use server";

import { reservationSchema } from "@/app/reservation/reservation-form";
import { db } from "@/lib/db";
import { z } from "zod";

export const postReservation = async (data: z.infer<typeof reservationSchema>) => {
    const { name, phone, service, startSession } = data;
    const endSession = new Date(startSession);
    endSession.setHours(endSession.getHours() + 1);

    return await db.reservation.create({
        data: {
            name,
            phone,
            service,
            startSession,
            endSession,
        },
    });
};