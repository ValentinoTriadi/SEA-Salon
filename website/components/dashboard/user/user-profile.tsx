import { Role } from '@prisma/client';
import { Separator } from '../../ui/separator';
import { User } from 'next-auth';

interface UserProfileProps {
  user: User & { role: Role; phone: string };
}

export const UserProfile = ({ user }: UserProfileProps) => {
  return (
    <div className='w-full lg:pt-15 md:pt-10 pt-5'>
      <div className='flex flex-col w-fit gap-2'>
        <h1 className='text-xl md:text-2xl xl:text-4xl font-semibold text-start text-primary-foreground'>
          Profile
        </h1>
        <Separator className='h-1 bg-accent rounded-md' />
        <div className='w-full'>
          <div className='w-fit flex gap-2'>
            <h1 className='lg:text-2xl md:text-xl text-lg w-fit whitespace-nowrap font-semibold text-accent-foreground'>
              Name:
            </h1>
            <p className='lg:text-2xl md:text-xl text-lg text-primary-foreground'>
              {user.name}
            </p>
          </div>
          <div className='w-fit flex gap-2'>
            <h1 className='lg:text-2xl md:text-xl text-lg w-fit whitespace-nowrap font-semibold text-accent-foreground'>
              Email:
            </h1>
            <p className='lg:text-2xl md:text-xl text-lg text-primary-foreground'>
              {user.email}
            </p>
          </div>
          <div className='w-fit flex gap-2'>
            <h1 className='lg:text-2xl md:text-xl text-lg w-fit whitespace-nowrap font-semibold text-accent-foreground'>
              Phone:
            </h1>
            <p className='lg:text-2xl md:text-xl text-lg text-primary-foreground'>
              {user.phone}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
