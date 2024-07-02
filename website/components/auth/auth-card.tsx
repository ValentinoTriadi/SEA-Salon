import { cn } from '@/lib/utils'
import { Separator } from '../ui/separator'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import { Button } from '../ui/button'
import Link from 'next/link'

interface AuthCardProps {
  children: React.ReactNode
  title: string
  subtitle?: string
  backButtonLabel: string
  backButtonHref: string
}

export const AuthCard = ({
  children,
  title,
  subtitle,
  backButtonLabel,
  backButtonHref,
}: AuthCardProps) => {
  return (
    <Card className='min-w-[95%] sm:min-w-[90%] md:min-w-[80%] lg:min-w-[50%] xl:min-w-[40%] w-fit'>
      <CardHeader>
        <h1 className='text-3xl md:text-4xl font-semibold'>{title}</h1>
        {subtitle && (
          <p className={cn('mt-2 text-sm text-accent-foreground')}>
            {subtitle}
          </p>
        )}
        <Separator className='my-6 bg-accent h-1 rounded-xl' />
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter className='w-full flex items-center justify-center'>
        <Button variant='link' size='sm'>
          <Link href={backButtonHref}>{backButtonLabel}</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
