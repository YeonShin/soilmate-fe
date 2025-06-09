import React from 'react'
import { usePlantStore } from '../../store/usePlantStore'

interface Props {
  title: string,
  subTitle: string
}

const DashboardHeader:React.FC<Props> = ({title, subTitle}) => {
  const { plants, selectedPlant, setSelectedPlant } = usePlantStore()

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = Number(e.target.value)
    const plant = plants.find((p) => p.id === id)
    if (plant) setSelectedPlant(plant)
  }

  return (
    <div className='flex item-center justify-between'>
      <div>
        <h1 className='text-2xl font-bold text-gray-900 dark:text-gray-100'>{title}</h1>
        <p className='mt-1 text-gray-500 dark:text-gray-400'>{subTitle}</p>
      </div>
      <select
        id='plant-select'
        value={selectedPlant?.id ?? ''}
        onChange={handleChange}
        className='
              mt-1 block w-full sm:w-64
              pl-3 pr-10 py-2 text-base
              border border-gray-300 dark:border-gray-600
              bg-white dark:bg-gray-700
              placeholder-gray-400 dark:placeholder-gray-500
              rounded-lg shadow-sm
              focus:outline-none
              focus:ring-1 focus:ring-gray-500 dark:focus:ring-gray-400
              focus:border-gray-500 dark:focus:border-gray-400
             text-gray-900 dark:text-gray-100
             hover:bg-gray-50 dark:hover:bg-gray-600
              transition-colors
        '>
        <option value="" disabled>
          식물 선택
        </option>
        {plants.map((plant) => (
          <option key={plant.id} value={plant.id}>
            {plant.name}&#40;{plant.plantType}&#41;
          </option>
        ))}
        </select>
      
    </div>
  )
}

export default DashboardHeader
