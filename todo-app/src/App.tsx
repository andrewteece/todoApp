import AppContent from './AppContent';
import { TodoProvider } from '@/features/todo/context/TodoProvider';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Header } from './components/ui/Header';

export default function App() {
  return (
    <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
      <div className='min-h-screen bg-light-grayishBlue dark:bg-very-dark-blue text-light-grayishBlue dark:text-light-grayishBlue transition-colors'>
        <TodoProvider>
          <div className='min-h-screen bg-light-grayishBlue dark:bg-very-dark-blue'>
            {/* Top Gradient Background Section */}
            <div className="absolute top-0 left-0 right-0 h-[300px] sm:h-[250px] bg-[url('/images/bg-mobile-light.jpg')] dark:bg-[url('/images/bg-mobile-dark.jpg')] sm:bg-[url('/images/bg-desktop-light.jpg')] dark:sm:bg-[url('/images/bg-desktop-dark.jpg')] bg-no-repeat bg-cover bg-top z-0" />

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
