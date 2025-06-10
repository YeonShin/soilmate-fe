import React, { useEffect, useState } from 'react'
import { usePlantStore, type Plant, type SensorData } from '../store/usePlantStore';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import type { AlertLog } from '../components/alerts/AlertHistory';
import axios from 'axios';
import { ClipLoader } from 'react-spinners'
import AlertHistory from '../components/alerts/AlertHistory';

const TABS = [
  { key: 'all'           as const, label: '전체' },
  { key: 'temp'          as const, label: '온도' },
  { key: 'humidity'      as const, label: '습도' },
  { key: 'soil_moisture' as const, label: '토양 수분' },
]
type TabKey = typeof TABS[number]['key']

const dummyAlerts: AlertLog[] = [
  {
    id: 1,
    plant: { id: 1, name: '토마토' },
    sensorType: 'soil_moisture',
    thresholdType: 'min',
    value: 28.5,
    timestamp: '2025-06-09T14:30:00',
  },
  {
    id: 2,
    plant: { id: 2, name: '상추' },
    sensorType: 'temp',
    thresholdType: 'max',
    value: 32.1,
    timestamp: '2025-06-09T13:15:00',
  },
  {
    id: 3,
    plant: { id: 1, name: '토마토' },
    sensorType: 'humidity',
    thresholdType: 'max',
    value: 92.3,
    timestamp: '2025-06-09T12:00:00',
  },
  {
    id: 4,
    plant: { id: 3, name: '딸기' },
    sensorType: 'temp',
    thresholdType: 'min',
    value: 17.8,
    timestamp: '2025-06-09T11:30:00',
  },
  {
    id: 5,
    plant: { id: 2, name: '상추' },
    sensorType: 'soil_moisture',
    thresholdType: 'max',
    value: 82.0,
    timestamp: '2025-06-09T10:00:00',
  },
]

const Alerts = () => {
  const {selectedPlant, setPlants, setSelectedPlant, setSensorData} = usePlantStore();
  const [activeTab, setActiveTab] = useState<TabKey>('all')
  const [alerts, setAlerts]   = useState<AlertLog[]>([])
  const [loading, setLoading] = useState(false)

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
    setSensorData(dummySensorData)
  }, [setPlants, setSelectedPlant, setSensorData])

  useEffect(() => {
    if (!selectedPlant) return
    setLoading(true)
    const url =
      activeTab === 'all'
        ? `/api/alerts/plant/${selectedPlant.id}`                   // 전체 조회
        : `/api/alerts/plant/${selectedPlant.id}/sensor/${activeTab}` // 필터 조회

    const filtered =
      activeTab === 'all'
        ? dummyAlerts
            .filter(a => a.plant.id === selectedPlant.id)
        : dummyAlerts
            .filter(a => a.plant.id === selectedPlant.id && a.sensorType === activeTab)

    setAlerts(filtered);
    setLoading(false);

    // api 연결시 주석 해제
    // axios
    //   .get<AlertLog[]>(url)
    //   .then((res) => setAlerts(res.data))
    //   .catch(console.error)
    //   .finally(() => setLoading(false))


  }, [activeTab, selectedPlant])
  
  return (
    <div className='p-2 space-y-6'>
      <DashboardHeader title="경고 알림 내역" subTitle="센서 임계값 초과로 발생한 경고를 확인하세요"/>
      <hr className='h-0.25 border-0 bg-gray-200 dark:bg-gray-600' />

      <div className='flex space-x-4 border-b border-gray-200 dark:border-gray-700'>
        {TABS.map(({key, label}) => (
          <button key={key} onClick={() => setActiveTab(key)}
          className={`
            pb-2
              ${activeTab === key
                ? 'border-b-2 border-green-500 font-semibold text-gray-900 dark:text-gray-100'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
              }
              transition
            `}
            >{label}</button>
        ))}
      </div>

      <div className="relative">
        {loading && (
          <div className="absolute inset-0 bg-white bg-opacity-70 dark:bg-gray-800 dark:bg-opacity-70 flex items-center justify-center rounded-lg">
            <ClipLoader size={36} color="#4A5568" />
          </div>
        )}
        <AlertHistory alerts={alerts} />
      </div>
    </div>
  )
}

export default Alerts
