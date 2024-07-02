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
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { deleteBranch, postBranch } from '@/action/branch.action';
import { MultiSelect, MantineProvider } from '@mantine/core';
import '@mantine/core/styles/Input.css';
import '@mantine/core/styles/Combobox.css';
import '@mantine/core/styles/ScrollArea.css';
import '@mantine/core/styles/PillsInput.css';
import '@mantine/core/styles/Pill.css';
import '@mantine/core/styles/Fieldset.css';
import '@mantine/core/styles/Checkbox.css';
import '@mantine/core/styles/Card.css';
import '@mantine/core/styles/CloseButton.css';
import '@mantine/core/styles/Container.css';
import '@mantine/core/styles/Flex.css';
import '@mantine/core/styles/List.css';
import '@mantine/core/styles/Loader.css';
import '@mantine/core/styles/Menu.css';
import '@mantine/core/styles/Popover.css';
import '@mantine/core/styles/PinInput.css';
import '@mantine/core/styles/ScrollArea.css';

interface AdminBranchFormProps {
  serviceData: string[];
}

export const AdminBranchForm = ({ serviceData }: AdminBranchFormProps) => {
  // state
  const [isPending, startTransition] = useTransition();
  const [services, setServices] = useState<string[]>([]);

  // form
  const form = useForm({
    resolver: zodResolver(branchSchema),
    defaultValues: {
      name: '',
      location: '',
      opening: '',
      closing: '',
      Service: [],
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
    value.Service = services;
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
          window.location.reload();
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
        <MantineProvider>
          <MultiSelect
            label='Services'
            className=''
            color='#1D1D1D'
            styles={{
              label: {
                fontSize: '0.875rem',
                marginBottom: '0.5rem',
              },
              inputField: {
                fontSize: '0.875rem',
                color: '#94a3b8',
              },
              // section:{},
              input: {
                border: '1px solid #292A2E',
                backgroundColor: 'transparent',
                borderColor: '#292A2E',
                borderRadius: '0.5rem',
                color: 'white',
              },
              dropdown: {
                backgroundColor: '#222325',
                borderRadius: '0.5rem',
              },
              pill: {
                backgroundColor: '#292A2E',
                color: 'white',
                border: '1px solid #292A2E',
                fontSize: '0.875rem',
                borderRadius: '0.5rem',
              },
              option: {
                fontSize: '0.875rem',
              },
              empty: {
                fontSize: '0.875rem',
              },
            }}
            size='sm'
            disabled={isPending}
            data={serviceData}
            clearable
            searchable
            hidePickedOptions
            checkIconPosition='right'
            maxDropdownHeight={100}
            nothingFoundMessage='Service not found!'
            placeholder={services.length === 0 ? 'Select service' : ''}
            comboboxProps={{
              transitionProps: { transition: 'pop', duration: 200 },
              dropdownPadding: 10,
              shadow: 'md',
            }}
            onChange={(e) => setServices(e)}
          />
        </MantineProvider>
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
