import { Separator } from '../../ui/separator';
import { DataTable } from '../../ui/data-table';
import { BranchColumn } from './branch-column';
import { getBranchList } from '@/action/branch.action';

export const BranchList = async () => {
  const branches = await getBranchList();
  return (
    <div className='w-full lg:pt-15 md:pt-10 pt-5'>
      <div className='flex flex-col w-fit gap-2'>
        <h1 className='text-xl md:text-2xl xl:text-4xl font-semibold text-start text-primary-foreground'>
          Branch List
        </h1>
        <Separator className='h-1 bg-accent rounded-md' />
      </div>
      <DataTable
        columns={BranchColumn}
        data={branches}
        href='/admin/branch'
        listFilter={[]}
      />
    </div>
  );
};
