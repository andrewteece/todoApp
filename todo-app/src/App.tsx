import { TodoProvider } from '@/features/todo/context/TodoProvider';
import { ThemeProvider } from '@/components/ThemeProvider';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useTodoContext } from '@/features/todo/context/useTodoContext';
import { Header } from '@/components/ui/Header';
import { TodoInput } from '@/features/todo/components/TodoInput';
import { TodoList } from '@/features/todo/components/TodoList';
import { FilterBar } from '@/features/todo/components/FilterBar';
import { FilterBarMobile } from '@/features/todo/components/FilterBarMobile';

export function AppContent() {
  const {
    state: { todos },
    clearCompleted,
  } = useTodoContext();

  const activeCount = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="font-josefin bg-[url('/images/bg-mobile-light.jpg')] dark:bg-[url('/images/bg-mobile-dark.jpg')] sm:bg-[url('/images/bg-desktop-light.jpg')] dark:sm:bg-[url('/images/bg-desktop-dark.jpg')] bg-no-repeat bg-top bg-cover min-h-screen transition-colors duration-300">
      <Header />
      <main className='max-w-xl mx-auto px-4 pt-12 pb-10 space-y-6'>
        {/* Todo card */}
        <div className='bg-white dark:bg-dark-desaturatedBlue rounded-md shadow-md overflow-hidden'>
          <TodoInput />
          <TodoList />

          {/* Footer: item count and clear completed */}
          <div className='flex items-center justify-between px-5 py-4 text-sm text-muted-foreground border-t border-light-gray dark:border-dark-border'>
            <span>
              {activeCount} {activeCount === 1 ? 'item' : 'items'} left
            </span>
            <button onClick={clearCompleted} className='hover:text-primary'>
              Clear Completed
            </button>
          </div>
        </div>

        {/* Desktop filter bar */}
        <div className='hidden sm:flex justify-center'>
          <div className='bg-white dark:bg-dark-desaturatedBlue rounded-md shadow-md px-6 py-3'>
            <FilterBar />
          </div>
        </div>

        {/* Mobile filter bar */}
        <FilterBarMobile />

        {/* Drag hint */}
        <p className='text-muted-foreground text-sm text-center mt-6'>
          Drag and drop to reorder list
        </p>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
      <div className='relative min-h-screen bg-light-grayishBlue dark:bg-dark-bg font-sans text-base transition-colors duration-300'>
        <ThemeToggle />
        <TodoProvider>
          <AppContent />
        </TodoProvider>
      </div>
    </ThemeProvider>
  );
}
