import { useState, useRef, useEffect } from 'react';
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
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(todo.title);
  const inputRef = useRef<HTMLInputElement>(null);

  // Autofocus input when entering edit mode
  useEffect(() => {
    if (isEditing) inputRef.current?.focus();
  }, [isEditing]);

  const toggleComplete = () => {
    dispatch({ type: 'TOGGLE_TODO', payload: { id: todo.id } });
  };

  const deleteTodo = () => {
    dispatch({ type: 'DELETE_TODO', payload: { id: todo.id } });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleEditSubmit = () => {
    if (text.trim() && text !== todo.title) {
      dispatch({
        type: 'EDIT_TODO',
        payload: { id: todo.id, title: text.trim() },
      });
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEditSubmit();
    } else if (e.key === 'Escape') {
      setText(todo.title);
      setIsEditing(false);
    }
  };

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className='flex items-center justify-between px-5 py-4 border-b border-light-gray dark:border-dark-border text-base bg-inherit'
    >
      <div className='flex items-center gap-4 w-full'>
        {/* Checkbox */}
        <button
          onClick={toggleComplete}
          className={clsx(
            'w-5 h-5 rounded-full flex items-center justify-center border transition',
            todo.completed
              ? 'bg-gradient-to-br from-primary to-accent text-white border-none'
              : 'border-gray-300 hover:border-primary'
          )}
          aria-label='Toggle complete'
        >
          {todo.completed && <Check className='w-4 h-4 stroke-[3]' />}
        </button>

        {/* Editable Text */}
        {isEditing ? (
          <input
            ref={inputRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={handleEditSubmit}
            onKeyDown={handleKeyDown}
            className='flex-1 bg-transparent focus:outline-none border-b border-muted focus:border-primary text-base placeholder:text-muted-foreground transition py-0.5'
          />
        ) : (
          <span
            onDoubleClick={handleEdit}
            className={clsx(
              'flex-1 break-words  transition line-clamp-2 cursor-text',
              todo.completed ? 'line-through text-muted-foreground' : ''
            )}
          >
            {todo.title}
          </span>
        )}
      </div>

      {/* Delete Button */}
      {!isEditing && (
        <button
          onClick={deleteTodo}
          aria-label='Delete todo'
          className='text-muted-foreground hover:text-destructive transition ml-4'
        >
          <img src='/images/icon-cross.svg' alt='Delete' className='w-3 h-3' />
        </button>
      )}
    </motion.li>
  );
}
