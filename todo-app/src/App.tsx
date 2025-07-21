import { ThemeProvider } from '@/components/ThemeProvider';
import { Header } from '@/components/ui/Header';
import { TodoInput } from '@/features/todo/components/TodoInput';
import { TodoList } from '@/features/todo/components/TodoList';
import FilterBar from '@/features/todo/components/FilterBar';
import { TodoProvider } from '@/features/todo/context/TodoContext';

export default function App() {
  return (
    <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
      <TodoProvider>
        <div className='min-h-screen bg-light-bg dark:bg-dark-bg font-sans text-base transition-colors duration-300'>
          <Header />
          <main className='mx-auto max-w-md sm:max-w-xl px-6 py-10'>
            <TodoInput />
            <TodoList />
            <FilterBar />
          </main>
        </div>
      </TodoProvider>
    </ThemeProvider>
  );
}
