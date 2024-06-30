'use client';

import { z } from 'zod';
import { AuthCard } from '@/components/auth/auth-card';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/schema';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { login } from '@/action/auth/login.action';
import { useTransition } from 'react';
import { toast } from 'sonner';

export const LoginForm = () => {
  // state
  const [isPending, startTransition] = useTransition();

  // Form
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Submit Handler
  function handleSubmit(value: z.infer<typeof loginSchema>) {
    startTransition(() => {
      login(value).then((data) => {
        if (data?.error) {
          toast.error(data.error);
        } else {
          toast.success('Login successful!');
        }
      });
    });
  }

  return (
    <AuthCard
      title='Welcome back!'
      subtitle='Sign in to your account to continue'
      backButtonLabel="Don't have an account?"
      backButtonHref='/auth/register'
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className='space-y-4 md:space-y-8'
        >
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

          {/* Login Button */}
          <FormItem className='w-full flex items-center justify-center'>
            <Button type='submit' className='w-full' disabled={isPending}>
              Sign In
            </Button>
          </FormItem>
        </form>
      </Form>
    </AuthCard>
  );
};
