import { useTodoContext } from '@/features/todo/context/useTodoContext';
import type { FilterType } from '@/features/todo/context/useTodoReducer';
import clsx from 'clsx';

const filters: FilterType[] = ['all', 'active', 'completed'];

export function FilterBar() {
  const {
    state: { filter },
    setFilter,
  } = useTodoContext();

  return (
    <div className='flex gap-4 text-sm justify-center'>
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          className={clsx(
            'capitalize hover:text-primary transition',
            filter === f && 'text-primary font-semibold'
          )}
        >
          {f}
        </button>
      ))}
    </div>
  );
}
