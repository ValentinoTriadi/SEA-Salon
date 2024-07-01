import { Role } from '@prisma/client';
import { User } from 'next-auth';
import { ReservationHistory } from './reservation-history';
import { getReservationByUserId } from '@/action/reservation.action';

interface UserDashboardProps {
  user: User & { role: Role };
}

export const UserDashboard = async ({ user }: UserDashboardProps) => {
  const data = await getReservationByUserId(user.id!);

  return (
    <div className='w-full flex flex-col items-center justify-start'>
      <h1 className='text-3xl md:text-5xl xl:text-7xl font-medium text-primary-foreground w-full text-left'>
        Hello, <b className='text-accent'>{user.name}</b>
      </h1>
      <ReservationHistory userId={user.id!}/>
    </div>
  );
};
