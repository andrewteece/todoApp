import { createContext } from 'react';
import type { Dispatch } from 'react';
import type { State, Action } from './useTodoReducer';

// Context type
export interface TodoContextType {
  state: State;
  dispatch: Dispatch<Action>;
  clearCompleted: () => void;
}

// Create context
export const TodoContext = createContext<TodoContextType | undefined>(
  undefined
);
