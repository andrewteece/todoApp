import { useContext } from 'react';
import { TodoContext } from './TodoContext';
import type { TodoContextType } from './TodoContext';

export function useTodoContext(): TodoContextType {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  return context;
}
