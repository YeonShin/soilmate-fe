import React, { useEffect, useState } from 'react'
import { usePlantStore, type Plant, type SensorData } from '../store/usePlantStore';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import AlertBanner from '../components/dashboard/AlertBanner';
import SensorGraph from '../components/monitor/SensorGraph';
import axios from 'axios';

interface PlantStatusLog {
  timestamp: string
  temperature: number
  humidity: number
  soilMoisture: number
}

const Monitoring = () => {
  const {selectedPlant, setPlants, setSelectedPlant, setSensorData} = usePlantStore();
  const [loading, setLoading] = useState(false)
  const [logs, setLogs] = useState<PlantStatusLog[]>([])

   const fetchLogs = async () => {
    if (!selectedPlant) return
    setLoading(true)
    try {
      const res = await axios.get<PlantStatusLog[]>(
        `/api/sensors/logs/plant/${selectedPlant.id}/range`,
        { params: { start, end } }
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
      // now ~ 5시간 전까지 1h 간격 6포인트
      const now = new Date()
      const dummy: PlantStatusLog[] = Array.from({ length: 6 }).map((_, i) => {
        const date = new Date(now.getTime() - (5 - i) * 60 * 60 * 1000)
        // 타입별 더미 값 (임의로 증가/감소 패턴)
        return {
          timestamp: date.toISOString(),
          temperature: 60 - i * 2,        // 60,58,56...
          humidity:    45 + i * 1.5,      // 45,46.5,48...
          soilMoisture: 25 + i * 0.8,     // 25,25.8,26.6...
        }
      })
      setLogs(dummy)
      setLoading(false)
  
      // 나중에 API 쓰실 때 이렇게 바꿔주세요
      /*
      if (!selectedPlant) return
      axios
        .get<PlantStatusLog[]>(`/api/sensors/logs/plant/${selectedPlant.id}/range`, {
          params: {
            start: /* ISO string * /,
            end:   /* ISO string * /,
          },
        })
        .then(res => setLogs(res.data))
        .catch(console.error)
      */
    }, [selectedPlant])

    useEffect(() => {
      const dummyPlants: Plant[] = [
        {
          id: 1,
          name: '토마토',
          plantType: '과채류',
          minTemp: 20,
          maxTemp: 30,
          minHumidity: 60,
          maxHumidity: 80,
          minSoilMoisture: 30,
          maxSoilMoisture: 70,
        },
        {
          id: 2,
          name: '상추',
          plantType: '엽채류',
          minTemp: 15,
          maxTemp: 25,
          minHumidity: 65,
          maxHumidity: 90,
          minSoilMoisture: 40,
          maxSoilMoisture: 80,
        },
        {
          id: 3,
          name: '딸기',
          plantType: '과채류',
          minTemp: 18,
          maxTemp: 28,
          minHumidity: 65,
          maxHumidity: 85,
          minSoilMoisture: 35,
          maxSoilMoisture: 75,
        },
      ]
  
      // 2) 더미 센서 데이터
      const dummySensorData: SensorData = {
        temperature: 25.5,
        humidity: 82.5,
        soilMoisture: 22.5,
      }
  
      // 2) 스토어에 넣기
      setPlants(dummyPlants)
      // setSelectedPlant(dummyPlants[0])
      setSensorData(dummySensorData)
    }, [setPlants, setSelectedPlant, setSensorData])

  const now = new Date()
  const oneHourAgo = new Date(now.getTime() - 60*60*1000)
  const [start, setStart] = useState(oneHourAgo.toISOString().slice(0,16))
  const [end, setEnd]     = useState(now      .toISOString().slice(0,16))

  return (
    <div className='p-2 space-y-6'>
      <DashboardHeader title="모니터링" subTitle='실시간 작물 상태를 모니터링 하세요' />

      <hr className='h-0.25 border-0 bg-gray-200 dark:bg-gray-600' />

      {true! && <AlertBanner /> }
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
