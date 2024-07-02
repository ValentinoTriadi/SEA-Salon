'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import {
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from './ui/dropdown-menu';
import SignOut from '@/action/auth/signout.action';
import { useRouter } from 'next/navigation';

interface NavbarProps {
  isLogin: boolean;
}

export const Navbar = ({ isLogin }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  const menuItems = [
    {
      title: 'Services',
      link: '/#services',
    },
    {
      title: 'Reservation',
      link: '/reservation',
    },
    {
      title: 'Review',
      link: '/review',
    },
    {
      title: 'Contact',
      link: '/#contact',
    },
  ];

  // Push menu items
  function pushMenu(isLogin: boolean) {
    if (isLogin) {
      menuItems.push({
        title: 'Dashboard',
        link: '/dashboard',
      });
    } else {
      menuItems.push(
        {
          title: 'Login',
          link: '/auth/login',
        },
        {
          title: 'Register',
          link: '/auth/register',
        },
      );
    }
    return true;
  }

  // Handle Scroll Navbar Style
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY >= 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={`flex fixed top-0 w-dvw justify-between items-center drop-shadow-xl md:px-10 px-4 py-2 ${scrolled ? 'bg-secondary' : 'bg-gray-950 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20'}`}
    >
      {/* Left */}
      <div className='flex justify-center items-center'>
        <a href='/#home' className='flex gap-2 items-center'>
          <Image src='/logo.svg' width={20} height={20} alt='logo' />
          <h1 className='hidden md:flex text-foreground font-bold text-xl'>
            SEA Salon
          </h1>
        </a>
      </div>

      {/* Right */}
      {/* menu large */}
      <div className='hidden lg:flex justify-end items-center'>
        <ul className='flex gap-4'>
          {/* Push Menu and Map */}
          {pushMenu(isLogin) &&
            menuItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.link}
                  className='text-primary-foreground hover:text-accent'
                >
                  {item.title}
                </a>
              </li>
            ))}

          {/* Aditional Log Out */}
          {isLogin && (
            <li>
              <form
                action={async () => {
                  await SignOut();
                  router.push('/');
                }}
              >
                <button type='submit' className='text-primary-foreground hover:text-accent'>
                  Sign out
                </button>
              </form>
            </li>
          )}
        </ul>
      </div>

      {/* menu burger */}
      <div className='flex lg:hidden justify-end items-center'>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Image src={'/menu.svg'} width={25} height={25} alt='menu' />
          </DropdownMenuTrigger>
          <DropdownMenuContent className='mx-2'>
            {/* Push Menu and Map */}
            {menuItems.map((item, index) => (
              <DropdownMenuItem
                key={index}
                onSelect={() => (window.location.href = item.link)}
              >
                <p className='text-primary-foreground'>{item.title}</p>
              </DropdownMenuItem>
            ))}

            {/* Aditional Log Out */}
            {isLogin && (
              <DropdownMenuItem onSelect={() => SignOut()}>
                {isLogin && (
                  <form
                    action={async () => {
                      await SignOut();
                      router.push('/');
                    }}
                  >
                    <button type='submit' className='text-primary-foreground'>
                      Sign out
                    </button>
                  </form>
                )}
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};
