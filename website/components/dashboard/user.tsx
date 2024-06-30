import { Role } from '@prisma/client';
import { User } from 'next-auth';
import { ReservationDetail } from './reservation-detail';

interface UserDashboardProps {
  user: User & { role: Role };
}

export const UserDashboard = ({ user }: UserDashboardProps) => {
  return (
    <div className='w-full flex flex-col items-center justify-start'>
      <h1 className='text-3xl md:text-5xl xl:text-7xl font-bold text-primary-foreground'>
        Customer Dashboard
      </h1>
      <ReservationDetail userId={user.id!} />
    </div>
  );
};
