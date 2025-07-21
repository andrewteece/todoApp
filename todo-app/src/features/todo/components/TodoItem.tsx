import type { Todo } from '@/features/todo/context/useTodoReducer';
import { useTodoContext } from '@/features/todo/context/useTodoContext';
import { Check } from 'lucide-react';

export function TodoItem({ todo }: { todo: Todo }) {
  const { dispatch } = useTodoContext();

  return (
    <li className='flex items-center justify-between px-4 py-3 bg-light-bg dark:bg-dark-desaturatedBlue border-b border-light-lightGrayishBlue dark:border-dark-veryDarkGrayishBlue1'>
      <label className='flex items-center gap-4 w-full cursor-pointer'>
        {/* Custom checkbox */}
        <div
          onClick={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all
            ${
              todo.completed
                ? 'bg-gradient-to-br from-[#57ddff] to-[#c058f3] border-none'
                : 'border-light-darkGrayishBlue dark:border-dark-darkGrayishBlue hover:border-primary'
            }`}
        >
          {todo.completed && <Check className='w-3 h-3 text-white' />}
        </div>

        {/* Todo text */}
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
    </li>
  );
}
