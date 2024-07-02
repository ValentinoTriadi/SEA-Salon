'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { StarIcon } from '@/components/icon/StarIcon'
import Link from 'next/link'
import { toast } from 'sonner'
import { useTransition } from 'react'
import { postReview } from '@/action/review.action'
import { reviewSchema } from '@/schema'

export const ReviewForm = () => {
  // transition handler
  const [isPending, startTransition] = useTransition()

  // form
  const form = useForm({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      name: '',
      rating: '0',
      comment: '',
    },
  })

  // rating change value handler
  function ratingHandler(value: string) {
    const rate = parseInt(value)
    for (let i = 1; i <= 5; i++) {
      const star = document.getElementById(`star-${i}`)
      if (star) {
        if (i <= rate) {
          star.classList.add('fill-accent')
          star.classList.add('active')
          star.classList.add('stroke-accent')
        } else {
          star.classList.remove('fill-accent')
          star.classList.remove('active')
          star.classList.remove('stroke-accent')
        }
      }
    }
  }

  // rating hover in handler
  function ratingHoverInHandler(value: string) {
    const rate = parseInt(value)
    for (let i = 1; i <= 5; i++) {
      const star = document.getElementById(`star-${i}`)
      if (star && !star.classList.contains('active')) {
        if (i <= rate) {
          // star.classList.add('fill-accent')
          star.classList.add('stroke-accent')
        } else {
          // star.classList.remove('fill-accent')
          star.classList.remove('stroke-accent')
        }
      }
    }
  }

  // rating hover out handler
  function ratingHoverOutHandler(value: string) {
    const rate = parseInt(value)
    for (let i = 1; i <= 5; i++) {
      const star = document.getElementById(`star-${i}`)
      if (star && !star.classList.contains('active')) {
        if (i <= rate) {
          // star.classList.remove('fill-accent')
          star.classList.remove('stroke-accent')
        } else {
          // star.classList.remove('fill-accent')
          star.classList.remove('stroke-accent')
        }
      }
    }
  }

  // submit handler
  function onSubmit(values: z.infer<typeof reviewSchema>) {
    startTransition(() => {
      postReview(values).then((data) => {
        if (data?.error) {
          toast.error(data.error)
        } else {
          toast.success('Thank you for your review!', {
            description: `Rating: ${data.success}/5`,
          })
        }
      })
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-2 flex flex-col items-center'
      >
        {/* Name Field */}
        <FormField
          control={form.control}
          name='name'
          disabled={isPending}
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='Name' {...field} />
              </FormControl>
              <FormDescription>
                Left it empty for anonymous review.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Comment Field */}
        <FormField
          control={form.control}
          name='comment'
          disabled={isPending}
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Comment</FormLabel>
              <FormControl>
                <Input placeholder='Great product!' {...field} />
              </FormControl>
              <FormDescription>
                Share your thoughts about the product.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Rating Field */}
        <FormField
          control={form.control}
          name='rating'
          disabled={isPending}
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => {
                    field.onChange(value)
                    ratingHandler(value)
                  }}
                  defaultValue={'0'}
                  className='flex items-center justify-center space-x-4'
                >
                  <FormItem className='flex items-center justify-center py-8'>
                    <FormControl>
                      <RadioGroupItem
                        value='1'
                        id='rating-1'
                        className='peer sr-only'
                      />
                    </FormControl>
                    <FormLabel
                      htmlFor='rating-1'
                      className='cursor-pointer'
                      title='1 stars'
                      onMouseEnter={() => ratingHoverInHandler('1')}
                      onMouseLeave={() => ratingHoverOutHandler('1')}
                    >
                      <StarIcon
                        className='h-10 w-10 hover:stroke-accent'
                        id='star-1'
                      />
                    </FormLabel>
                  </FormItem>

                  <FormItem className='flex items-center justify-center py-8'>
                    <FormControl>
                      <RadioGroupItem
                        value='2'
                        id='rating-2'
                        className='peer sr-only'
                      />
                    </FormControl>
                    <FormLabel
                      htmlFor='rating-2'
                      className='cursor-pointer'
                      title='2 stars'
                      onMouseEnter={() => ratingHoverInHandler('2')}
                      onMouseLeave={() => ratingHoverOutHandler('2')}
                    >
                      <StarIcon
                        className='h-10 w-10 hover:stroke-accent'
                        id='star-2'
                      />
                    </FormLabel>
                  </FormItem>

                  <FormItem className='flex items-center justify-center py-8'>
                    <FormControl>
                      <RadioGroupItem
                        value='3'
                        id='rating-3'
                        className='peer sr-only'
                      />
                    </FormControl>
                    <FormLabel
                      htmlFor='rating-3'
                      className='cursor-pointer'
                      title='3 stars'
                      onMouseEnter={() => ratingHoverInHandler('3')}
                      onMouseLeave={() => ratingHoverOutHandler('3')}
                    >
                      <StarIcon
                        className='h-10 w-10 hover:stroke-accent'
                        id='star-3'
                      />
                    </FormLabel>
                  </FormItem>

                  <FormItem className='flex items-center justify-center py-8'>
                    <FormControl>
                      <RadioGroupItem
                        value='4'
                        id='rating-4'
                        className='peer sr-only'
                      />
                    </FormControl>
                    <FormLabel
                      htmlFor='rating-4'
                      className='cursor-pointer'
                      title='4 stars'
                      onMouseEnter={() => ratingHoverInHandler('4')}
                      onMouseLeave={() => ratingHoverOutHandler('4')}
                    >
                      <StarIcon
                        className='h-10 w-10 hover:stroke-accent'
                        id='star-4'
                      />
                    </FormLabel>
                  </FormItem>

                  <FormItem className='flex items-center justify-center py-8'>
                    <FormControl>
                      <RadioGroupItem
                        value='5'
                        id='rating-5'
                        className='peer sr-only'
                      />
                    </FormControl>
                    <FormLabel
                      htmlFor='rating-5'
                      className='cursor-pointer'
                      title='5 stars'
                      onMouseEnter={() => ratingHoverInHandler('5')}
                      onMouseLeave={() => ratingHoverOutHandler('5')}
                    >
                      <StarIcon
                        className='h-10 w-10 hover:stroke-accent'
                        id='star-5'
                      />
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type='submit' className='w-1/3' disabled={isPending}>
          Submit
        </Button>

        {/* Back to Home */}
        <div className='flex gap-1 md:gap-2 mt-0'>
          <p className='text-xs'>Done Reviewing?</p>
          <Link
            href='/'
            className='text-xs text-accent-foreground hover:text-accent'
          >
            Back to Home
          </Link>
        </div>
      </form>
    </Form>
  )
}
