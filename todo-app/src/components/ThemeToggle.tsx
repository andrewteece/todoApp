'use client';

import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className='w-6 h-6 flex items-center justify-center text-white dark:text-gray-300 hover:opacity-80 transition'
      aria-label='Toggle theme'
    >
      <AnimatePresence mode='wait' initial={false}>
        <motion.span
          key={isDark ? 'sun' : 'moon'}
          initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {isDark ? <Sun className='w-8 h-8' /> : <Moon className='w-8 h-8' />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
