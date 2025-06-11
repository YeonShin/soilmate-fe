import React, { useEffect } from 'react'
import DashboardHeader from '../components/dashboard/DashboardHeader'
import AlertBanner from '../components/dashboard/AlertBanner'
import WeatherCard from '../components/dashboard/WeatherCard'
import SensorCard from '../components/dashboard/SensorCard'
import SystemStatus from '../components/dashboard/SystemStatus'
import TodaySummary from '../components/dashboard/TodaySummary'
import { usePlantStore } from '../store/usePlantStore'
import { useAlertStore } from '../store/useAlertStore'
import { useAuthStore } from '../store/useAuthStore'
import axios from 'axios'

const Dashboard = () => {
  const {selectedPlant, setSensorData} = usePlantStore();
  const {alerts} = useAlertStore()
  const {token} = useAuthStore()

 useEffect(() => {
   if (!selectedPlant) return

   const fetchSensorData = async () => {
     try {
       // URL 끝에 슬래시가 빠지지 않도록 주의!
       const res = await axios.get(
         `/api/sensors/logs/plant/${selectedPlant.id}`,
         {
           headers: {
             Authorization: `Bearer ${token}`,
             'Content-Type': 'application/json',
           },
         }
       )
       setSensorData(res.data)
     } catch (err) {
       console.error('센서 정보 조회 실패', err)
     }
   }

   // 1) 즉시 한 번 불러오기
   fetchSensorData()

   // 2) 10초마다 반복
   const intervalId = setInterval(fetchSensorData, 10_000)

   // 3) 컴포넌트 언마운트 또는 selectedPlant 변경 시 정리
   return () => clearInterval(intervalId)
 }, [selectedPlant, token, setSensorData])




  return (
    <div className='p-2 space-y-6'>
      <DashboardHeader title="대시보드" subTitle="실시간 농장 상태를 모니터링하고 관리하세요"/>


      <hr className='h-0.25 border-0 bg-gray-200 dark:bg-gray-600' />

      {alerts.length > 0 && <AlertBanner /> }

      <div className='grid grid-cols-1 lg:grid-cols-1 gap-6'>
        <WeatherCard />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6' >
        <SensorCard type="temperature" />
        <SensorCard type="humidity" />
        <SensorCard type="soilMoisture" />
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <SystemStatus />
        <TodaySummary />
      </div>
    </div>
  )
}

export default Dashboard
