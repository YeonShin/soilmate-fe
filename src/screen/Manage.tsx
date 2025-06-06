import React, { useEffect } from 'react'
import { usePlantStore, type Plant, type SensorData } from '../store/usePlantStore';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import AlertBanner from '../components/dashboard/AlertBanner';

const Manage = () => {
  const {setPlants, setSelectedPlant, setSensorData} = usePlantStore();
  
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


  return (
    <div className='p-2 space-y-6'>
      <DashboardHeader title="작물 관리" subTitle='작물 정보를 등록 및 관리하세요' />
      <hr className='h-0.25 border-0 bg-gray-200 dark:bg-gray-600' />

      {true! && <AlertBanner /> }
    </div>
  )
}

export default Manage
