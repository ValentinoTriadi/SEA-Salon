import { auth, signOut } from '@/auth';
import { AdminDashboard } from '@/components/dashboard/admin/admin';
import { UserDashboard } from '@/components/dashboard/user/user';
import { Role } from '@prisma/client';
import { NextPage } from 'next';

interface Props {}

const DashboardPage: NextPage<Props> = async () => {
  const session = await auth();
  if (!session) return null;

  if (session.user.role === Role.USER) {
    return (
      <div className='w-full min-h-screen flex items-start justify-center lg:p-24 md:p-20 p-10'>
        <UserDashboard user={session.user} />
      </div>
    );
  }

  return (
    <div className='w-full min-h-screen flex items-start justify-center lg:p-24 md:p-20 p-10'>
      <AdminDashboard />
    </div>
  );
};

export default DashboardPage;
