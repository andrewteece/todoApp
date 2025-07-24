import { useTodoContext } from '@/features/todo/context/useTodoContext';
import { TodoInput } from '@/features/todo/components/TodoInput';
import { TodoList } from '@/features/todo/components/TodoList';
import { FilterBar } from '@/features/todo/components/FilterBar';
import { FilterBarMobile } from '@/features/todo/components/FilterBarMobile';

export default function AppContent() {
  const {
    state: { todos },
    clearCompleted,
  } = useTodoContext();

  const activeCount = todos.filter((todo) => !todo.completed).length;

  return (
    <main className='relative z-[40] max-w-xl mx-auto px-4'>
      {/* Shift entire block upward */}
      <div className='-mt-28 space-y-6'>
        <TodoInput />

        <div className='bg-card text-card-foreground rounded-lg shadow-md overflow-hidden transition-colors duration-500'>
          <TodoList />
          <div className='flex justify-between items-center px-5 py-4 text-sm text-muted-foreground'>
            <span>{activeCount} items left</span>
            <button
              onClick={clearCompleted}
              className='hover:text-primary transition-colors duration-150'
            >
              Clear Completed
            </button>
          </div>
        </div>

        <div className='hidden md:block'>
          <FilterBar />
        </div>

        <div className='block md:hidden'>
          <FilterBarMobile />
        </div>

        <p className='text-center text-sm text-muted-foreground'>
          Drag and drop to reorder list
        </p>
      </div>
    </main>
  );
}
