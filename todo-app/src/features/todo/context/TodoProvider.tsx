import { useReducer } from 'react';
import { TodoContext } from './TodoContext';
import { todoReducer, initialState } from './useTodoReducer';

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const clearCompleted = () => {
    dispatch({ type: 'CLEAR_COMPLETED' });
  };

  return (
    <TodoContext.Provider value={{ state, dispatch, clearCompleted }}>
      {children}
    </TodoContext.Provider>
  );
};
