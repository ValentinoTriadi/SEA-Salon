"use client";

import { NextPage } from 'next'
import { ReservationForm } from './reservation-form';

interface Props {}

const ReservationPage: NextPage<Props> = () => {
  return (
    <div className='w-full min-h-screen md:p-24 p-10 pt-24 flex items-start justify-center'>
      <div className='md:w-[80%] w-[95%] flex flex-col gap-10'>
        <h1 className='w-full text-4xl md:text-5xl font-bold'>Reserve Your Appointment!</h1>
        <ReservationForm />
      </div>
    </div>
  )
}

export default ReservationPage