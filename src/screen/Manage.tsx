// src/screens/Manage.tsx
import React, { useEffect, useState } from 'react'
import DashboardHeader from '../components/dashboard/DashboardHeader'
import AlertBanner from '../components/dashboard/AlertBanner'
import { PlantItem } from '../components/manage/PlantItem'
import { AddPlantCard } from '../components/manage/AddPlantCard'
import { usePlantStore, type Plant, type SensorData } from '../store/usePlantStore'
import { AddPlantModal } from '../components/manage/AddPlantModal'
import { EditPlantModal } from '../components/manage/EditPlantModal'

const Manage: React.FC = () => {
  const {plants, selectedPlant, setPlants, setSelectedPlant, setSensorData} = usePlantStore();
  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);

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
        name: '',
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
        name: 'strawberry',
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

  const handleEdit = (p: Plant) => {
    setSelectedPlant(p)
    // 모달 열기 로직…
  }
  const handleDetail = (p: Plant) => {
    setSelectedPlant(p)
    // 상세 모달 열기…
  }
  const handleDelete = (p: Plant) => {
    // API 호출 후 스토어 갱신…
  }
  const handleAdd = () => {
    // 추가 모달 열기…
  }

  return (
    <>
      <div className="p-6 space-y-6">
        <DashboardHeader
          title="식물 관리"
          subTitle="작물 정보를 등록 및 관리하세요"
        />
        <hr className="h-0.5 border-0 bg-gray-200 dark:bg-gray-600" />
        {true! && <AlertBanner /> }

        {/* Plant Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {plants.map((p) => (
            <PlantItem
              key={p.id}
              plant={p}
              onEdit={handleEdit}
              onDetail={handleDetail}
              onDelete={handleDelete}
              setEditOpen={setIsEditOpen}
            />
          ))}
          {/* 추가 카드 */}
          <AddPlantCard onAdd={handleAdd} setIsOpen={setIsAddOpen} />
        </div>
      </div>
      {isAddOpen && <AddPlantModal isOpen={isAddOpen} setIsOpen={setIsAddOpen}  />}
      {isEditOpen && <EditPlantModal isOpen={isEditOpen} setIsOpen={setIsEditOpen} initialData={selectedPlant!} />}
    </>
  )
}

export default Manage
