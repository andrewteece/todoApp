import AppContent from './AppContent';
import { TodoProvider } from '@/features/todo/context/TodoProvider';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Header } from './components/ui/Header';

export default function App() {
  return (
    <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
      <div className='min-h-screen w-full bg-background text-foreground'>
        <TodoProvider>
          {/* Header should not be inside layout constraints */}
          <Header />

          {/* Now constrain AppContent only */}
          <div className='relative z-10 max-w-xl mx-auto px-4 space-y-6'>
            <AppContent />
          </div>
        </TodoProvider>
      </div>
    </ThemeProvider>
  );
}
