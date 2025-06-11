// src/screens/Manage.tsx
import React, { useEffect, useState } from 'react'
import DashboardHeader from '../components/dashboard/DashboardHeader'
import AlertBanner from '../components/dashboard/AlertBanner'
import { PlantItem } from '../components/manage/PlantItem'
import { AddPlantCard } from '../components/manage/AddPlantCard'
import { usePlantStore } from '../store/usePlantStore'
import { EditPlantModal } from '../components/manage/EditPlantModal'
import axios from 'axios'
import { useAuthStore } from '../store/useAuthStore'
import AddPlantModal from '../components/manage/AddPlantModal'

const Manage: React.FC = () => {
  const {plants, selectedPlant, setPlants} = usePlantStore();
  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const { token } = useAuthStore();

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

  useEffect(() => {


    fetchPlants();
    // 2) 스토어에 넣기 
  }, [])



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
              setEditOpen={setIsEditOpen}
              onSuccess={fetchPlants}
            />
          ))}
          {/* 추가 카드 */}
          <AddPlantCard  setIsOpen={setIsAddOpen} />
        </div>
      </div>
      {isAddOpen && <AddPlantModal onSuccess={fetchPlants} isOpen={isAddOpen} setIsOpen={setIsAddOpen}  />}
      {isEditOpen && <EditPlantModal isOpen={isEditOpen} setIsOpen={setIsEditOpen} initialData={selectedPlant!} onSuccess={fetchPlants} />}
    </>
  )
}

export default Manage
