import { useState } from 'react';
import { useTodoContext } from '@/features/todo/context/useTodoContext';
import { v4 as uuid } from 'uuid';

export function TodoInput() {
  const { dispatch } = useTodoContext();
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    dispatch({
      type: 'ADD_TODO',
      payload: {
        id: uuid(),
        title: trimmed,
        completed: false,
      },
    });

    setText('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='w-full px-5 py-4 border-b border-light-gray dark:border-dark-border bg-inherit'
    >
      <input
        type='text'
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder='Create a new todo...'
        className='w-full bg-transparent text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none'
      />
    </form>
  );
}
