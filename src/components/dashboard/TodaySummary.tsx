// src/components/dashboard/TodaySummary.tsx
import React, { useMemo } from 'react'
import { IoIosWater } from 'react-icons/io'
import { GoAlertFill } from 'react-icons/go'
import { MdGrass } from 'react-icons/md'

const TodaySummary: React.FC = () => {
  // 더미 오늘 요약 데이터
  const { totalWater, warningCount, avgSoil } = useMemo(() => ({
    totalWater: 530,      // 총 관수량 (ml)
    warningCount: 3,      // 경고 발생 건수
    avgSoil: 43.5         // 평균 토양 수분 (%)
  }), [])

  return (
    <div className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      {/* 헤더 */}
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
        오늘의 요약
      </h3>

      {/* 리스트 */}
      <ul className="mt-4 space-y-8">
        {/* 총 관수량 */}
        <li className="flex justify-between items-center">
          <div className="flex items-center">
            <IoIosWater className="text-blue-500 text-2xl mr-2" />
            <span className="text-gray-700 dark:text-gray-300">총 관수량</span>
          </div>
          <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {totalWater}ml
          </span>
        </li>

        {/* 경고 발생 */}
        <li className="flex justify-between items-center">
          <div className="flex items-center">
            <GoAlertFill className="text-red-500 text-2xl mr-2" />
            <span className="text-gray-700 dark:text-gray-300">경고 발생</span>
          </div>
          <span className="text-lg font-semibold text-red-600">
            {warningCount}건
          </span>
        </li>

        {/* 평균 토양 수분 */}
        <li className="flex justify-between items-center">
          <div className="flex items-center">
            <MdGrass className="text-stone-700 text-2xl mr-2" />
            <span className="text-gray-700 dark:text-gray-300">평균 토양 수분</span>
          </div>
          <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {avgSoil.toFixed(1)}%
          </span>
        </li>
      </ul>
    </div>
  )
}

export default TodaySummary
