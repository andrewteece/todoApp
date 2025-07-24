'use client';

import { ThemeToggle } from '@/components/ThemeToggle';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isDark = theme === 'dark';

  useEffect(() => setMounted(true), []);

  if (!mounted)
    return <div className='relative py-16 sm:py-24 bg-light-header' />;

  return (
    <header className='relative w-full overflow-hidden py-24 sm:py-32'>
      <AnimatePresence mode='wait'>
        <motion.div
          key={isDark ? 'dark' : 'light'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className={`absolute top-0 left-0 w-full h-full bg-cover bg-no-repeat bg-top ${
            isDark ? 'bg-header-dark' : 'bg-header-light'
          }`}
        />
      </AnimatePresence>

      <div className='absolute inset-0 bg-gradient-to-b from-black/30 to-transparent z-[1]' />

      <div className='relative z-10 flex items-center justify-between max-w-xl  px-8 mb-6'>
        <h1 className='text-3xl tracking-[0.50em] font-bold uppercase text-white'>
          Todo
        </h1>
        <ThemeToggle />
      </div>
    </header>
  );
}
