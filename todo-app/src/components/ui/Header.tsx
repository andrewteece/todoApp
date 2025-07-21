import ModeToggle from '@/components/ui/mode-toggle';

export function Header() {
  return (
    <header className='flex items-center justify-between px-6 py-4 sm:px-8 sm:py-6'>
      <h1 className='text-2xl font-bold tracking-widest uppercase text-light-veryDarkGrayishBlue dark:text-dark-lightGrayishBlue'>
        Todo
      </h1>
      <ModeToggle />
    </header>
  );
}
