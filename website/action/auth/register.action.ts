'use server';

import { registerSchema } from '@/schema';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { Role } from '@prisma/client';
import { getUserByEmail } from '@/data/user';

export const register = async (value: z.infer<typeof registerSchema>) => {
  try {
    // Validate fields
    const validatedFields = registerSchema.safeParse(value);
    if (!validatedFields.success) {
      return { error: 'Invalid fields' };
    }

    const { name, email, phone, password } = validatedFields.data;

    // Check if email already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return { error: 'Email already registered' };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user to database
    await db.user.create({
      data: {
        name,
        email,
        phone,
        password: hashedPassword,
        role: Role.USER,
      },
    });

    return { success: 'Register successful' };
  } catch (error) {
    return { error: 'Error registering' };
  }
};
