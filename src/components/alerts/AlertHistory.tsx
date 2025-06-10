import React from 'react'
import { GoAlertFill } from "react-icons/go";
import { CiCircleAlert } from "react-icons/ci";

export interface AlertLog {
  id: number
  plant: { id: number; name: string }
  sensorType: 'temp' | 'humidity' | 'soil_moisture'
  thresholdType: 'min' | 'max'
  value: number
  timestamp: string
}

const SENSOR_LABEL: Record<AlertLog['sensorType'], string> = {
  temp: '온도',
  humidity: '습도',
  soil_moisture: '토양 수분',
}
const THRESHOLD_MSG: Record<AlertLog['thresholdType'], string> = {
  min: '부족',
  max: '초과',
}

interface AlertHistoryProps {
  alerts: AlertLog[]
}


const AlertHistory:React.FC<AlertHistoryProps> = ({alerts}) => {
  return (
  <div className="space-y-4 min-h-[500px] max-h-[500px] overflow-y-auto">
      {alerts.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400 space-y-2">
          <CiCircleAlert className="text-4xl" />
          <span className="text-lg">경고 내역이 없습니다.</span>
        </div>
      )}
    {alerts.map((log) => {
      const sensor = SENSOR_LABEL[log.sensorType]
      const msg = THRESHOLD_MSG[log.thresholdType]
      const unit = log.sensorType === 'temp' ? '°C' : '%'
      const dateStr = new Date(log.timestamp).toLocaleString('ko-KR', {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
      })

      return (
        <div
          key={log.id}
          className="flex justify-between items-center
                     bg-amber-50 dark:bg-amber-900
                     border border-amber-200 dark:border-amber-700
                     rounded-lg p-4"
        >
          <div className="flex items-start space-x-3">
            <GoAlertFill className="text-amber-600 dark:text-amber-400 text-2xl mt-1" />
            <div>
              <div className="font-medium text-gray-900 dark:text-gray-100">
                {log.plant.name} – {sensor} {msg}
              </div>
              <div className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                측정값: {log.value.toFixed(1)}{unit}
              </div>
            </div>
          </div>
          <div className="text-sm text-amber-600 dark:text-amber-400">
            {dateStr}
          </div>
        </div>
      )
    })}
  </div>
  )
}

export default AlertHistory
