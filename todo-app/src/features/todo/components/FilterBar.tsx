'use client';

import { FilterControls } from './FilterControls';

export function FilterBar() {
  return (
    <div className='hidden md:block mt-6'>
      <FilterControls />
    </div>
  );
}
