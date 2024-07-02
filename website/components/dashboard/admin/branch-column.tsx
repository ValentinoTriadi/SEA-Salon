'use client';

import { ColumnDef } from '@tanstack/react-table';
import { branchTableSchema } from '@/schema';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { CaretSortIcon, TrashIcon } from '@radix-ui/react-icons';
import { toast } from 'sonner';
import { deleteBranch } from '@/action/branch.action';

export const BranchColumn: ColumnDef<z.infer<typeof branchTableSchema>>[] = [
  {
    accessorKey: 'name',
    header: 'Branch Name',
  },
  {
    accessorKey: 'location',
    header: 'Location',
  },
  {
    accessorKey: 'opening',
    header: ({ column }) => {
      return (
        <Button
          variant='table-header'
          size='table-header'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Opening
          <CaretSortIcon className='w-4 h-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'closing',
    header: ({ column }) => {
      return (
        <Button
          variant='table-header'
          size='table-header'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Closing
          <CaretSortIcon className='w-4 h-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'Service',
    header: 'Services',
    cell: ({ row }) => {
      return (
        <p className='text-wrap break-words'>
          {row.original.Service.join(', ')}
        </p>
      );
    },
  },
  {
    id: 'delete',
    cell: ({ row }) => {
      const id = row.original.id;

      return (
        <Button
          variant={'destructive'}
          onClick={() => {
            deleteBranch(id).then((data) => {
              if (data.error) {
                toast.error(data.error);
              } else {
                toast.success(data.success);
              }
              window.location.reload();
            });
          }}
        >
          <TrashIcon className='w-full h-full' />
        </Button>
      );
    },
  },
];
