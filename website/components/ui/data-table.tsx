'use client';

import {
  ColumnDef,
  flexRender,
  SortingState,
  useReactTable,
  getSortedRowModel,
  getCoreRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table';
import { Button } from './button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select';
import { ArrowLeftIcon, ArrowRightIcon, PlusIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  listFilter: string[];
  FilterColumn: string;
  href?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  listFilter,
  FilterColumn,
  href,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 5,
      },
    },
  });

  return (
    <div className=''>
      <div className='flex items-center gap-2 mt-5'>
        <h1 className='text-lg w-fit whitespace-nowrap font-semibold text-primary-foreground'>
          Filter :
        </h1>
        <Select
          onValueChange={(value) =>
            table.getColumn(FilterColumn)?.setFilterValue(value)
          }
          value={
            (table.getColumn(FilterColumn)?.getFilterValue() as string) ?? ''
          }
        >
          <SelectTrigger>
            <SelectValue placeholder='Filter' />
          </SelectTrigger>
          <SelectContent>
            {listFilter.map((s, index) => (
              <SelectItem value={s} key={index}>
                {s}
              </SelectItem>
            ))}
            <SelectItem value={' '}>Clear Filter</SelectItem>
          </SelectContent>
        </Select>
        {href && (
          <Button variant='outline' className='aspect-square border-0'>
            <Link href={href}>
              <PlusIcon className='w-4 h-4' />
            </Link>
          </Button>
        )}
      </div>
      <div className='rounded-md border mt-2'>
        <Table>
          <TableHeader className='bg-card'>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-center space-x-2 py-4'>
        <Button
          size='sm'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ArrowLeftIcon className='w-4 h-4' />
        </Button>
        <Button
          size='sm'
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ArrowRightIcon className='w-4 h-4' />
        </Button>
      </div>
    </div>
  );
}
