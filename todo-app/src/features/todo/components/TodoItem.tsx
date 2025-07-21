import type { Todo } from '@/features/todo/context/TodoContext';
import { useTodoContext } from '@/features/todo/context/TodoContext';
import { Trash2 } from 'lucide-react';

export function TodoItem({ todo }: { todo: Todo }) {
  const { dispatch } = useTodoContext();

  return (
    <li className='flex items-center justify-between px-4 py-3 bg-light-bg dark:bg-dark-desaturatedBlue border-b border-light-lightGrayishBlue dark:border-dark-veryDarkGrayishBlue1'>
      <label className='flex items-center gap-4 w-full cursor-pointer'>
        <input
          type='checkbox'
          checked={todo.completed}
          onChange={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}
          className='w-5 h-5 shrink-0 accent-primary cursor-pointer rounded-full'
        />
        <span
          className={`flex-1 text-base transition-opacity ${
            todo.completed
              ? 'line-through opacity-50 text-light-darkGrayishBlue dark:text-dark-darkGrayishBlue'
              : 'text-light-veryDarkGrayishBlue dark:text-dark-lightGrayishBlue'
          }`}
        >
          {todo.text}
        </span>
      </label>

      <button
        onClick={() => dispatch({ type: 'DELETE_TODO', payload: todo.id })}
        aria-label='Delete todo'
        className='ml-2 text-light-darkGrayishBlue dark:text-dark-darkGrayishBlue hover:text-red-500 transition'
      >
        <Trash2 className='w-4 h-4' />
      </button>
    </li>
  );
}
