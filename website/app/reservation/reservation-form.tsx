"use client";

import { zodResolver } from '@hookform/resolvers/zod'
import { Service } from '@prisma/client'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { TimePicker12Demo } from '@/components/ui/time-picker';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from '@radix-ui/react-icons';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { useState, useTransition } from 'react';
import { postReservation } from '@/action/reservation.action';
import { useToast } from '@/components/ui/use-toast';

// form schema
export const reservationSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  phone: z.string().min(10, {message: "Phone number is not valid"}).regex(/^\+?\d+$/, "Phone number is not valid"),
  service: z.enum([Service.FACIAL_TREATMENTS, Service.HAIRCUTS_AND_STYLING, Service.MANICURE_AND_PEDICURE]),
  startSession: z.date().refine((date) => date > new Date(), { message: "Date must be in the future" }).refine((date) => date.getHours() >= 9 && date.getHours() <= 21, { message: "We are open from 9 am to 9 pm" }),
})


// Reservation Form Component
export const ReservationForm = () => {

  // toast
  const { toast } = useToast();

  // state
  const [isLoading, setIsLoading] = useState(false)
  const [isPending, startTransition] = useTransition();

  // form
  const form = useForm({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      name: '',
      phone: '',
      service: Service.HAIRCUTS_AND_STYLING,
      startSession: new Date(),
    },
  })

  // submit handler
  function onSubmit (value : z.infer<typeof reservationSchema>) {
    setIsLoading(true);
    startTransition(() => {
      postReservation(value).then(() => {
        form.reset();
        setIsLoading(false);
        toast({
          title: "Reservation booked",
          description: "We will contact you soon",
        })
      })
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        
        {/* Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" disabled={isLoading} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone Field */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="+628123456789" disabled={isLoading} {...field} />
              </FormControl>
              <FormDescription>Include country code (without whitespace)</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Service Field */}
        <FormField
          control={form.control}
          name="service"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select our Service" className='text-muted-foreground' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(Service).map((s, index) => (
                    <SelectItem value={s} key={index}>
                      {s.replaceAll("_", " ").toLowerCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Start Session Field */}
        <FormField
          control={form.control}
          name="startSession"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date and Time</FormLabel>
              <Popover>
                <PopoverTrigger asChild disabled={isLoading}>
                  <FormControl>
                    <Button
                      className={cn(
                        "min-w-[240px] w-fit pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP hh:mm a")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-10 h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                  <div className="p-3 flex items-center justify-center border-t border-accent">
                    <TimePicker12Demo
                      setDate={field.onChange}
                      date={field.value}
                    />
                  </div>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        

        <Button type="submit" disabled={isLoading}>Book</Button>
      </form>
    </Form>
  )
}