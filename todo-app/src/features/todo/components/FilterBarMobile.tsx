import { useTodoContext } from '@/features/todo/context/useTodoContext';
import type { FilterType } from '@/features/todo/context/useTodoReducer';
import clsx from 'clsx';

const filters: FilterType[] = ['all', 'active', 'completed'];

export function FilterBarMobile() {
  const {
    state: { filter },
    dispatch,
  } = useTodoContext();

  return (
    <div className='flex justify-center sm:hidden p-4 rounded-md shadow-md bg-light-bg dark:bg-dark-desaturatedBlue'>
      <div className='flex gap-6 text-sm'>
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => dispatch({ type: 'SET_FILTER', payload: f })}
            className={clsx(
              'capitalize hover:text-primary transition',
              filter === f && 'text-primary font-semibold'
            )}
          >
            {f}
          </button>
        ))}
      </div>
    </div>
  );
}
