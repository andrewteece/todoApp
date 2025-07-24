'use client';

import { useState } from 'react';
import { useTodoContext } from '@/features/todo/context/useTodoContext';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export function TodoInput() {
  const [text, setText] = useState('');
  const { addTodo } = useTodoContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (trimmed) {
      addTodo(trimmed);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <motion.div className='bg-white dark:bg-very-dark-desaturated-blue rounded-md shadow-lg px-5 py-4 flex items-center gap-4 transition-colors'>
        {/* Custom Checkbox Placeholder */}
        <div className='w-5 h-5 border border-light-grayish-blue dark:border-dark-grayish-blue rounded-full shrink-0' />

        {/* Input Field */}
        <input
          type='text'
          placeholder='Create a new todo...'
          className={cn(
            'flex-1 bg-transparent text-sm outline-none',
            'text-very-dark-grayish-blue dark:text-light-grayish-blue',
            'placeholder:text-dark-grayish-blue dark:placeholder:text-dark-grayish-blue'
          )}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </motion.div>
    </form>
  );
}
