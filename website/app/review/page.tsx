'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { NextPage } from 'next';
import { ReviewForm } from './review-form';

interface Props {}

const Page: NextPage<Props> = () => {
  return (
    <div className='w-screen min-h-screen flex flex-col items-center justify-start p-5 md:p-24'>
      <Card className='w-fit min-w-[95%] sm:min-w-[90%] md:min-w-[80%] lg:min-w-[50%] xl:min-w-[40%] h-fit'>
        <CardHeader className='text-4xl text-bold'>
          <h1 className='text-3xl md:text-4xl font-semibold'>Review</h1>
          <p className='mt-2 text-sm text-accent-foreground'>Give us your feedback!</p>
          <Separator className='h-1 bg-accent' />
        </CardHeader>
        <CardContent className='text-xl'>
          <ReviewForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
