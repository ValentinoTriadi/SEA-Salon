'use client'

import { useRouter } from 'next/navigation'

interface LoginButtonProps {
  children: React.ReactNode
  mode?: 'modal' | 'redirect'
  asChild?: boolean
}

export const LoginButton = ({
  children,
  mode = 'redirect',
  asChild,
}: LoginButtonProps) => {
  const router = useRouter()

  // Click Handler
  const handleRedirectClick = () => {
    console.log('Login Button Clicked')
    router.push('/auth/login')
  }

  if (mode === 'modal') {
    // Modal Click Handler
    const handleModalClick = () => {
      console.log('Login Button Clicked')
    }

    return (
      <span onClick={handleModalClick} className='cursor-pointer'>
        {children}
      </span>
    )
  }

  return (
    <span onClick={handleRedirectClick} className='cursor-pointer'>
      {children}
    </span>
  )
}
