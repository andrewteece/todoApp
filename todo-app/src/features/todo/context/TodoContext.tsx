import { createContext, useContext, useReducer } from 'react';
import type { ReactNode } from 'react';

export type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

type State = {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
};

type Action =
  | { type: 'ADD_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: string }
  | { type: 'DELETE_TODO'; payload: string }
  | { type: 'CLEAR_COMPLETED' }
  | { type: 'SET_FILTER'; payload: State['filter'] }
  | { type: 'REORDER_TODOS'; payload: Todo[] };

const initialState: State = {
  todos: [],
  filter: 'all',
};

function todoReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [
          ...state.todos,
          { id: crypto.randomUUID(), text: action.payload, completed: false },
        ],
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case 'CLEAR_COMPLETED':
      return {
        ...state,
        todos: state.todos.filter((todo) => !todo.completed),
      };
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload,
      };
    case 'REORDER_TODOS':
      return {
        ...state,
        todos: action.payload,
      };
    default:
      return state;
  }
}

const TodoContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export function TodoProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodoContext() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  return context;
}
