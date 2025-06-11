// src/screens/Manage.tsx
import React, { useEffect, useState } from 'react'
import DashboardHeader from '../components/dashboard/DashboardHeader'
import AlertBanner from '../components/dashboard/AlertBanner'
import { PlantItem } from '../components/manage/PlantItem'
import { AddPlantCard } from '../components/manage/AddPlantCard'
import { usePlantStore, type Plant } from '../store/usePlantStore'
import { AddPlantModal } from '../components/manage/AddPlantModal'
import { EditPlantModal } from '../components/manage/EditPlantModal'
import axios from 'axios'

const Manage: React.FC = () => {
  const {plants, selectedPlant, setPlants, setSelectedPlant} = usePlantStore();
  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchPlants = async () => {
    try {
      const res = await axios.get<Plant[]>(`http://localhost:8080/api/plants`)
      setPlants(res.data)
    } catch (error) {
      console.error('식물 목록 불러오기 실패:', error)
      // 필요시 에러 처리 로직 추가
    }
    }

    fetchPlants();
    // 2) 스토어에 넣기
  }, [setPlants])

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
          <AddPlantCard  setIsOpen={setIsAddOpen} />
        </div>
      </div>
      {isAddOpen && <AddPlantModal setPlants={setPlants} isOpen={isAddOpen} setIsOpen={setIsAddOpen}  />}
      {isEditOpen && <EditPlantModal isOpen={isEditOpen} setIsOpen={setIsEditOpen} initialData={selectedPlant!} />}
    </>
  )
}

export default Manage
