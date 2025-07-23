'use client';

import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className='absolute top-6 right-6 sm:top-10 sm:right-10 text-white dark:text-gray-300 hover:opacity-80 transition'
      aria-label='Toggle theme'
    >
      {theme === 'dark' ? (
        <Sun className='w-5 h-5' />
      ) : (
        <Moon className='w-5 h-5' />
      )}
    </button>
  );
}
