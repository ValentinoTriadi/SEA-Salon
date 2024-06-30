'use server';

import { loginSchema } from '@/schema';
import { signIn } from '@/auth';
import { z } from 'zod';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { getUserByEmail } from '@/data/user';
import { AuthError } from 'next-auth';

export const login = async (value: z.infer<typeof loginSchema>) => {
  // Validate fields
  const validatedFields = loginSchema.safeParse(value);
  if (!validatedFields.success) return { error: 'Invalid fields' };

  const { email, password } = validatedFields.data;

  // Check if email exists
  const user = await getUserByEmail(email);
  if (!user) return { error: 'Email does not exists!' };

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      console.log('\n\nAuthError', error.type, '\n\n');
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials!' };
        default:
          return { error: 'Something went wrong!' };
      }
    }

    throw error;
  }
};
