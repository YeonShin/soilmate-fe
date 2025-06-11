// src/components/dashboard/AddPlantCard.tsx
import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import type { Plant } from '../../store/usePlantStore'

interface Props {

  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const AddPlantCard: React.FC<Props> = ({  setIsOpen }) => (
  <button
    onClick={() => setIsOpen(true)}
    className="
      flex items-center justify-center flex-col
      w-full h-64
      bg-gray-100 dark:bg-gray-700
      border-2 border-dashed border-gray-300 dark:border-gray-600
      rounded-lg
      text-gray-500 dark:text-gray-300
      hover:bg-gray-200 dark:hover:bg-gray-600
      transition
    "
  >
    <AiOutlinePlus className="w-8 h-8 mb-2" />
    <span className="text-lg font-medium">추가</span>
  </button>
)
