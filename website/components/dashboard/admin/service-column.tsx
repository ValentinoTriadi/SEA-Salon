'use client';

import { ColumnDef } from '@tanstack/react-table';
import { serviceTableSchema } from '@/schema';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { CaretSortIcon, TrashIcon } from '@radix-ui/react-icons';
import { toast } from 'sonner';
import { deleteService } from '@/action/service.action';

export const ServiceColumn: ColumnDef<
  z.infer<typeof serviceTableSchema>
>[] = [
  {
    accessorKey: 'name',
    header: 'Service Name',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'duration',
    header: ({ column }) => {
      return (
        <Button
          variant='table-header'
          size="table-header"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Duration
          <CaretSortIcon className='w-4 h-4' />
        </Button>
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
            deleteService(id).then((data) => {
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
