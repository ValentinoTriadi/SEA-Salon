'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { serviceSchema } from '@/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { deleteService, postService } from '@/action/service.action';
import { toast } from 'sonner';

export const AdminServiceForm = () => {
  // state
  const [isPending, startTransition] = useTransition();

  // form
  const form = useForm({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      name: '',
      description: '',
      duration: 60,
      image: '',
    },
  });

  // cancel handler
  function onCancel(id: string | undefined) {
    startTransition(() => {
      if (!id) {
        toast('Error deleting Service');
        return;
      }
      deleteService(id).then((data) => {
        if (data.error) {
          toast.warning(data.error);
        } else {
          toast.success(data.success);
        }
      });
    });
  }

  // submit handler
  function onSubmit(value: z.infer<typeof serviceSchema>) {
    startTransition(() => {
      postService(value).then((data) => {
        if (data.error) {
          toast.error(data.error);
        } else {
          toast.success(data.success, {
            description: data.name + ' has been added',
            action: {
              label: 'Undo',
              onClick: () => {
                onCancel(data.id);
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
              <FormLabel>Service Name</FormLabel>
              <FormControl>
                <Input
                  placeholder='Service Name'
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Name Field */}
        <FormField
          control={form.control}
          name='description'
          disabled={isPending}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service Description</FormLabel>
              <FormControl>
                <Input
                  placeholder='Service Description'
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Duration Field */}
        <FormField
          control={form.control}
          name='duration'
          disabled={isPending}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service Duration</FormLabel>
              <FormControl>
                <Input
                  disabled={isPending}
                  type='number'
                  min={1}
                  {...form.register('duration', {
                    valueAsNumber: true,
                  })}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Image Field */}
        <FormField
          control={form.control}
          name='image'
          disabled={isPending}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service Image</FormLabel>
              <FormControl>
                <Input
                  placeholder='Service Image'
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type='submit' disabled={isPending}>
          Add Service
        </Button>
      </form>
    </Form>
  );
};
