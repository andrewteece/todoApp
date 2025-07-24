import { useTodoContext } from '@/features/todo/context/useTodoContext';
import type { FilterType } from '@/features/todo/context/useTodoReducer';
import clsx from 'clsx';

const filters: FilterType[] = ['all', 'active', 'completed'];

export function FilterControls() {
  const {
    state: { filter },
    setFilter,
  } = useTodoContext();

  return (
    <div className='flex gap-4 justify-center text-sm'>
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          className={clsx(
            'capitalize transition',
            filter === f
              ? 'text-primary font-semibold'
              : 'text-muted-foreground hover:text-primary'
          )}
        >
          {f}
        </button>
      ))}
    </div>
  );
}
