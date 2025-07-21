import { useTodoContext } from '@/features/todo/context/TodoContext';
import { TodoItem } from './TodoItem';

export function TodoList() {
  const {
    state: { todos, filter },
  } = useTodoContext();

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  if (filteredTodos.length === 0) {
    return (
      <p className='text-center mt-4 text-light-darkGrayishBlue dark:text-dark-darkGrayishBlue'>
        No {filter !== 'all' ? filter : ''} todos
      </p>
    );
  }

  return (
    <ul className='mt-4 space-y-2'>
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}
