import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Search = ({ search, handleSearch, handleSearchSubmit }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const handleInputChange = (e) => {
    handleSearch(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSearchSubmit();
  };

  return (
    <motion.form
      className="max-w-md mx-auto my-4 rounded-full"
      onSubmit={onSubmit}
    >
      <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-700 sr-only dark:text-white">Search</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
        </div>
        <motion.input
          type="search"
          id="default-search"
          className="block w-full p-4 pl-10 pr-12 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-lime-500 focus:border-lime-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500 transition-all duration-300 ease-in-out"
          placeholder="Search..."
          value={search}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          animate={{ width: isFocused ? '100%' : '80%' }}
        />
        <motion.button
          type="submit"
          className="absolute right-2.5 bottom-2.5 bg-gray-700 hover:bg-gray-800 text-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 transition-colors duration-300 ease-in-out"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          Search
        </motion.button>
      </div>
    </motion.form>
  );
};

export default Search;