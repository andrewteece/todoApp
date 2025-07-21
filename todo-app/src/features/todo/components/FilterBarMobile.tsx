// src/features/todo/components/FilterBarMobile.tsx
import { useTodoContext } from '@/features/todo/context/useTodoContext';

const filters = ['all', 'active', 'completed'] as const;

export function FilterBarMobile() {
  const {
    state: { filter },
    dispatch,
  } = useTodoContext();

  return (
    <div className='mt-6 px-6 py-4 bg-light-bg dark:bg-dark-desaturatedBlue rounded shadow flex justify-center gap-6 sm:hidden'>
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => dispatch({ type: 'SET_FILTER', payload: f })}
          className={`capitalize font-bold text-sm transition ${
            filter === f
              ? 'text-primary'
              : 'text-light-darkGrayishBlue dark:text-dark-darkGrayishBlue hover:text-primary'
          }`}
        >
          {f}
        </button>
      ))}
    </div>
  );
}
