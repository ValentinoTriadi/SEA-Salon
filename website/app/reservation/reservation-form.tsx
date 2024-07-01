'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { TimePicker12Demo } from '@/components/ui/time-picker';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon } from '@radix-ui/react-icons';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { useTransition } from 'react';
import {
  deleteReservation,
  postReservation,
} from '@/action/reservation.action';
import { reservationSchema } from '@/schema';
import { toast } from 'sonner';

interface Props {
  userId: string;
  name: string;
  phone: string;
  services: string[];
}

export const ReservationForm = ({ userId, name, phone, services }: Props) => {
  // state
  const [isPending, startTransition] = useTransition();

  // form
  const form = useForm({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      name: name,
      phone: phone,
      service: services[0] ?? '',
      startSession: new Date(),
    },
  });

  // cancel handler
  function onCancel(id: string | undefined) {
    startTransition(() => {
      if (!id) {
        toast('Error deleting reservation');
        return;
      }
      deleteReservation(id).then((data) => {
        if (data.error) {
          toast.warning('Error deleting reservation', {
            description: data.error,
          });
        } else {
          toast.success('Reservation deleted');
        }
      });
    });
  }

  // submit handler
  function onSubmit(value: z.infer<typeof reservationSchema>) {
    startTransition(() => {
      postReservation(value, userId).then((data) => {
        form.reset();
        if (data?.error) {
          toast.error('Error creating reservation', {
            description: data.error,
          });
        } else {
          toast.success('Reservation created', {
            description: data.success,
            action: {
              label: 'Undo',
              onClick: () => {
                onCancel(data?.id);
              },
            },
          });
        }
      });
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        {/* Name Field */}
        <FormField
          control={form.control}
          name='name'
          disabled={isPending}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='John Doe' disabled={isPending} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone Field */}
        <FormField
          control={form.control}
          name='phone'
          disabled={isPending}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input
                  placeholder='+628123456789'
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Include country code (without whitespace)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Service Field */}
        <FormField
          control={form.control}
          name='service'
          disabled={isPending}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isPending}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder='Select our Service'
                      className='text-muted-foreground'
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {services.map((s, index) => (
                    <SelectItem value={s} key={index}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Start Session Field */}
        <FormField
          control={form.control}
          name='startSession'
          disabled={isPending}
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>Date and Time</FormLabel>
              <Popover>
                <PopoverTrigger asChild disabled={isPending}>
                  <FormControl>
                    <Button
                      className={cn(
                        'min-w-[240px] w-fit pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'PPP hh:mm a')
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className='ml-10 h-4 w-4 opacity-50' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    mode='single'
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date() || date < new Date('1900-01-01')
                    }
                    initialFocus
                  />
                  <div className='p-3 flex items-center justify-center border-t border-accent'>
                    <TimePicker12Demo
                      setDate={field.onChange}
                      date={field.value}
                    />
                  </div>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' disabled={isPending}>
          Book
        </Button>
      </form>
    </Form>
  );
};
