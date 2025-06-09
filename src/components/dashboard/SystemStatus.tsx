// src/components/dashboard/SystemStatus.tsx
import React, { useMemo } from 'react'
import { FaCheckCircle } from 'react-icons/fa'

interface StatusItem {
  label: string
  statusText: string
}

const dummyStatuses: StatusItem[] = [
  { label: '라즈베리파이 연결', statusText: '정상' },
  { label: '센서 상태',     statusText: '활성화' },
  { label: '워터펌프',      statusText: '비활성화' },
]

const getColor = (statusText: string) => {
  if (statusText === '비활성화') return 'orange'
  return 'green'
}

const SystemStatus: React.FC = () => {
  // 마지막 업데이트 시각을 한 번만 계산
  const lastUpdated = useMemo(() => {
    const now = new Date()
    const YYYY = now.getFullYear()
    const MM = String(now.getMonth() + 1).padStart(2, '0')
    const DD = String(now.getDate()).padStart(2, '0')
    const hh = String(now.getHours()).padStart(2, '0')
    const mm = String(now.getMinutes()).padStart(2, '0')
    return `${YYYY}-${MM}-${DD} ${hh}:${mm}`
  }, [])

  return (
    <div className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      {/* 헤더 */}
      <div className="flex items-center">
        <FaCheckCircle className="text-green-500 text-2xl mr-2" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          시스템 상태
        </h3>
      </div>

      {/* 상태 리스트 */}
      <ul className="mt-4 space-y-3">
        {dummyStatuses.map(({ label, statusText }) => {
          const color = getColor(statusText)
          const bulletClass = color === 'green'
            ? 'bg-green-500'
            : 'bg-orange-500'
          const badgeBg = color === 'green'
            ? 'bg-green-100 dark:bg-green-900'
            : 'bg-orange-100 dark:bg-orange-900'
          const badgeText = color === 'green'
            ? 'text-green-800 dark:text-green-100'
            : 'text-orange-800 dark:text-orange-100'

          return (
            <li key={label} className="flex justify-between items-center">
              <div className="flex items-center">
                <span className={`w-3 h-3 rounded-full ${bulletClass} mr-2`} />
                <span className="text-gray-900 dark:text-gray-100">{label}</span>
              </div>
              <span
                className={`
                  inline-block px-3 py-0.5 text-xs font-medium
                  ${badgeBg} ${badgeText}
                  rounded-full
                `}
              >
                {statusText}
              </span>
            </li>
          )
        })}
      </ul>

      {/* 구분선 */}
      <hr className="my-4 border-gray-200 dark:border-gray-700" />

      {/* 마지막 업데이트 */}
      <p className="text-sm text-gray-500 dark:text-gray-400">
        마지막 업데이트: {lastUpdated}
      </p>
    </div>
  )
}

export default SystemStatus
