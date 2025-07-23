import { useReducer } from 'react';

type Todo = { id: string; title: string; completed: boolean };
type Action = { type: 'TOGGLE'; payload: string };

const initialState: Todo[] = [{ id: '1', title: 'Test', completed: false }];

function reducer(state: Todo[], action: Action): Todo[] {
  console.log('🔥 Reducer hit:', action);
  if (action.type === 'TOGGLE') {
    return state.map((t) =>
      t.id === action.payload ? { ...t, completed: !t.completed } : t
    );
  }
  return state;
}

export default function TestReducer() {
  const [todos, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id}>
          <p>
            {todo.title} - {todo.completed ? 'Done' : 'Not Done'}
          </p>
          <button
            onClick={() => {
              console.log('✅ clicked!');
              dispatch({ type: 'TOGGLE', payload: todo.id });
            }}
          >
            Toggle
          </button>
        </div>
      ))}
    </div>
  );
}
