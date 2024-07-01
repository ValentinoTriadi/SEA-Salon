import { auth } from '@/auth';
import { Button } from '@/components/ui/button';
import { Role } from '@prisma/client';
import Link from 'next/link';

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  if (!session) return null;
  if (session.user.role === Role.USER) {
    return (
      <div className='w-full min-h-screen flex flex-col items-center justify-center lg:p-24 md:p-20 p-10 gap-2'>
          <h1 className='text-2xl md:text-4xl xl:text-6xl font-bold text-primary-foreground w-full text-center'>
            Oops! You don&apos;t have permission.
          </h1>
          <h2 className='text-lg md:text-xl xl:text-2xl font-medium text-accent-foreground w-full text-center'>
            Go back to dashboard?
          </h2>
          <Button size="lg">
            <Link href='/dashboard'>Dashboard</Link>
          </Button>
      </div>
    );
  }

  return <div>{children}</div>;
};

export default AdminLayout;
