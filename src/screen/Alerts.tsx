import React, { useEffect, useState } from 'react'
import { usePlantStore } from '../store/usePlantStore';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import type { AlertLog } from '../components/alerts/AlertHistory';
import axios from 'axios';
import { ClipLoader } from 'react-spinners'
import AlertHistory from '../components/alerts/AlertHistory';
import { useAuthStore } from '../store/useAuthStore';

const TABS = [
  { key: 'all'           as const, label: '전체' },
  { key: 'temp'          as const, label: '온도' },
  { key: 'humidity'      as const, label: '습도' },
  { key: 'soil_moisture' as const, label: '토양 수분' },
]
type TabKey = typeof TABS[number]['key']

const sensorMap: Record<TabKey, string> = {
  all: '',
  temp: 'temp',         // 백엔드 sensor/temperature 엔드포인트 사용
  humidity: 'humidity',
  soil_moisture: 'soil_moisture',
}


const Alerts = () => {
  const {selectedPlant, setPlants} = usePlantStore();
  const [activeTab, setActiveTab] = useState<TabKey>('all')
  const [loading, setLoading] = useState(false)
  const [alerts, setAlerts] = useState<AlertLog[]>([]) 
  const {token} = useAuthStore();

  const fetchPlants = async () => {
    try {
      const res = await axios.get(
        `/api/plants`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      )

      setPlants(res.data);
    } catch (err) {
      console.error("작물 정보 조회 실패", err)
    }
  } 

  const fetchAlerts = async () => {
    if (selectedPlant === null) return;
    setLoading(true);

    let url = `/api/alerts/plant/${selectedPlant.id}`
      if (activeTab !== 'all') {
        url += `/sensor/${sensorMap[activeTab]}`
      }

    try {
      const res = await axios.get<AlertLog[]>(
        url,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      )
      
      setAlerts(res.data)
      setLoading(false);
    } catch (err) {
      console.error("센서 오류 조회 실패", err)
    }
  }



  useEffect(() => {
    fetchPlants()
  }, [])

  useEffect(() => {
    fetchAlerts()
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
