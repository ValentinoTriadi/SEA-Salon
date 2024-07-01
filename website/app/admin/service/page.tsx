import { NextPage } from 'next';
import { auth } from '@/auth';
import { AdminServiceForm } from './service-form';

interface Props {}

const AdminServicePage: NextPage<Props> = async () => {
  const session = await auth();

  return (
    <div className='w-full min-h-screen md:p-24 p-10 pt-24 flex items-start justify-center'>
      <div className='md:w-[80%] w-[95%] flex flex-col gap-10'>
        <h1 className='w-full text-4xl md:text-5xl font-bold'>
          Add More Service!
        </h1>
        <AdminServiceForm />
      </div>
    </div>
  );
};

export default AdminServicePage;
