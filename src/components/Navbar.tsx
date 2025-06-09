// src/components/Navbar.tsx
import React, { useEffect } from "react"
import { NavLink } from "react-router"
import { useThemeStore } from "../store/useThemeStore"
import { MdHomeFilled, MdDarkMode } from "react-icons/md"
import { FaLeaf } from "react-icons/fa";
import { BiBarChart } from "react-icons/bi"
import { IoIosWater } from "react-icons/io";
import { IoIosNotifications } from "react-icons/io";
import { CiDark } from "react-icons/ci"
import { FaPowerOff } from "react-icons/fa"
import { HiOutlineMenu } from "react-icons/hi"
import Logo from "/logo.png"
import { useSidebarStore } from "../store/useSidebarStore";

const MENU = [
  { to: "/",        icon: <MdHomeFilled    size={28} />, label: "대시보드"      },
  { to: "/monitor", icon: <BiBarChart      size={28} />, label: "모니터링"      },
  { to: "/watering",icon: <IoIosWater     size={28} />, label: "관수 제어"     },
  { to: "/alerts",  icon: <IoIosNotifications  size={28} />, label: "경고 알림 내역" },
  { to: "/manage",  icon: <FaLeaf    size={28} />, label: "식물 관리"     },
]

const Navbar: React.FC = () => {
  const { dark, toggle } = useThemeStore()
    const { collapsed, toggle: toggleSidebar } = useSidebarStore()

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark)
  }, [dark])

  return (
     <aside
      className={[
        'flex flex-col justify-between h-screen bg-white dark:bg-gray-900 border-r-gray-200 transition-width duration-300',
        collapsed ? 'w-16' : 'w-64',
      ].join(' ')}
    >
      <div>
        {/* 로고 */}
        <div className="flex items-center px-4 py-3 space-x-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <img src={Logo} alt="SoilMate" className="w-8 h-8" />
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-lg font-bold text-gray-800 dark:text-gray-200">SoilMate</span>
              <span className="text-xs text-gray-400 dark:text-gray-600">
                스마트 농장 관리
              </span>
            </div>
          )}
        </div>
        <hr className="border-gray-200 dark:border-gray-700" />

        {/* 네비게이션 */}
        <nav className="mt-4 space-y-1">
          {MENU.map(({ to, icon, label }) => (
            <NavLink key={to} to={to}>
              {({ isActive }) => (
                <div
                  className={[
                    'flex items-center px-4 py-2 rounded-lg transition-colors',
                    isActive
                      ? 'bg-green-50 dark:bg-green-900'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800',
                  ].join(' ')}
                >
                  {React.cloneElement(icon, {
                    className: [
                      isActive
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-gray-600 dark:text-gray-400',
                      'transition-colors',
                    ].join(' '),
                  })}
                  {!collapsed && (
                    <span
                      className={[
                        isActive
                          ? 'text-gray-900 dark:text-gray-100 font-semibold'
                          : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100',
                        'ml-3 text-sm transition-colors',
                      ].join(' ')}
                    >
                      {label}
                    </span>
                  )}
                </div>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* 하단 컨트롤 */}
      <div className="px-2 pb-4 space-y-2">
        <button
          onClick={toggleSidebar}
          className="w-full flex items-center px-4 py-2 text-sm text-gray-600 dark:text-gray-400
                     hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800
                     rounded-lg transition-colors"
        >
          <HiOutlineMenu className="w-5 h-5" />
          {!collapsed && <span className="ml-3">메뉴 접기</span>}
        </button>

        <button
          onClick={toggle}
          className="w-full flex items-center px-4 py-2 text-sm text-gray-600 dark:text-gray-400
                     hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800
                     rounded-lg transition-colors"
        >
          {dark ? (
            <CiDark className="w-5 h-5 text-green-400" />
          ) : (
            <MdDarkMode className="w-5 h-5 text-green-600" />
          )}
          {!collapsed && <span className="ml-3">{dark ? '라이트 모드' : '다크 모드'}</span>}
        </button>

        <button
          onClick={() => console.log('logout')}
          className="w-full flex items-center px-4 py-2 text-sm text-red-600
                     hover:text-red-800 hover:bg-red-50 dark:hover:bg-red-800
                     rounded-lg transition-colors"
        >
          <FaPowerOff className="w-5 h-5" />
          {!collapsed && <span className="ml-3">로그아웃</span>}
        </button>
      </div>
    </aside>
  )
}

export default Navbar
