// src/features/todo/context/TodoContext.tsx
import { createContext } from 'react';
import { useTodoReducer } from './useTodoReducer';
import type { ReactNode } from 'react';

const TodoContext = createContext<ReturnType<typeof useTodoReducer> | null>(
  null
);

export { TodoContext };

export function TodoProvider({ children }: { children: ReactNode }) {
  const value = useTodoReducer();
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}
