// src/components/dashboard/AlertBanner.tsx
import React, { useMemo } from 'react'
import { GoAlertFill } from 'react-icons/go'
import { useAlertStore } from '../../store/useAlertStore'

const AlertBanner: React.FC = () => {
  const { alerts } = useAlertStore()

  // 현재 시간과 1시간 전 시간
  const now = useMemo(() => new Date(), [])
  const oneHourAgo = useMemo(() => new Date(now.getTime() - 60 * 60 * 1000), [now])

  // 최근 1시간 이내 발생한 alerts
  const recentCount = useMemo(
    () => alerts.filter((log) => new Date(log.timestamp) >= oneHourAgo).length,
    [alerts, oneHourAgo]
  )

  // 발생 건수가 없으면 배너 숨김
  if (recentCount === 0) return null

  return (
    <div
      role="alert"
      className="
        flex
        px-4 py-4
        bg-orange-200 dark:bg-orange-900
        border border-orange-500 dark:border-orange-700
        text-red-500 dark:text-orange-200
        rounded-lg
        mb-4
      "
    >
      <GoAlertFill className="w-5 h-5 flex-shrink-0 mr-2 dark:text-orange-200" />
      <div className="flex flex-col gap-1">
        <p className="text-sm text-red-600 font-bold dark:text-orange-100">경고 알림</p>
        <p className="text-sm text-orange-700 dark:text-orange-300">
          <strong>{recentCount}</strong>개의 센서 임계값 초과 경고가 최근 1시간 동안 발생했습니다!
        </p>
      </div>
    </div>
  )
}

export default AlertBanner
