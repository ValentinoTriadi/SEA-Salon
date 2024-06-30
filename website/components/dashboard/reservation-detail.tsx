'use client';

import { useEffect, useState } from 'react';
import { Separator } from '../ui/separator';
import { Reservation } from '@prisma/client';
import { getReservationByUserId } from '@/action/reservation.action';
import { format } from 'date-fns';

interface ReservationDetailProps {
  userId: string;
}

export const ReservationDetail = ({ userId }: ReservationDetailProps) => {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  // fetch reservation data
  useEffect(() => {
    async function fetchData() {
      const res = await getReservationByUserId(userId) as Reservation[];
      setReservations(res);
    }

    fetchData();
  }, [userId]);


  return (
    <div className='w-full lg:pt-15 md:pt-10 pt-5'>
      <div className='flex flex-col w-fit gap-2'>
        <h1 className='text-xl md:text-2xl xl:text-4xl font-semibold text-start text-primary-foreground'>
          Reservation Detail
        </h1>
        <Separator className='h-1 bg-accent rounded-md' />
      </div>
      <div>
        {reservations.map((reservation) => (
          <div key={reservation.id} className='flex flex-col gap-2'>
            <h1 className='text-md md:text-lg font-semibold text-start text-accent-foreground'>
              {reservation.name}
            </h1>
            <h2 className='text-md md:text-lg font-semibold text-start text-accent-foreground'>
              {reservation.phone}
            </h2>
            <h3 className='text-md md:text-lg font-semibold text-start text-accent-foreground'>
              {reservation.service}
            </h3>
            <h3 className='text-md md:text-lg font-semibold text-start text-accent-foreground'>
              {format(reservation.startSession, "PPPP (hh:mm a") + ' - ' + format(reservation.endSession, "hh:mm a)")}
            </h3>

            <Separator className='h-1 bg-accent rounded-md' />
          </div>
        ))}
      </div>
    </div>
  );
};
