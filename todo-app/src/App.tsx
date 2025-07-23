// import TestReducer from './TestReducer';
import { TodoProvider } from '@/features/todo/context/TodoProvider';
import { ThemeProvider } from '@/components/ThemeProvider';
import { useTodoContext } from '@/features/todo/context/useTodoContext';
import { TodoInput } from '@/features/todo/components/TodoInput';
import { TodoList } from '@/features/todo/components/TodoList';
import { FilterBar } from '@/features/todo/components/FilterBar';

export function AppContent() {
  const {
    state: { todos },
    clearCompleted,
  } = useTodoContext();

  const activeCount = todos.filter((todo) => !todo.completed).length;

  return (
    <main className='max-w-xl mx-auto p-4 space-y-6'>
      <TodoInput />

      <TodoList />

      {/* Inline footer: count + clear */}
      <div className='flex items-center justify-between text-sm text-muted-foreground'>
        <span>{activeCount} items left</span>
        <button onClick={clearCompleted} className='hover:text-primary'>
          Clear Completed
        </button>
      </div>

      {/* Filter controls */}
      <div className='flex justify-center'>
        <FilterBar />
      </div>
    </main>
  );
}

export default function App() {
  return (
    <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
      <div className='min-h-screen p-8'>
        <TodoProvider>
          <AppContent />
        </TodoProvider>
      </div>
    </ThemeProvider>
  );
}
// import { ThemeProvider } from '@/components/ThemeProvider';
// import { Header } from '@/components/ui/Header';
// import { TodoInput } from '@/features/todo/components/TodoInput';
// import { TodoList } from '@/features/todo/components/TodoList';
// import { FilterBar } from '@/features/todo/components/FilterBar';
// import { FilterBarMobile } from '@/features/todo/components/FilterBarMobile';
// import { useTodoContext } from '@/features/todo/context/useTodoContext';
// import { TodoProvider } from '@/features/todo/context/TodoProvider';

// import { motion } from 'framer-motion';
// import Spinner from './components/ui/Spinner';

// function AppContent() {
//   const {
//     state: { todos },
//     clearCompleted,
//   } = useTodoContext();
//   if (!todos) {
//     return (
//       <div className='flex flex-col items-center gap-2 py-12 text-muted-foreground'>
//         <Spinner size={24} />
//         <span className='text-sm'>Loading...</span>
//       </div>
//     );
//   }

//   const activeCount = todos.filter((todo) => !todo.completed).length;

//   return (
//     <main className='-mt-28 px-6 pb-24 mx-auto w-full max-w-md sm:max-w-xl space-y-6 z-10 relative'>
//       <Header />

//       {/* Animated Todo Input */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className='bg-light-bg dark:bg-dark-desaturatedBlue rounded-md shadow-sm px-5 py-3'
//       >
//         <TodoInput />
//       </motion.div>

//       {/* Animated Todo List Container */}
//       <motion.section
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6, delay: 0.1 }}
//         className='bg-light-bg dark:bg-dark-desaturatedBlue rounded-md shadow-md overflow-hidden'
//       >
//         <TodoList />

//         {/* Inline footer: count + clear */}
//         <div className='flex items-center justify-between px-5 py-3 text-sm text-light-darkGrayishBlue dark:text-dark-darkGrayishBlue'>
//           <span>{activeCount} items left</span>
//           <button onClick={clearCompleted} className='hover:text-primary'>
//             Clear Completed
//           </button>
//         </div>
//       </motion.section>

//       {/* Desktop Filter */}
//       <div className='hidden sm:flex justify-center'>
//         <div className='rounded-md shadow-md bg-light-bg dark:bg-dark-desaturatedBlue px-6 py-3'>
//           <FilterBar />
//         </div>
//       </div>

//       {/* Mobile Filter */}
//       <div className='sm:hidden rounded-md shadow-md bg-light-bg dark:bg-dark-desaturatedBlue px-6 py-3'>
//         <FilterBarMobile />
//       </div>

//       {/* Drag & drop hint */}
//       <p className='text-center text-sm text-light-darkGrayishBlue dark:text-dark-darkGrayishBlue mt-6 hidden sm:block'>
//         Drag and drop to reorder list
//       </p>
//     </main>
//   );
// }

// export default function App() {
//   return (
//     <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
//       <div className='min-h-screen bg-light-grayishBlue dark:bg-dark-bg font-sans text-base transition-colors duration-300 flex flex-col'>
//         {/* Background Image */}
//         <div className="w-full h-52 sm:h-64 bg-[url('/images/bg-desktop-light.jpg')] dark:bg-[url('/images/bg-desktop-dark.jpg')] bg-no-repeat bg-cover bg-center" />

//         <TodoProvider>
//           <AppContent />
//         </TodoProvider>
//       </div>
//     </ThemeProvider>
//   );
// }
