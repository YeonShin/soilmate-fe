// src/components/dashboard/SensorCard.tsx
import React, { useEffect, useState } from 'react'
import { usePlantStore } from '../../store/usePlantStore'
import { MdGrass } from 'react-icons/md'
import { FaTemperatureHalf } from 'react-icons/fa6'
import { IoIosWater } from 'react-icons/io'
import { ClipLoader } from 'react-spinners'

type SensorType = 'temperature' | 'humidity' | 'soilMoisture'

interface SensorCardProps {
  type: SensorType
}

export const SensorCard: React.FC<SensorCardProps> = ({ type }) => {
  const { selectedPlant, sensorData } = usePlantStore()
  const [fillPercent, setFillPercent] = useState(0)

  // 가장 최신 데이터 찾기
  const latestData =
    sensorData && sensorData.length > 0
      ? sensorData.reduce((prev, cur) =>
          new Date(prev.timestamp) > new Date(cur.timestamp) ? prev : cur
        )
      : null

  // 선택된 식물이 없거나, 최신 데이터가 없으면 0
  const value = latestData
    ? type === 'temperature'
      ? latestData.temperature
      : type === 'humidity'
      ? latestData.humidity
      : latestData.soilMoisture
    : 0

  // 최소/최대 범위
  const min =
    type === 'temperature'
      ? selectedPlant?.minTemp ?? 0
      : type === 'humidity'
      ? selectedPlant?.minHumidity ?? 0
      : selectedPlant?.minSoilMoisture ?? 0
  const max =
    type === 'temperature'
      ? selectedPlant?.maxTemp ?? 1
      : type === 'humidity'
      ? selectedPlant?.maxHumidity ?? 1
      : selectedPlant?.maxSoilMoisture ?? 1

  // 각 타입별 고정 설정
  const configStatic = {
    temperature: {
      title: '대기 온도',
      unit: '°C',
      Icon: FaTemperatureHalf,
      iconColor: 'text-red-500',
    },
    humidity: {
      title: '대기 습도',
      unit: '%',
      Icon: IoIosWater,
      iconColor: 'text-blue-500',
    },
    soilMoisture: {
      title: '토양 수분',
      unit: '%',
      Icon: MdGrass,
      iconColor: 'text-orange-700',
    },
  } as const
  const { title, unit, Icon, iconColor } = configStatic[type]

  // 퍼센트 계산
  const percent = selectedPlant
    ? Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100))
    : 0

  // 애니메이션
  useEffect(() => {
    if (!selectedPlant) {
      setFillPercent(0)
      return
    }
    const timer = setTimeout(() => setFillPercent(percent), 50)
    return () => clearTimeout(timer)
  }, [percent, selectedPlant])

  // 로딩 조건
  const isLoading =
    !selectedPlant || !latestData || latestData.plant?.id !== selectedPlant.id

  // 상태 텍스트·색상
  const isTooLow = value < min
  const isTooHigh = value > max
  const statusLabel = isTooLow ? '낮음' : isTooHigh ? '높음' : '정상'

  // 클래스 분기 (Tailwind 동적 클래스 피하기 위해 분기)
  const bgBadge = isTooLow || isTooHigh
    ? 'bg-red-100 dark:bg-red-900'
    : 'bg-green-100 dark:bg-green-900'
  const textBadge = isTooLow || isTooHigh
    ? 'text-red-800 dark:text-gray-100'
    : 'text-green-800 dark:text-gray-100'
  const progressBarColor = isTooLow || isTooHigh
    ? 'bg-red-500'
    : 'bg-green-500'

  return (
    <div className="relative border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
      {isLoading && (
        <div className="absolute inset-0 z-10 bg-white bg-opacity-70 dark:bg-gray-800 dark:bg-opacity-70 flex flex-col items-center justify-center rounded-lg">
          <ClipLoader size={32} className="text-gray-500 dark:text-gray-400" />
          <span className="mt-2 text-gray-700 dark:text-gray-300">로딩 중…</span>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
          {title}
        </h3>
        <Icon className={`text-2xl ${iconColor}`} />
      </div>


      {/* Value */}
      <div className="mt-2 flex items-baseline">
        <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {value.toFixed(1)}
        </span>
        <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">
          {unit}
        </span>
      </div>

      {/* Badge */}
      <span className={`inline-block mt-1 px-2 py-0.5 text-xs font-medium rounded-full ${bgBadge} ${textBadge}`}>
        {statusLabel}
      </span>

      {/* Progress */}
      <div className="mt-4 flex items-center">
        <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className={`h-full ${progressBarColor} transition-width duration-[800ms] ease-out`}
            style={{ width: `${fillPercent}%` }}
          />
        </div>
        <div className="ml-3 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
          {min}
          {unit} ~ {max}
          {unit}
        </div>
      </div>
    </div>
  )
}

export default SensorCard
