// src/screens/Register.tsx
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import axios from 'axios'
import { MdDarkMode } from 'react-icons/md'
import { CiDark } from 'react-icons/ci'
import Logo from '/logo.png'
import { useThemeStore } from '../store/useThemeStore'

const API_BASE = 'http://localhost:8080'

const Register: React.FC = () => {
  const navigate = useNavigate()
  const { dark, toggle } = useThemeStore()


  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await axios.post(
        `/api/auth/signup`,
        { username, password },
        { headers: { 'Content-Type': 'application/json', accept: 'text/plain' } }
      )
      navigate('/login')
    } catch (error) {
      console.error('회원가입 실패:', error)
      // 필요시 에러 메시지 사용자에게 표시
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* 헤더 */}
      <header className="px-8 py-8">
        {dark ? (
          <CiDark
            onClick={toggle}
            className="ml-auto block cursor-pointer text-green-300"
            size={32}
          />
        ) : (
          <MdDarkMode
            onClick={toggle}
            className="ml-auto block cursor-pointer text-green-600"
            size={32}
          />
        )}
      </header>

      {/* 메인 회원가입 카드 */}
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="bg-white dark:bg-gray-800 w-full max-w-md p-8 rounded-3xl shadow-lg">
          <img
            src={Logo}
            alt="logo"
            className="w-32 mx-auto mb-8 cursor-pointer"
            onClick={() => navigate('/')}
          />

          <h2 className="text-3xl font-bold text-green-800 dark:text-green-300 text-center mb-6">
            회원가입
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 아이디 입력 */}
            <div>
              <label htmlFor="username" className="sr-only">
                ID
              </label>
              <input
                id="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter ID"
                className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:border-green-600 dark:focus:border-green-400 focus:outline-none transition"
              />
            </div>

            {/* 비밀번호 입력 */}
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:border-green-600 dark:focus:border-green-400 focus:outline-none transition"
              />
            </div>

            {/* 회원가입 버튼 */}
            <button
              type="submit"
              className="w-full mt-2 py-2 bg-green-600 dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-600 text-white font-semibold rounded-lg transition"
            >
              회원가입
            </button>
          </form>

          {/* 로그인 유도 */}
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
            이미 계정이 있으신가요?{' '}
            <Link to="/login" className="text-green-600 dark:text-green-300 hover:underline">
              로그인
            </Link>
          </p>
        </div>
      </main>

      {/* 푸터 */}
      <footer className="px-8 py-4 text-center text-gray-400 dark:text-gray-500 text-sm bg-transparent">
        © SoilMate 2025
      </footer>
    </div>
  )
}

export default Register
