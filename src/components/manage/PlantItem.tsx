// src/components/dashboard/PlantItem.tsx
import React, { useEffect, useState } from 'react'
import { FaTemperatureFull } from 'react-icons/fa6'
import { IoIosWater }    from 'react-icons/io'
import { MdGrass }       from 'react-icons/md'
import { FiEdit2, FiTrash2 } from 'react-icons/fi'
import { fetchFirstSearchPhoto } from '../../api/unplash'

export interface Plant {
  id: number
  name: string
  plantType: string
  minTemp: number
  maxTemp: number
  minHumidity: number
  maxHumidity: number
  minSoilMoisture: number
  maxSoilMoisture: number
}

interface Props {
  plant: Plant
  onEdit: (p: Plant) => void
  onDelete: (p: Plant) => void

  setEditOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const PlantItem: React.FC<Props> = ({ plant, onEdit, onDelete, setEditOpen }) => {
    const [imgUrl, setImgUrl] = useState<string>('/fallback-plant.png')


    useEffect(() => {
    let canceled = false

    // 1) 랜덤 사진
    // fetchRandomPhoto(plant.name)
    //   .then((url) => {
    //     if (!canceled) setImgUrl(url)
    //   })
    //   .catch((err) => {
    //     // 실패 시 fallback
    //     console.error(err);
    //   })

    // // 2) 검색 첫 번째 사진
    fetchFirstSearchPhoto(plant.name).then(url => {
      if (url && !canceled) setImgUrl(url)
    })

    return () => {
      canceled = true
    }
  }, [plant.name])

  return (
    <div className="flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      {/* 이미지 영역 */}
      <div className="relative w-full h-40">
        <img
          src={imgUrl}
          alt={plant.name}
          className="object-cover w-full h-full"
        />
        <span className="absolute top-2 left-2 bg-gray-800/70 text-white text-xs px-2 py-1 rounded">
          작물 ID: {plant.id}
        </span>
      </div>

      {/* 콘텐츠 */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {plant.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            {plant.plantType}
          </p>

          {/* 임계값 */}
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li className="flex items-center">
              <FaTemperatureFull className="w-5 h-5 text-red-500 mr-2" />
              임계 온도
              <span className="ml-auto">
                {plant.minTemp}°C - {plant.maxTemp}°C
              </span>
            </li>
            <li className="flex items-center">
              <IoIosWater className="w-5 h-5 text-blue-500 mr-2" />
              임계 습도
              <span className="ml-auto">
                {plant.minHumidity}% - {plant.maxHumidity}%
              </span>
            </li>
            <li className="flex items-center">
              <MdGrass className="w-5 h-5 text-yellow-500 mr-2" />
              임계 토양 수분
              <span className="ml-auto">
                {plant.minSoilMoisture}% - {plant.maxSoilMoisture}%
              </span>
            </li>
          </ul>
        </div>

        {/* 버튼 그룹 */}
        <div className="mt-4 flex space-x-2">
          <button
            onClick={() => {setEditOpen(true); onEdit(plant)}}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition"
          >
            <FiEdit2 className="w-4 h-4" />
            수정
          </button>
          <button
            onClick={() => onDelete(plant)}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
          >
            <FiTrash2 className="w-4 h-4" />
            삭제
          </button>
        </div>
      </div>
    </div>
  )
}
