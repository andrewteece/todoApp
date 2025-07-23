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
  | { type: 'ADD_TODO'; payload: Todo }
  | { type: 'TOGGLE_TODO'; payload: string }
  | { type: 'DELETE_TODO'; payload: string }
  | { type: 'EDIT_TODO'; payload: { id: string; title: string } }
  | { type: 'CLEAR_COMPLETED' }
  | { type: 'SET_FILTER'; payload: FilterType }
  | { type: 'REORDER_TODOS'; payload: Todo[] };

export const initialState: State = {
  todos: [],
  filter: 'all',
};

export const todoReducer = (state: State, action: Action): State => {
  console.log('🔥 REDUCER FIRED:', action.type);

  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case 'TOGGLE_TODO': {
      console.log('TOGGLE_TODO matched for:', action.payload);

      const updatedTodos = state.todos.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );

      console.log('🧪 Todos after toggle:', updatedTodos);

      return {
        ...state,
        todos: updatedTodos,
      };
    }

    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };

    case 'EDIT_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, title: action.payload.title }
            : todo
        ),
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
};
