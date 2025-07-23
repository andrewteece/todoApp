// src/components/AddTodo.tsx
import { useState } from 'react';
import { useTodoContext } from '../context/useTodoContext';

import { v4 as uuidv4 } from 'uuid';

export default function AddTodo() {
  const [title, setTitle] = useState('');
  const { dispatch } = useTodoContext();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;

    dispatch({
      type: 'ADD_TODO',
      payload: {
        id: uuidv4(),
        title: trimmed,
        completed: false,
      },
    });

    setTitle('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex items-center gap-2 p-4 border-b dark:border-neutral-700'
    >
      <input
        type='text'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder='Create a new todo...'
        className='flex-1 bg-transparent outline-none text-lg dark:text-white placeholder:text-neutral-400'
      />
      <button
        type='submit'
        className='px-4 py-2 text-sm font-semibold rounded bg-blue-600 text-white hover:bg-blue-700 transition'
      >
        Add
      </button>
    </form>
  );
}
