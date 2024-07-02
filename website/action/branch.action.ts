'use server';

import { db } from '@/lib/db';
import { branchSchema } from '@/schema';
import { z } from 'zod';

export const getBranchList = async () => {
  const result = await db.branch.findMany();
  const parsedResult = result.map((branch) => ({
    ...branch,
    opening: `${Math.floor(branch.opening / 60)
      .toString()
      .padStart(2, '0')}:${(branch.opening % 60).toString().padStart(2, '0')}`,
    closing: `${Math.floor(branch.closing / 60)
      .toString()
      .padStart(2, '0')}:${(branch.closing % 60).toString().padStart(2, '0')}`,
  }));
  return parsedResult;
};

export const postBranch = async (data: z.infer<typeof branchSchema>) => {
  try {
    const validatedFields = branchSchema.safeParse(data);
    if (!validatedFields.success) return { error: 'Invalid data' };

    const { name, location, opening, closing } = validatedFields.data;

    const openingInMinutes =
      parseInt(opening.split(':')[0]) * 60 + parseInt(opening.split(':')[1]);
    const closingInMinutes =
      parseInt(closing.split(':')[0]) * 60 + parseInt(closing.split(':')[1]);
    if (openingInMinutes >= closingInMinutes)
      return { error: 'Invalid opening and closing time' };

    // Create branch
    const res = await db.branch.create({
      data: {
        name,
        location,
        opening: openingInMinutes,
        closing: closingInMinutes,
        Service: {
          create: [],
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
