'use client';

import { ColumnDef } from '@tanstack/react-table';
import { reservationTableSchema } from '@/schema';
import { format } from 'date-fns';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CaretSortIcon, PlusIcon, TrashIcon } from '@radix-ui/react-icons';
import { deleteReservation } from '@/action/reservation.action';
import { toast } from 'sonner';

export const reservationColumns: ColumnDef<
  z.infer<typeof reservationTableSchema>
>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
  },
  {
    accessorKey: 'service',
    header: 'Service',
    cell: ({ row }) => {
      const service: string = row.getValue('service');
      return service.replace(/_/g, ' ');
    },
  },
  {
    accessorKey: 'startSession',
    header: ({ column }) => {
      return (
        <Button
          variant='table-header'
          size="table-header"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Session Date
          <CaretSortIcon className='w-4 h-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      return `${format(row.getValue('startSession'), 'PPPP')}`;
    },
  },
  {
    id: 'SessionTime',
    header: 'Session Time',
    cell: ({ row }) => {
      const start: Date = row.original.startSession;
      const end: Date = row.original.endSession;

      return `${format(start, 'hh:mm a')} - ${format(end, 'hh:mm a')}`;
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
            deleteReservation(id).then((data) => {
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
