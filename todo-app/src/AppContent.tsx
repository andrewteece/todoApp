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
    <main className='relative z-10 max-w-xl mx-auto px-4 space-y-6 rounded-lg'>
      {/* Input Field Overlapping Header */}
      <div className='relative z-10 -mt-18 sm:-mt-24'>
        <TodoInput />
      </div>

      {/* Todo List Card */}
      <div className='bg-card text-card-foreground rounded-md shadow-md overflow-hidden transition-colors duration-500'>
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

      {/* Desktop Filter Bar */}
      <div className='hidden md:block'>
        <FilterBar />
      </div>

      {/* Mobile Filter Bar */}
      <div className='block md:hidden'>
        <FilterBarMobile />
      </div>

      {/* Drag Instruction */}
      <p className='text-center text-sm text-muted-foreground'>
        Drag and drop to reorder list
      </p>
    </main>
  );
}
