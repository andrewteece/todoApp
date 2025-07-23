import { useState } from 'react';
import { useTodoContext } from '@/features/todo/context/useTodoContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { v4 as uuidv4 } from 'uuid';

export function TodoInput() {
  const [text, setText] = useState('');
  const { dispatch } = useTodoContext();

  const handleAddTodo = () => {
    const trimmed = text.trim();
    if (!trimmed) return;

    dispatch({
      type: 'ADD_TODO',
      payload: {
        id: uuidv4(),
        title: trimmed,
        completed: false,
      },
    });
    setText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleAddTodo();
  };

  return (
    <div className='flex items-center gap-3 bg-light-bg dark:bg-dark-desaturatedBlue border border-light-lightGrayishBlue dark:border-dark-veryDarkGrayishBlue1 p-4 rounded-lg'>
      <div className='w-5 h-5 rounded-full border border-light-darkGrayishBlue dark:border-dark-darkGrayishBlue' />
      <Input
        value={text}
        placeholder='Create a new todo...'
        className='bg-transparent border border-light-lightGrayishBlue dark:border-dark-veryDarkGrayishBlue1 
             rounded-md text-light-veryDarkGrayishBlue dark:text-dark-lightGrayishBlue 
             placeholder:text-light-darkGrayishBlue dark:placeholder:text-dark-darkGrayishBlue
             focus:outline-none focus:ring-1 focus:ring-primary'
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
