import { ThemeProvider } from '@/components/ThemeProvider';
import { Header } from '@/components/ui/Header';
import { TodoInput } from '@/features/todo/components/TodoInput';
import { TodoList } from '@/features/todo/components/TodoList';
import { FilterBar } from '@/features/todo/components/FilterBar';
import { TodoProvider } from '@/features/todo/context/TodoContext';

export default function App() {
  return (
    <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
      <div className='min-h-screen bg-light-grayishBlue dark:bg-dark-bg font-sans text-base transition-colors duration-300'>
        {/* Background Image Header */}
        <div className="w-full h-52 sm:h-64 bg-[url('/images/bg-desktop-light.jpg')] dark:bg-[url('/images/bg-desktop-dark.jpg')] bg-no-repeat bg-cover bg-center" />

        {/* Main App UI */}
        <TodoProvider>
          <main className='-mt-24 px-6 mx-auto w-full max-w-md sm:max-w-xl space-y-6 z-10 relative'>
            <Header />
            <section className='rounded-md shadow-xl overflow-hidden bg-light-bg dark:bg-dark-desaturatedBlue'>
              <TodoInput />
              <TodoList />
              <FilterBar />
            </section>
          </main>
        </TodoProvider>
      </div>
    </ThemeProvider>
  );
}
