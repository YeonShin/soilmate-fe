// src/components/dashboard/TodaySummary.tsx
import React, { useEffect, useMemo, useState } from 'react'
import { IoIosWater } from 'react-icons/io'
import { GoAlertFill } from 'react-icons/go'
import { MdGrass } from 'react-icons/md'
import { usePlantStore } from '../../store/usePlantStore'
import { useAlertStore } from '../../store/useAlertStore'
import { useAuthStore } from '../../store/useAuthStore'
import axios from 'axios'
import { CiCircleAlert } from 'react-icons/ci'

interface WaterLog {
  id: number
  plant: { id: number; name: string }
  amountMl: number
  method: string
  timestamp: string
}

const TodaySummary: React.FC = () => {
  const { selectedPlant } = usePlantStore()
  const { alerts } = useAlertStore()
  const { token } = useAuthStore()

  const [totalWater, setTotalWater] = useState(0)

  // 오늘 날짜 기준 비교 함수
  const isToday = (ts: string) => {
    const d = new Date(ts)
    const t = new Date()
    return (
      d.getFullYear() === t.getFullYear() &&
      d.getMonth() === t.getMonth() &&
      d.getDate() === t.getDate()
    )
  }

  // 오늘 관수량 조회
  useEffect(() => {
    const fetchWater = async () => {
      if (!selectedPlant) return
      try {
        const res = await axios.get<WaterLog[]>(
          `/api/watering/logs/plant/${selectedPlant.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
              accept: '*/*',
            },
          }
        )
        const todayLogs = res.data.filter((log) => isToday(log.timestamp))
        const sum = todayLogs.reduce((acc, log) => acc + log.amountMl, 0)
        setTotalWater(sum)
      } catch (err) {
        console.error('관수 로그 조회 실패', err)
        setTotalWater(0)
      }
    }
    fetchWater()
  }, [selectedPlant, token])

  // 오늘 경고 건수
  const warningCount = useMemo(() => {
    if (!selectedPlant) return 0
    return alerts.filter((log) =>
      log.plant.id === selectedPlant.id && isToday(log.timestamp)
    ).length
  }, [alerts, selectedPlant])

  // 오늘 평균 토양 수분
  const avgSoil = useMemo(() => {
    if (!selectedPlant) return 0
    const { sensorData } = usePlantStore.getState()
    const todayData = sensorData.filter((d) =>
      d.plant.id === selectedPlant.id && isToday(d.timestamp)
    )
    if (todayData.length === 0) return 0
    const sum = todayData.reduce((acc, d) => acc + d.soilMoisture, 0)
    return sum / todayData.length
  }, [selectedPlant, usePlantStore.getState().sensorData])

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
            {warningCount === 0 ? (
              <CiCircleAlert className="text-gray-400 text-2xl mr-2" />
            ) : (
              <GoAlertFill className="text-red-500 text-2xl mr-2" />
            )}
            <span className="text-gray-700 dark:text-gray-300">경고 발생</span>
          </div>
          <span className={`text-lg font-semibold ${warningCount === 0 ? 'text-gray-500 dark:text-gray-400' : 'text-red-600'}`}>
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
