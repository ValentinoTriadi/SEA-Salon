import { NextPage } from 'next';
import React from 'react';
import { AdminBranchForm } from './branch-form';
import { getServiceNameList } from '@/action/service.action';

interface Props {}

const AdminBranchPage: NextPage<Props> = async () => {
  const serviceData = await getServiceNameList();
  return (
    <div className='w-full min-h-screen md:p-24 p-10 pt-24 flex items-start justify-center'>
      <div className='md:w-[80%] w-[95%] flex flex-col gap-10'>
        <h1 className='w-full text-4xl md:text-5xl font-bold'>
          Add More Branch!
        </h1>
        <AdminBranchForm serviceData={serviceData} />
      </div>
    </div>
  );
};

export default AdminBranchPage;
