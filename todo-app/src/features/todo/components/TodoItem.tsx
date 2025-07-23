import { useTodoContext } from '@/features/todo/context/useTodoContext';
import type { Todo } from '@/features/todo/types';
import { Check } from 'lucide-react';
import clsx from 'clsx';
import type { HTMLAttributes } from 'react';

interface TodoItemProps {
  todo: Todo;
  dragHandleProps?: HTMLAttributes<HTMLElement>;
}

export function TodoItem({ todo, dragHandleProps }: TodoItemProps) {
  const { dispatch } = useTodoContext();

  const toggleComplete = () => {
    dispatch({ type: 'TOGGLE_TODO', payload: todo.id });
  };

  const deleteTodo = () => {
    dispatch({ type: 'DELETE_TODO', payload: todo.id });
  };

  return (
    <li className='flex items-center justify-between px-5 py-4 border-b border-light-gray dark:border-dark-border bg-inherit text-base'>
      <div className='flex items-center gap-4 w-full'>
        {/* Drag handle */}
        <span
          {...dragHandleProps}
          className='cursor-grab select-none text-muted-foreground'
          aria-label='Drag handle'
        >
          ☰
        </span>

        {/* Toggle checkbox */}
        <button
          onClick={toggleComplete}
          className={clsx(
            'w-5 h-5 rounded-full flex items-center justify-center transition border',
            todo.completed
              ? 'bg-gradient-to-br from-primary to-accent text-white border-none'
              : 'border-gray-300 hover:border-primary'
          )}
          aria-label='Toggle complete'
        >
          {todo.completed && <Check className='w-4 h-4 stroke-[3]' />}
        </button>

        {/* Title */}
        <span
          className={clsx(
            'text-base break-words transition line-clamp-2 flex-1',
            todo.completed && 'line-through text-muted-foreground'
          )}
        >
          {todo.title}
        </span>
      </div>

      {/* Delete button */}
      <button
        onClick={deleteTodo}
        aria-label='Delete todo'
        className='text-muted-foreground hover:text-destructive transition ml-4'
      >
        ✕
      </button>
    </li>
  );
}
