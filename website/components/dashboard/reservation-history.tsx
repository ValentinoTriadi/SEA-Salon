'use client';

import { useEffect, useState } from 'react';
import { Separator } from '../ui/separator';
import { getReservationByUserId } from '@/action/reservation.action';
import { DataTable } from '../ui/data-table';
import { reservationColumns } from './reservation-column';
import { z } from 'zod';
import { reservationTableSchema } from '@/schema';

interface ReservationHistoryProps {
  userId: string;
}

export const ReservationHistory = ({ userId }: ReservationHistoryProps) => {
  const [reservations, setReservations] = useState<z.infer<typeof reservationTableSchema>[]>([]);

  // fetch reservation data
  useEffect(() => {
    async function fetchData() {
      const res = await getReservationByUserId(userId) as z.infer<typeof reservationTableSchema>[];
      setReservations(res);
    }

    fetchData();
  }, [userId]);


  return (
    <div className='w-full lg:pt-15 md:pt-10 pt-5'>
      <div className='flex flex-col w-fit gap-2'>
        <h1 className='text-xl md:text-2xl xl:text-4xl font-semibold text-start text-primary-foreground'>
          Reservation History
        </h1>
        <Separator className='h-1 bg-accent rounded-md' />
      </div>
      <DataTable columns={reservationColumns} data={reservations} href='/reservation'/>
    </div>
  );
};
