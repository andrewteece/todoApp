import { useState, useRef, useEffect } from 'react';
import { useTodoContext } from '@/features/todo/context/useTodoContext';
import type { Todo } from '@/features/todo/types';
import { Check } from 'lucide-react';
import clsx from 'clsx';
import type { HTMLAttributes } from 'react';
import { motion } from 'framer-motion';

interface TodoItemProps {
  todo: Todo;
  dragHandleProps?: HTMLAttributes<HTMLElement>;
}

export function TodoItem({ todo, dragHandleProps }: TodoItemProps) {
  const { dispatch } = useTodoContext();
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(todo.title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) inputRef.current?.focus();
  }, [isEditing]);

  useEffect(() => {
    setText(todo.title); // keep text in sync if external change
  }, [todo.title]);

  const toggleComplete = () => {
    dispatch({ type: 'TOGGLE_TODO', payload: todo.id });
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

  return (
    <motion.li
      className='flex items-center justify-between px-5 py-4 border-b border-light-gray dark:border-dark-border bg-inherit text-base'
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
    >
      <div className='flex items-center gap-4 w-full relative'>
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

        {/* Title or input */}
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
              {todo.title}
            </span>
          )}
        </div>
      </div>

      {/* Delete button */}
      {!isEditing && (
        <button
          onClick={deleteTodo}
          aria-label='Delete todo'
          className='text-muted-foreground hover:text-destructive transition ml-4'
        >
          ✕
        </button>
      )}
    </motion.li>
  );
}
