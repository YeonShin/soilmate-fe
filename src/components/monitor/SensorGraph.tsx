import React from 'react'
import { CiCircleAlert } from "react-icons/ci";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'


type SensorType = 'temperature' | 'humidity' | 'soilMoisture'

interface PlantStatusLog {
  timestamp: string
  temperature: number
  humidity: number
  soilMoisture: number
}

interface SensorGraphProps {
  type: SensorType,
  logs: PlantStatusLog[],
  loading: boolean
}

const TYPE_CONFIG: Record<
  SensorType,
  { label: string; color: string; unit: string }
> = {
  temperature: { label: '온도', color: '#F56565', unit: '℃' },
  humidity:    { label: '습도', color: '#4299E1', unit: '%'  },
  soilMoisture:{ label: '토양 수분', color: '#D69E2E', unit: '%'  },
}

const SensorGraph: React.FC<SensorGraphProps> = ({type, logs, loading}) => {


  const data = logs.map((log) => ({
    time: new Date(log.timestamp).toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
    }),
    value: log[type],
  }))

  const { label, color, unit } = TYPE_CONFIG[type]

  return (
    <div className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
      {/* 1) 범위 선택 UI */}
      <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
        {label}
      </h4>

      {/* 2) 차트 */}
      {logs === null ? (
      <div className="h-64">
        {loading ? (
          <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
            로딩 중...
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />
              <XAxis dataKey="time" tick={{ fill: '#6b7280' }} />
              <YAxis
                tick={{ fill: '#6b7280' }}
                unit={unit}
                domain={['auto', 'auto']}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  borderRadius: '4px',
                  borderColor: '#e5e7eb',
                }}
                labelFormatter={(lbl) => `시간: ${lbl}`}
                formatter={(val: number) => [`${val}${unit}`, label]}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke={color}
                dot={{ r: 3, strokeWidth: 2, fill: color }}
                strokeWidth={2}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400 space-y-2 py-8">
          <CiCircleAlert className="text-4xl" />
          <span className="text-lg">최근 관수 내역이 없습니다.</span>
        </div>
      )}

    </div>
  )
}

export default SensorGraph
