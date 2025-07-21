import type { Todo } from '@/features/todo/context/TodoContext';
import { useTodoContext } from '@/features/todo/context/TodoContext';
import { Trash2 } from 'lucide-react';

export function TodoItem({ todo }: { todo: Todo }) {
  const { dispatch } = useTodoContext();

  return (
    <li
      className='flex items-center justify-between bg-light-bg dark:bg-dark-desaturatedBlue 
        p-4 rounded shadow border-b border-light-lightGrayishBlue dark:border-dark-veryDarkGrayishBlue1'
    >
      <label className='flex items-center gap-3'>
        <input
          type='checkbox'
          checked={todo.completed}
          onChange={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}
          className='h-5 w-5 accent-primary rounded-full'
        />
        <span
          className={`text-light-veryDarkGrayishBlue dark:text-dark-lightGrayishBlue ${
            todo.completed ? 'line-through opacity-60' : ''
          }`}
        >
          {todo.text}
        </span>
      </label>

      <button
        onClick={() => dispatch({ type: 'DELETE_TODO', payload: todo.id })}
        aria-label='Delete todo'
        className='text-light-darkGrayishBlue dark:text-dark-darkGrayishBlue hover:text-red-500 transition'
      >
        <Trash2 className='w-4 h-4' />
      </button>
    </li>
  );
}
