import { useState } from 'react';
import { useTodoContext } from '@/features/todo/context/TodoContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function TodoInput() {
  const [text, setText] = useState('');
  const { dispatch } = useTodoContext();

  const handleAddTodo = () => {
    const trimmed = text.trim();
    if (!trimmed) return;

    dispatch({ type: 'ADD_TODO', payload: trimmed });
    setText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleAddTodo();
  };

  return (
    <div className='flex items-center gap-2 bg-light-grayishBlue dark:bg-dark-desaturatedBlue p-4 rounded shadow-sm'>
      <div className='w-5 h-5 rounded-full border border-light-darkGrayishBlue dark:border-dark-darkGrayishBlue' />
      <Input
        placeholder='Create a new todo...'
        className='bg-transparent border-none focus:ring-0 focus-visible:ring-0 text-light-veryDarkGrayishBlue dark:text-dark-lightGrayishBlue'
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button
        onClick={handleAddTodo}
        className='hidden sm:inline-block'
        variant='ghost'
      >
        Add
      </Button>
    </div>
  );
}
