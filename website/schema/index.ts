import { Service } from '@prisma/client';
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
});

export const registerSchema = z.object({
  name: z.string().min(1, { message: 'Last name is required' }),
  email: z.string().email(),
  phone: z
    .string()
    .min(10, { message: 'Phone number is not valid' })
    .regex(/^\+?\d+$/, 'Phone number is not valid'),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
  confirmPassword: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
});

export const reservationSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  phone: z
    .string()
    .min(10, { message: 'Phone number is not valid' })
    .regex(/^\+?\d+$/, 'Phone number is not valid'),
  service: z.enum([
    Service.FACIAL_TREATMENTS,
    Service.HAIRCUTS_AND_STYLING,
    Service.MANICURE_AND_PEDICURE,
  ]),
  startSession: z
    .date()
    .refine((date) => date > new Date(), {
      message: 'Date must be in the future',
    })
    .refine((date) => date.getHours() >= 9 && date.getHours() <= 21, {
      message: 'We are open from 9 am to 9 pm',
    }),
});

export const reviewSchema = z.object({
  name: z.string(),
  rating: z.string().refine((value) => {
    const intValue = parseInt(value);
    return intValue >= 1 && intValue <= 5;
  }, ''),
  comment: z.string().max(500),
});
