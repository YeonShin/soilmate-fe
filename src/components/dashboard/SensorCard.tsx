// src/components/dashboard/SensorCard.tsx
import React, { useState, useEffect } from 'react' 
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
  const [fillPercent, setFillPercent] = useState(0)

  // 2) selectedPlant가 없을 때도 정의될 수 있는 기본 config
  const fallback = {
    title: '',
    unit: '',
    value: 0,
    min: 0,
    max: 1,
    Icon: MdGrass,
    iconColor: 'text-gray-400',
  }

  const configMap: Record<SensorType, typeof fallback> = {
    temperature: {
      title: '대기 온도',
      unit: '°C',
      value: sensorData.temperature,
      min: selectedPlant?.minTemp ?? 0,
      max: selectedPlant?.maxTemp ?? 1,
      Icon: FaTemperatureHalf,
      iconColor: 'text-red-500',
    },
    humidity: {
      title: '대기 습도',
      unit: '%',
      value: sensorData.humidity,
      min: selectedPlant?.minHumidity ?? 0,
      max: selectedPlant?.maxHumidity ?? 1,
      Icon: IoIosWater,
      iconColor: 'text-blue-500',
    },
    soilMoisture: {
      title: '토양 수분',
      unit: '%',
      value: sensorData.soilMoisture,
      min: selectedPlant?.minSoilMoisture ?? 0,
      max: selectedPlant?.maxSoilMoisture ?? 1,
      Icon: MdGrass,
      iconColor: 'text-orange-700',
    },
  }

  const { title, unit, value, min, max, Icon, iconColor } =
    configMap[type] || fallback

  // 3) percent도 무조건 계산
  const percent = selectedPlant
    ? Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100))
    : 0

  // 4) 애니메이션용 훅도 최상단에서 호출
  useEffect(() => {
    if (!selectedPlant) {
      setFillPercent(0)
      return
    }
    const timer = setTimeout(() => setFillPercent(percent), 50)
    return () => clearTimeout(timer)
  }, [percent, selectedPlant])

  // 5) 실제 렌더링은 여기서 체크
  if (!selectedPlant) return null

  // 6) 상태 텍스트
  const statusColor = value < min || value > max ? 'red' : 'green'
  const statusLabel =
    value < min ? '낮음' : value > max ? '높음' : '정상'



  return (
    <div className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
      {/* 헤더 */}
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">{title}</h3>
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
            className={`
              h-full bg-${statusColor}-500
              transition-width duration-[800ms] ease-out
            `}
            style={{ width: `${fillPercent}%` }}
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
