'use client';

import { FilterControls } from './FilterControls';
import { motion } from 'framer-motion';

export function FilterBarMobile() {
  return (
    <div className='block md:hidden mt-4'>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16 }}
        transition={{ duration: 0.3 }}
        className='bg-white dark:bg-very-dark-desaturated-blue rounded-md shadow-md py-3'
      >
        <FilterControls />
      </motion.div>
    </div>
  );
}
