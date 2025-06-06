// src/components/Navbar.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        
        {/* 좌측 메뉴 */}
        <ul className="flex space-x-6">
          <li>
            <Link
              to="/"
              className="text-gray-800 hover:text-green-600 font-medium"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/manage"
              className="text-gray-800 hover:text-green-600 font-medium"
            >
              Manage
            </Link>
          </li>
        </ul>

        {/* 우측 로그인 버튼 */}
        <button
          type="button"
          onClick={() => navigate('/login')}
          className="px-8 py-2 bg-white text-gray-700 border-1 border-black rounded-full hover:bg-gray-400 hover:text-white hover:border-gray-400 transition"
        >
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
