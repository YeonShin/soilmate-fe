import React, { useEffect, useState } from 'react'
import { usePlantStore, type Plant, type SensorData } from '../store/usePlantStore';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import AlertBanner from '../components/dashboard/AlertBanner';
import ControlIrrigation from '../components/irrigation/ControlIrrigation';
import IrrigationLogs from '../components/irrigation/IrrigationLogs';

interface IrrigationLog {
  id: number
  plant: Plant
  amountMl: number
  method: 'auto' | 'manual'
  timestamp: string
}

const Irrigation = () => {
  const {selectedPlant, setPlants, setSelectedPlant, setSensorData} = usePlantStore();
  const [loading, setLoading] = useState(false)
  const [logs, setLogs] = useState<IrrigationLog[]>([])

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

    const handleIrrigate = (amountMl: number) => {
    if (!selectedPlant) return
    setLoading(true)
    // 나중에 API 호출
    const newLog: IrrigationLog = {
      id: Date.now(),
      plant: selectedPlant,
      amountMl,
      method: 'manual',
      timestamp: new Date().toISOString(),
    }
    // 더미 반영
    setLogs((prev) => [newLog, ...prev])
    setLoading(false)
  }

  return (
    <div className='p-2 space-y-6'>
      <DashboardHeader title="관수 제어" subTitle='작물의 수동 관수 및 관수 기록을 확인하세요요' />

      <hr className='h-0.25 border-0 bg-gray-200 dark:bg-gray-600' />

      {true! && <AlertBanner /> }
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <ControlIrrigation onIrrigate={handleIrrigate} disabled={loading}  />
        <IrrigationLogs />
      </div>
    </div>
  )
}

export default Irrigation
