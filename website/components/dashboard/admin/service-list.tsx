import { Separator } from '../../ui/separator';
import { DataTable } from '../../ui/data-table';
import { ServiceColumn } from './service-column';
import { getServiceList } from '@/action/service.action';

export const ServiceList = async () => {
  const services = await getServiceList();
  return (
    <div className='w-full lg:pt-15 md:pt-10 pt-5'>
      <div className='flex flex-col w-fit gap-2'>
        <h1 className='text-xl md:text-2xl xl:text-4xl font-semibold text-start text-primary-foreground'>
          Service List
        </h1>
        <Separator className='h-1 bg-accent rounded-md' />
      </div>
      <DataTable
        columns={ServiceColumn}
        data={services}
        href='/admin/service'
        listFilter={[]}
      />
    </div>
  );
};
