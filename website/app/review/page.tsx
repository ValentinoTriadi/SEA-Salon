"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { NextPage } from 'next'
import { ReviewForm } from './review-form';

interface Props {}

const Page: NextPage<Props> = () => {
  return (
    <div className='w-screen min-h-screen flex flex-col items-center justify-start p-5 md:p-24'>
      <Card className='w-fit min-w-[50%] h-fit p-2'>
        <CardHeader className='text-4xl text-bold'>
          <CardTitle>Review</CardTitle>
          <Separator className='h-1 bg-accent' />
        </CardHeader>
        <CardContent className='text-xl'>
         <ReviewForm />
        </CardContent>
      </Card>
    </div>
  )
}

export default Page