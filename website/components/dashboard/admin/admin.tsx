import { ServiceList } from './service-list';

export const AdminDashboard = async () => {
  return (
    <div className='w-full flex flex-col items-center justify-start'>
      <h1 className='text-2xl md:text-4xl xl:text-6xl font-medium text-primary-foreground w-full text-left'>
        Admin Dashboard
      </h1>
      <ServiceList />
    </div>
  );
};
