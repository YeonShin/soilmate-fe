// src/components/Navbar.tsx
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { useThemeStore } from '../store/useThemeStore';
import { MdDarkMode } from "react-icons/md";
import { CiDark } from "react-icons/ci";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

    const {dark, toggle} = useThemeStore();
  
    useEffect(() => {
      document.documentElement.classList.toggle('dark', dark);
    }, [dark]);

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md dark:shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* 좌측 메뉴 */}
        <ul className="flex space-x-6">
          <li>
            <Link
              to="/"
              className="text-gray-800 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-300 font-medium transition"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/manage"
              className="text-gray-800 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-300 font-medium transition"
            >
              Manage
            </Link>
          </li>
        </ul>

        {dark
          ? <CiDark
              onClick={toggle}
              className="ml-auto block cursor-pointer text-green-300 mr-4"
              size={32}
            />
          : <MdDarkMode
              onClick={toggle}
              className="ml-auto block cursor-pointer text-green-600 mr-4"
              size={32}
            />
        }

        {/* 우측 로그인 버튼 */}
        <button
          type="button"
          onClick={() => navigate('/login')}
          className="
            px-8 py-2
            bg-white dark:bg-gray-700
            text-gray-700 dark:text-gray-200
            border border-black dark:border-gray-600
            rounded-full
            hover:bg-gray-400 dark:hover:bg-gray-600
            hover:text-white
            transition
            ml-
          "
        >
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
