'use server';

import { db } from '@/lib/db';
import { branchSchema } from '@/schema';
import { z } from 'zod';
import { getServiceIdByName } from './service.action';

export const getBranchList = async () => {
  const result = await db.branch.findMany({
    include: {
      Service: true,
    },
  });
  const parsedResult = result.map((branch) => ({
    ...branch,
    opening: `${Math.floor(branch.opening / 60)
      .toString()
      .padStart(2, '0')}:${(branch.opening % 60).toString().padStart(2, '0')}`,
    closing: `${Math.floor(branch.closing / 60)
      .toString()
      .padStart(2, '0')}:${(branch.closing % 60).toString().padStart(2, '0')}`,
    Service: branch.Service.map((service) => service.name),
  }));
  console.log('PARSED RESULT', parsedResult);
  return parsedResult;
};

export const postBranch = async (data: z.infer<typeof branchSchema>) => {
  try {
    console.log('DATA', data);
    const validatedFields = branchSchema.safeParse(data);
    if (!validatedFields.success) return { error: 'Invalid data' };

    const { name, location, opening, closing, Service } = validatedFields.data;

    const openingInMinutes =
      parseInt(opening.split(':')[0]) * 60 + parseInt(opening.split(':')[1]);
    const closingInMinutes =
      parseInt(closing.split(':')[0]) * 60 + parseInt(closing.split(':')[1]);
    if (openingInMinutes >= closingInMinutes)
      return { error: 'Invalid opening and closing time' };

    const serviceId = await Promise.all(
      Service.map((serviceName) => getServiceIdByName(serviceName)),
    );

    // Create branch
    const res = await db.branch.create({
      data: {
        name,
        location,
        opening: openingInMinutes,
        closing: closingInMinutes,
        Service: {
          connect: serviceId.map((id) => ({ id })),
        },
      },
    });

    return {
      success: 'Branch created',
      id: res.id,
      name: res.name,
    };
  } catch (error) {
    return { error: 'Error creating branch' };
  }
};

export const deleteBranch = async (id: string) => {
  try {
    const res = await db.branch.delete({
      where: {
        id,
      },
    });
    if (!res) return { error: 'Error deleting branch' };

    return { success: 'Branch deleted' };
  } catch (error) {
    return { error: 'Error deleting branch' };
  }
};
