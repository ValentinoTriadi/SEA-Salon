import { auth, signOut } from '@/auth';
import { UserDashboard } from '@/components/dashboard/user';
import { Role } from '@prisma/client';
import { NextPage } from 'next';

interface Props {}

const DashboardPage: NextPage<Props> = async () => {
  const session = await auth();
  if (!session) return null;

  if (session.user.role === Role.USER) {
    return (
      <div className='w-full min-h-screen flex items-start justify-center lg:p-28 md:p-20 p-10'>
        <UserDashboard user={session.user} />
      </div>
    )
  }


  return (
    <div className='w-full h-screen flex items-start justify-center'>
      {JSON.stringify(session)}
      <form
        action={async () => {
          'use server';
          await signOut();
        }}
      >
        <button type='submit'>Sign out</button>
      </form>
    </div>
  );
};

export default DashboardPage;
