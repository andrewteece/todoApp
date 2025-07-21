import { useEffect, useReducer } from 'react';

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

const LOCAL_STORAGE_KEY = 'todo-app-todos';

function init(): State {
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (stored) {
    try {
      return { todos: JSON.parse(stored), filter: 'all' };
    } catch {
      return { todos: [], filter: 'all' };
    }
  }
  return { todos: [], filter: 'all' };
}

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

export function useTodoReducer() {
  const [state, dispatch] = useReducer(todoReducer, undefined, init);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.todos));
  }, [state.todos]);

  return { state, dispatch };
}
