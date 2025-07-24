import { createContext } from 'react';
import type { Dispatch } from 'react';
import type { State, Action } from './useTodoReducer';

// Context type
export interface TodoContextType {
  state: State;
  dispatch: Dispatch<Action>;
  addTodo: (title: string) => void;
  clearCompleted: () => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  setFilter: (filter: FilterType) => void;
}

// Create context
export const TodoContext = createContext<TodoContextType | undefined>(
  undefined
);
