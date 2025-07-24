import AppContent from './AppContent';
import { TodoProvider } from '@/features/todo/context/TodoProvider';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Header } from './components/ui/Header';

export default function App() {
  return (
    <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
      <div className='min-h-screen bg-background text-foreground transition-colors'>
        <TodoProvider>
          <div className='min-h-screen bg-background'>
            {/* Top Gradient Background Section */}
            <div className='absolute top-0 left-0 right-0 h-[300px] sm:h-[250px] z-0'>
              <div className='w-full h-full bg-header-light dark:bg-header-dark bg-cover bg-no-repeat bg-top transition-colors' />
            </div>

            {/* Content Overlay */}
            <div className='relative z-10 px-4 pt-12 sm:pt-16 max-w-xl mx-auto space-y-6'>
              <Header />
              <AppContent />
            </div>
          </div>
        </TodoProvider>
      </div>
    </ThemeProvider>
  );
}
