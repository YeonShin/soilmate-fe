import React, { useEffect, useState } from 'react'
import { usePlantStore, type Plant} from '../store/usePlantStore';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import AlertBanner from '../components/dashboard/AlertBanner';
import SensorGraph from '../components/monitor/SensorGraph';
import axios from 'axios';
import { useAlertStore } from '../store/useAlertStore';
import { useAuthStore } from '../store/useAuthStore';


interface PlantStatusLog {
  id: number
  plant: Plant
  temperature: number
  humidity: number
  soilMoisture: number
  timestamp: string
}

const Monitoring = () => {
  const {selectedPlant} = usePlantStore();
  const {alerts} = useAlertStore()
  const [loading, setLoading] = useState(false)
  const [logs, setLogs] = useState<PlantStatusLog[]>([])

  const now = new Date()
  const oneHourAgo = new Date(now.getTime() - 60*60*1000)
  const [start, setStart] = useState(oneHourAgo.toISOString().slice(0,16))
  const [end, setEnd]     = useState(now      .toISOString().slice(0,16))
  const { token } = useAuthStore();

   const fetchLogs = async () => {
    if (!selectedPlant) return
    setLoading(true)
    try {
      const res = await axios.get<PlantStatusLog[]>(
        `/api/sensors/logs/plant/${selectedPlant.id}/range`,
        { params: { start, end },
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            }
      },

      )
      // API 결과는 오래된 순 → recharts에 그대로 넘겨도 OK
      setLogs(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

    useEffect(() => {
      fetchLogs()
    }, [selectedPlant])



  return (
    <div className='p-2 space-y-6'>
      <DashboardHeader title="모니터링" subTitle='실시간 작물 상태를 모니터링 하세요' />

      <hr className='h-0.25 border-0 bg-gray-200 dark:bg-gray-600' />

      {alerts.length > 0 && <AlertBanner /> }
      <div className="flex items-center space-x-2">
        <input
          type="datetime-local"
          value={start}
          onChange={e => setStart(e.target.value)}
          className="h-10 w-auto rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 text-sm text-gray-800 dark:text-gray-100
                     focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
        />
        <span className="text-gray-500 dark:text-gray-400">~</span>
        <input
          type="datetime-local"
          value={end}
          onChange={e => setEnd(e.target.value)}
          className="h-10 w-auto rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 text-sm text-gray-800 dark:text-gray-100
                     focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
        />
        <button type='button' className='
          cursor-pointer
          h-10 px-4
          bg-green-500 hover:bg-green-600
          dark:bg-green-900 dark:hover:bg-green-700
          text-white font-medium
          rounded-md
          focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-green-300
          transition' onClick={fetchLogs}>
          조회
        </button>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6' >
        <SensorGraph type="temperature"  logs={logs} loading={loading} />
        <SensorGraph type="humidity"   logs={logs} loading={loading}/>
        <SensorGraph type="soilMoisture" logs={logs} loading={loading}/>
      </div>

    </div>
  )
}

export default Monitoring
