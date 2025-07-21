export type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

export type FilterType = 'all' | 'active' | 'completed';

export type State = {
  todos: Todo[];
  filter: FilterType;
};

export type Action =
  | { type: 'ADD_TODO'; payload: string }
  | { type: 'EDIT_TODO'; payload: { id: string; title: string } }
  | { type: 'TOGGLE_TODO'; payload: { id: string } }
  | { type: 'DELETE_TODO'; payload: { id: string } }
  | { type: 'SET_FILTER'; payload: FilterType }
  | { type: 'CLEAR_COMPLETED' };

// ✅ Initial State
export const initialState: State = {
  todos: [],
  filter: 'all',
};

// ✅ Reducer
export function todoReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_TODO': {
      const newTodo: Todo = {
        id: crypto.randomUUID(),
        title: action.payload,
        completed: false,
      };
      return {
        ...state,
        todos: [...state.todos, newTodo],
      };
    }

    case 'EDIT_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, title: action.payload.title }
            : todo
        ),
      };

    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };

    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };

    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload,
      };

    case 'CLEAR_COMPLETED':
      return {
        ...state,
        todos: state.todos.filter((todo) => !todo.completed),
      };

    default:
      return state;
  }
}
