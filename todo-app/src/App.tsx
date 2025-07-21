import { ThemeProvider } from '@/components/ThemeProvider';
import { Header } from '@/components/ui/Header';
import { TodoInput } from '@/features/todo/components/TodoInput';
import { TodoList } from '@/features/todo/components/TodoList';
import { FilterBar } from '@/features/todo/components/FilterBar';
import { FilterBarMobile } from '@/features/todo/components/FilterBarMobile';
import { TodoProvider } from '@/features/todo/context/TodoContext';
import { motion } from 'framer-motion';

export default function App() {
  return (
    <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
      <div className='min-h-screen bg-light-grayishBlue dark:bg-dark-bg font-sans text-base transition-colors duration-300 flex flex-col'>
        {/* Background Image */}
        <div className="w-full h-52 sm:h-64 bg-[url('/images/bg-desktop-light.jpg')] dark:bg-[url('/images/bg-desktop-dark.jpg')] bg-no-repeat bg-cover bg-center" />

        <TodoProvider>
          <main className='-mt-32 px-6 pb-20 mx-auto w-full max-w-md sm:max-w-xl space-y-6 z-10 relative'>
            <Header />

            {/* Animated Todo Input Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className='bg-light-bg dark:bg-dark-desaturatedBlue rounded-md shadow px-4 py-3'
            >
              <TodoInput />
            </motion.div>

            {/* Animated Todo List Container */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
              className='bg-light-bg dark:bg-dark-desaturatedBlue rounded-md shadow-xl overflow-hidden'
            >
              <TodoList />
              <FilterBar />
            </motion.section>

            <FilterBarMobile />

            <p className='text-center text-sm text-light-darkGrayishBlue dark:text-dark-darkGrayishBlue mt-6 hidden sm:block'>
              Drag and drop to reorder list
            </p>
          </main>
        </TodoProvider>
      </div>
    </ThemeProvider>
  );
}
