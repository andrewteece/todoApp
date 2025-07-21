import { useTodoContext } from '@/features/todo/context/useTodoContext';

const filters = ['all', 'active', 'completed'] as const;

export function FilterBar() {
  const {
    state: { todos, filter },
    dispatch,
  } = useTodoContext();

  const itemsLeft = todos.filter((t) => !t.completed).length;

  return (
    <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm px-4 py-3 gap-4 bg-light-bg dark:bg-dark-desaturatedBlue rounded shadow'>
      {/* Items left */}
      <span className='text-light-darkGrayishBlue dark:text-dark-darkGrayishBlue text-center sm:text-left'>
        {itemsLeft} item{itemsLeft !== 1 ? 's' : ''} left
      </span>

      {/* Filter buttons */}
      <div className='flex flex-wrap items-center gap-4 justify-center'>
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

      {/* Clear completed */}
      <button
        onClick={() => dispatch({ type: 'CLEAR_COMPLETED' })}
        className='text-light-darkGrayishBlue dark:text-dark-darkGrayishBlue hover:text-primary transition text-center'
      >
        Clear Completed
      </button>
    </div>
  );
}
