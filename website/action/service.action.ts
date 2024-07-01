"use server";

import { db } from '@/lib/db';
import { serviceSchema } from '@/schema';
import { z } from 'zod';

export const getServiceNameList = async () => {
  const services = await db.service.findMany({
    select: {
      name: true,
    },
  });
  return services.map((service) => service.name);
};

export const getServiceList = async () => {
  return await db.service.findMany();
};

export const getServiceIdByName = async (name: string) => {
  const service = await db.service.findFirst({
    where: {
      name,
    },
  });
  return service?.id;
};

export const getServiceDurationById = async (id: string) => {
  const service = await db.service.findFirst({
    where: {
      id,
    },
  });
  return service?.duration;
};

export const postService = async (value: z.infer<typeof serviceSchema>) => {
  try {
    const res = await db.service.create({
      data: value,
    });
    if (!res) return { error: 'Error creating service' };

    return { success: 'Service added', name: res.name, id: res.id };
  } catch (error) {
    return { error: 'Error creating service' };
  }
};

export const deleteService = async (id: string) => {
  try {
    const res = await db.service.delete({
      where: {
        id,
      },
    });
    if (!res) return { error: 'Error deleting service' };

    return { success: 'Service deleted' };
  } catch (error) {
    return { error: 'Error deleting service' };
  }
};
