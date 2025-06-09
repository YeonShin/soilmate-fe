import React from 'react';
import { Outlet } from 'react-router';
import Navbar from './Navbar';

const Root = () => {
  return (
    <div className='flex min-h-screen bg-gray-50 dark:bg-gray-900'>
      <Navbar />
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Root;
