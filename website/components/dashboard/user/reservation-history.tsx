import { Separator } from '../../ui/separator';
import { getReservationByUserId } from '@/action/reservation.action';
import { DataTable } from '../../ui/data-table';
import { reservationColumns } from './reservation-column';
import { z } from 'zod';
import { reservationTableSchema } from '@/schema';
import { getServiceNameList } from '@/action/service.action';

interface ReservationHistoryProps {
  userId: string;
}

export const ReservationHistory = async ({
  userId,
}: ReservationHistoryProps) => {
  const res = await getReservationByUserId(userId);
  const parsedRes = res.map((r) => ({
    id: r.id,
    name: r.name,
    phone: r.phone,
    service: r.service.name,
    startSession: r.startSession,
    endSession: r.endSession,
  }));

  const services = await getServiceNameList();

  return (
    <div className='w-full lg:pt-15 md:pt-10 pt-5'>
      <div className='flex flex-col w-fit gap-2'>
        <h1 className='text-xl md:text-2xl xl:text-4xl font-semibold text-start text-primary-foreground'>
          Reservation History
        </h1>
        <Separator className='h-1 bg-accent rounded-md' />
      </div>
      <DataTable
        columns={reservationColumns}
        data={parsedRes}
        href='/reservation'
        listFilter={services}
      />
    </div>
  );
};
