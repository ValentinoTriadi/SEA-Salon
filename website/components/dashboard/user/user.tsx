import { Role } from '@prisma/client';
import { User } from 'next-auth';
import { ReservationHistory } from './reservation-history';
import { UserProfile } from './user-profile';
import { getServiceNameList } from '@/action/service.action';

interface UserDashboardProps {
  user: User & { role: Role; phone: string };
}

export const UserDashboard = async ({ user }: UserDashboardProps) => {
  const services = await getServiceNameList();

  return (
    <div className='w-full flex flex-col items-center justify-start'>
      <h1 className='text-2xl md:text-4xl xl:text-6xl font-medium text-primary-foreground w-full text-left'>
        Hello, <b className='text-accent'>{user.name}</b>
      </h1>
      <UserProfile user={user} />
      <ReservationHistory userId={user.id!} />
    </div>
  );
};
