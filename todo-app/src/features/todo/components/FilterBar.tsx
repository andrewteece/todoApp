import { useTodoContext } from '@/features/todo/context/TodoContext';

const filters = ['all', 'active', 'completed'] as const;

export function FilterBar() {
  const {
    state: { todos, filter },
    dispatch,
  } = useTodoContext();

  const itemsLeft = todos.filter((t) => !t.completed).length;

  return (
    <div className='mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm px-4 py-3 bg-light-bg dark:bg-dark-desaturatedBlue rounded shadow gap-4'>
      <span className='text-light-darkGrayishBlue dark:text-dark-darkGrayishBlue'>
        {itemsLeft} item{itemsLeft !== 1 ? 's' : ''} left
      </span>

      <div className='flex items-center gap-4 justify-center'>
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => dispatch({ type: 'SET_FILTER', payload: f })}
            className={`capitalize transition font-bold ${
              filter === f
                ? 'text-primary'
                : 'text-light-darkGrayishBlue dark:text-dark-darkGrayishBlue hover:text-primary'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <button
        onClick={() => dispatch({ type: 'CLEAR_COMPLETED' })}
        className='text-light-darkGrayishBlue dark:text-dark-darkGrayishBlue hover:text-primary transition'
      >
        Clear Completed
      </button>
    </div>
  );
}
