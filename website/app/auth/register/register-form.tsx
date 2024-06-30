'use client';

import { z } from 'zod';
import { AuthCard } from '@/components/auth/auth-card';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@/schema';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTransition } from 'react';
import { toast } from 'sonner';
import { register } from '@/action/auth/register.action';

export const RegisterForm = () => {
  // State
  const [isPending, startTransition] = useTransition();

  // Form
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
  });

  // Submit Handler
  function handleSubmit(value: z.infer<typeof registerSchema>) {
    startTransition(() => {
      if (value.password !== value.confirmPassword) {
        toast.error('Password does not match');
        return;
      }
      register(value).then((data) => {
        if (data.error) {
          toast.error(data.error);
        } else {
          toast.success(data.success);
        }
      });
    });
  }

  return (
    <AuthCard
      title='Create an account'
      subtitle='Register to our membership'
      backButtonLabel='Already have an account? Sign in'
      backButtonHref='/auth/login'
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className='space-y-4 md:space-y-8'
        >
          {/* Name Field */}
          <FormField
            control={form.control}
            name='name'
            disabled={isPending}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder='Name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email Field */}
          <FormField
            control={form.control}
            name='email'
            disabled={isPending}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='123@example.com' {...field} />
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
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder='+628123456789' {...field} />
                </FormControl>
                <FormDescription>
                  Include country code (without whitespace)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password Field */}
          <FormField
            control={form.control}
            name='password'
            disabled={isPending}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type='password' placeholder='Password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm Password Field */}
          <FormField
            control={form.control}
            name='confirmPassword'
            disabled={isPending}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cofirm Password</FormLabel>
                <FormControl>
                  <Input type='password' placeholder='Password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Register Button */}
          <FormItem className='w-full flex items-center justify-center'>
            <Button type='submit' className='w-full'>
              Sign Up
            </Button>
          </FormItem>
        </form>
      </Form>
    </AuthCard>
  );
};
