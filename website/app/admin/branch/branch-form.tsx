'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { branchSchema } from '@/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { deleteBranch, postBranch } from '@/action/branch.action';

export const AdminBranchForm = () => {
  // state
  const [isPending, startTransition] = useTransition();

  // form
  const form = useForm({
    resolver: zodResolver(branchSchema),
    defaultValues: {
      name: '',
      location: '',
      opening: '',
      closing: '',
      // Service: [],
    },
  });

  // cancel handler
  function onCancel(id: string | undefined) {
    startTransition(() => {
      if (!id) {
        toast('Error deleting Service');
        return;
      }
      deleteBranch(id).then((data) => {
        if (data.error) {
          toast.warning(data.error);
        } else {
          toast.success(data.success);
        }
      });
    });
  }

  // submit handler
  function onSubmit(value: z.infer<typeof branchSchema>) {
    startTransition(() => {
      postBranch(value).then((data) => {
        if (data.error) {
          toast.error(data.error);
        } else {
          toast.success(data.success, {
            description: `Branch ${data.name} added`,
            action: {
              label: 'Undo',
              onClick: () => {
                onCancel(data.id);
              },
            },
          });
          form.reset();
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
              <FormLabel>Branch Name</FormLabel>
              <FormControl>
                <Input
                  placeholder='Branch Name'
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Location Field */}
        <FormField
          control={form.control}
          name='location'
          disabled={isPending}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Branch Location</FormLabel>
              <FormControl>
                <Input placeholder='Location' disabled={isPending} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Opening Field */}
        <FormField
          control={form.control}
          name='opening'
          disabled={isPending}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Open Time</FormLabel>
              <FormControl>
                <Input
                  placeholder='Open Time'
                  disabled={isPending}
                  type='time'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Closing Field */}
        <FormField
          control={form.control}
          name='closing'
          disabled={isPending}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Close Time</FormLabel>
              <FormControl>
                <Input
                  placeholder='Close Time'
                  disabled={isPending}
                  type='time'
                  {...form.register('closing', {
                    valueAsDate: true,
                  })}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Service Field */}
        {/* <FormField
          control={form.control}
          name='Service'
          disabled={isPending}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Services</FormLabel>
              <FormControl>
                <Input placeholder='Services' type='list' disabled={isPending} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        {/* Submit Button */}
        <Button type='submit' disabled={isPending}>
          Add Branch
        </Button>
      </form>
    </Form>
  );
};
