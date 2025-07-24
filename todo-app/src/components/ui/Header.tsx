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
    return <div className='relative h-[260px] sm:h-[350px] bg-light-header' />;

  return (
    <header className='relative w-full h-[260px] sm:h-[350px] pt-16 sm:pt-8 overflow-hidden z-0'>
      {/* Background Image */}
      <AnimatePresence mode='wait'>
        <motion.div
          key={isDark ? 'dark' : 'light'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className={`absolute inset-0 h-full w-full bg-cover bg-no-repeat bg-top z-0 pointer-events-none ${
            isDark ? 'bg-header-dark' : 'bg-header-light'
          }`}
        />
      </AnimatePresence>

      {/* Optional overlay gradient */}
      <div className='absolute inset-0 bg-gradient-to-b from-black/30 to-transparent z-[1]' />

      {/* Header content */}
      <div className='relative z-10 flex items-center justify-between max-w-xl mx-auto px-8 -mt-2'>
        <h1 className='text-3xl tracking-[0.50em] font-bold uppercase text-white'>
          Todo
        </h1>
        <ThemeToggle />
      </div>
    </header>
  );
}
