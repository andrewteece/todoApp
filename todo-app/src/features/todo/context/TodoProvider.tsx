import { useReducer, useEffect } from 'react';
import { TodoContext } from '@/features/todo/context/TodoContext';
import { todoReducer, initialState } from './useTodoReducer';

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  // Load from localStorage on init
  const [state, dispatch] = useReducer(todoReducer, initialState, () => {
    try {
      const saved = localStorage.getItem('todos');
      const parsed = saved ? JSON.parse(saved) : null;
      if (
        parsed &&
        typeof parsed === 'object' &&
        Array.isArray(parsed.todos) &&
        parsed.todos.every(
          (t) => typeof t === 'object' && 'id' in t && 'title' in t
        )
      ) {
        return parsed;
      }
    } catch (err) {
      console.error('Error parsing saved todos:', err);
    }
    return initialState;
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state));
  }, [state]);

  const clearCompleted = () => {
    dispatch({ type: 'CLEAR_COMPLETED' });
  };

  console.log('Provider state:', state);

  return (
    <TodoContext.Provider value={{ state, dispatch, clearCompleted }}>
      {children}
    </TodoContext.Provider>
  );
};
