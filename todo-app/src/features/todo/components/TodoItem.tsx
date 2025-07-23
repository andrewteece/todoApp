import { useState, useRef, useEffect } from 'react';
import { useTodoContext } from '@/features/todo/context/useTodoContext';
import type { Todo } from '@/features/todo/types';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import clsx from 'clsx';

console.log('🧩 THIS IS THE ACTIVE TodoItem FILE');

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
  const { dispatch } = useTodoContext();
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(todo.title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) inputRef.current?.focus();
  }, [isEditing]);

  useEffect(() => {
    setText(todo.title);
  }, [todo.title]);

  const toggleComplete = () => {
    console.log('🟡 dispatching TOGGLE_TODO with:', todo.id);
    try {
      dispatch({ type: 'TOGGLE_TODO', payload: todo.id });
    } catch (err) {
      console.error('🔥 dispatch failed:', err);
    }
  };

  const deleteTodo = () => {
    dispatch({ type: 'DELETE_TODO', payload: todo.id });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleEditSubmit = () => {
    const trimmed = text.trim();
    if (trimmed && trimmed !== todo.title) {
      dispatch({ type: 'EDIT_TODO', payload: { id: todo.id, title: trimmed } });
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleEditSubmit();
    if (e.key === 'Escape') {
      setText(todo.title);
      setIsEditing(false);
    }
  };
  console.log('Render:', todo.title, 'Completed:', todo.completed);

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className='group flex justify-between items-center px-5 py-4 border-b border-light-gray dark:border-dark-border bg-inherit text-base'
    >
      <div className='flex items-center gap-4 w-full relative'>
        <button
          onClick={() => {
            console.log('✅ button clicked');
            dispatch({ type: 'TOGGLE_TODO', payload: todo.id });
          }}
          style={{ background: 'yellow', padding: '8px' }}
        >
          Toggle
        </button>

        <div className='flex-1 min-w-0'>
          {isEditing ? (
            <input
              ref={inputRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              onBlur={handleEditSubmit}
              onKeyDown={handleKeyDown}
              className='w-full bg-transparent focus:outline-none border-b border-muted focus:border-primary text-base placeholder:text-muted-foreground transition py-0.5'
            />
          ) : (
            <span
              onDoubleClick={handleEdit}
              className={clsx(
                'block break-words transition line-clamp-2 cursor-text',
                todo.completed && 'line-through text-muted-foreground'
              )}
            >
              {text}
            </span>
          )}
        </div>
      </div>

      {!isEditing && (
        <button
          onClick={deleteTodo}
          aria-label='Delete todo'
          className='text-muted-foreground hover:text-destructive transition ml-4 z-10'
        >
          <img src='/images/icon-cross.svg' alt='Delete' className='w-3 h-3' />
        </button>
      )}
    </motion.li>
  );
}
