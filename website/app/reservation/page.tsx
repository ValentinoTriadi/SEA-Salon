import { NextPage } from 'next';
import { ReservationForm } from './reservation-form';
import { auth } from '@/auth';
import { getServiceNameList } from '@/action/service.action';

interface Props {}

const ReservationPage: NextPage<Props> = async () => {
  const session = await auth();
  if (!session) return null;
  const services = await getServiceNameList();

  return (
    <div className='w-full min-h-screen md:p-24 p-10 pt-24 flex items-start justify-center'>
      <div className='md:w-[80%] w-[95%] flex flex-col gap-10'>
        <h1 className='w-full text-4xl md:text-5xl font-bold'>
          Reserve Your Appointment!
        </h1>
        <ReservationForm name={session.user.name!} phone={session.user.phone} userId={session.user.id!} services={services}/>
      </div>
    </div>
  );
};

export default ReservationPage;
