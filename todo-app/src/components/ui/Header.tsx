'use client';

import { ThemeToggle } from '@/components/ThemeToggle';

export function Header() {
  return (
    <header className='relative h-[200px] sm:h-[300px] bg-header-light dark:bg-header-dark bg-cover bg-no-repeat bg-top'>
      <div className='flex items-center justify-between max-w-xl mx-auto px-4 pt-12 sm:pt-16 text-white'>
        <h1 className='text-3xl tracking-[0.35em] font-bold uppercase'>Todo</h1>
        <ThemeToggle />
      </div>
    </header>
  );
}
