// src/components/dashboard/SensorCard.tsx
import React from 'react'
import { usePlantStore } from '../../store/usePlantStore'
import { MdGrass } from 'react-icons/md'
import { FaTemperatureHalf } from 'react-icons/fa6'
import { IoIosWater } from 'react-icons/io'

type SensorType = 'temperature' | 'humidity' | 'soilMoisture'

interface SensorCardProps {
  type: SensorType
}

const SensorCard: React.FC<SensorCardProps> = ({ type }) => {
  const { selectedPlant, sensorData } = usePlantStore()
  if (!selectedPlant) return null

  // 타입별 설정: 제목, 단위, 값 범위, 아이콘, 아이콘 색상
  const config: Record<SensorType, {
    title: string
    unit: string
    value: number
    min: number
    max: number
    Icon: React.ElementType
    iconColor: string
  }> = {
    temperature: {
      title: '대기 온도',
      unit: '°C',
      value: sensorData.temperature,
      min: selectedPlant.minTemp,
      max: selectedPlant.maxTemp,
      Icon: FaTemperatureHalf,
      iconColor: 'text-red-500'
    },
    humidity: {
      title: '대기 습도',
      unit: '%',
      value: sensorData.humidity,
      min: selectedPlant.minHumidity,
      max: selectedPlant.maxHumidity,
      Icon: IoIosWater,
      iconColor: 'text-blue-500'
    },
    soilMoisture: {
      title: '토양 수분',
      unit: '%',
      value: sensorData.soilMoisture,
      min: selectedPlant.minSoilMoisture,
      max: selectedPlant.maxSoilMoisture,
      Icon: MdGrass,
      iconColor: 'text-orange-700'
    }
  }

  const { title, unit, value, min, max, Icon, iconColor } = config[type]

  // 상태 판정
  let statusLabel: string
  let statusColor: 'green' | 'red'

  if (value < min) {
    statusLabel = '낮음'
    statusColor = 'red'
  } else if (value > max) {
    statusLabel = '높음'
    statusColor = 'red'
  } else {
    statusLabel = '정상'
    statusColor = 'green'
  }

  const percent = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100))

  return (
    <div className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
      {/* 헤더 */}
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">{title}</h3>
        <Icon className={`text-2xl ${iconColor}`} />
      </div>

      {/* 값 & 단위 */}
      <div className="mt-2 flex items-baseline">
        <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {value.toFixed(1)}
        </span>
        <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">{unit}</span>
      </div>

      {/* 상태 배지 */}
      <span
        className={
          `inline-block mt-1 px-2 py-0.5 text-xs font-medium 
           bg-${statusColor}-100 dark:bg-${statusColor}-900
           text-${statusColor}-800 dark:text-gray-100
           rounded-full`
        }
      >
        {statusLabel}
      </span>

      {/* 프로그레스바 + 범위 */}
      <div className="mt-4 flex items-center">
        <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className={`h-full bg-${statusColor}-500`}
            style={{ width: `${percent}%` }}
          />
        </div>
        <div className="ml-3 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
          {min}{unit} ~ {max}{unit}
        </div>
      </div>
    </div>
  )
}

export default SensorCard
