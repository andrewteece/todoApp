'use client';

import { FilterControls } from './FilterControls';

export function FilterBarMobile() {
  return (
    <div className='block md:hidden mt-4'>
      <div className='bg-white dark:bg-very-dark-desaturated-blue rounded-md shadow-md py-3'>
        <FilterControls />
      </div>
    </div>
  );
}
