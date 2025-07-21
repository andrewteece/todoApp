import { useReducer, useEffect } from 'react';
import { TodoContext } from './TodoContext';
import { todoReducer, initialState, type State } from './useTodoReducer';

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  // Load from localStorage on init
  const [state, dispatch] = useReducer(todoReducer, initialState, () => {
    const saved = localStorage.getItem('todos');
    try {
      const parsed = saved ? JSON.parse(saved) : null;
      return parsed && parsed.todos ? parsed : initialState;
    } catch {
      return initialState;
    }
  });

  // ✅ Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state));
  }, [state]);

  const clearCompleted = () => {
    dispatch({ type: 'CLEAR_COMPLETED' });
  };

  return (
    <TodoContext.Provider value={{ state, dispatch, clearCompleted }}>
      {children}
    </TodoContext.Provider>
  );
};
