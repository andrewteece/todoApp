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
    return <div className='relative h-[200px] sm:h-[300px] bg-light-header' />;

  return (
    <header className='relative h-[200px] sm:h-[300px] overflow-hidden'>
      {/* Background Crossfade */}
      <AnimatePresence mode='wait'>
        <motion.div
          key={isDark ? 'dark' : 'light'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
          className={`absolute inset-0 bg-cover bg-no-repeat bg-top ${
            isDark ? 'bg-header-dark' : 'bg-header-light'
          }`}
        />
      </AnimatePresence>

      {/* Header Content */}
      <div className='relative z-10 flex items-center justify-between max-w-xl mx-auto px-4 pt-12 sm:pt-16 text-white'>
        <h1 className='text-3xl tracking-[0.35em] font-bold uppercase'>Todo</h1>
        <ThemeToggle />
      </div>
    </header>
  );
}
