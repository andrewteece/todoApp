import { useTodoContext } from '@/features/todo/context/useTodoContext';
import type { Todo } from '@/features/todo/types';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import clsx from 'clsx';

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
  const { dispatch } = useTodoContext();

  const toggleComplete = () => {
    dispatch({ type: 'TOGGLE_TODO', payload: { id: todo.id } });
  };

  const deleteTodo = () => {
    dispatch({ type: 'DELETE_TODO', payload: { id: todo.id } });
  };

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className='flex items-center justify-between px-5 py-4 border-b border-light-gray dark:border-dark-border text-base bg-inherit'
    >
      <div className='flex items-center gap-4'>
        {/* Custom Checkbox */}
        <button
          onClick={toggleComplete}
          className={clsx(
            'w-5 h-5 rounded-full flex items-center justify-center border transition-all',
            todo.completed
              ? 'bg-gradient-to-br from-primary to-accent text-white border-none'
              : 'border-gray-300 hover:border-primary'
          )}
          aria-label={
            todo.completed ? 'Mark as incomplete' : 'Mark as complete'
          }
        >
          {todo.completed && <Check className='w-4 h-4 stroke-[3]' />}
        </button>

        {/* Todo Text */}
        <span
          className={clsx(
            'text-left break-words transition line-clamp-2',
            todo.completed ? 'line-through text-muted-foreground' : ''
          )}
        >
          {todo.title}
        </span>
      </div>

      {/* Delete Button */}
      <button
        onClick={deleteTodo}
        aria-label='Delete todo'
        className='text-muted-foreground hover:text-destructive transition'
      >
        <img src='/images/icon-cross.svg' alt='Delete' className='w-3 h-3' />
      </button>
    </motion.li>
  );
}
