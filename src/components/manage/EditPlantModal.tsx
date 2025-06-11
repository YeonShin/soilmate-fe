import React, { useState, useEffect } from 'react'
import { IoClose } from 'react-icons/io5'
import type { Plant } from '../../store/usePlantStore'


interface EditPlantModalProps {
  isOpen: boolean
  setIsOpen:  React.Dispatch<React.SetStateAction<boolean>>
  initialData: Plant
}

export const EditPlantModal: React.FC<EditPlantModalProps> = ({
  isOpen,
  setIsOpen,
  initialData,
}) => {
  const [form, setForm] = useState<Plant>(initialData)

  useEffect(() => {
    setForm(initialData)
  }, [initialData])

  const handleChange =
    (key: keyof Plant) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm(prev => ({
        ...prev,
        [key]: typeof prev[key] === 'number' ? e.target.valueAsNumber : e.target.value,
      }))

  const handleSubmit = () => {
    // save api 요청
    setIsOpen(false);
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              식물 정보 수정
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              식물의 정보를 수정하세요.
            </p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <IoClose className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* Form */}
        <div className="grid grid-cols-2 gap-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              식물 이름 *
            </label>
            <input
              type="text"
              value={form.name}
              onChange={handleChange('name')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              식물 유형 *
            </label>
            <select
              value={form.plantType}
              onChange={handleChange('plantType')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">선택하세요</option>
              <option value="과채류">과채류</option>
              <option value="엽채류">엽채류</option>
              <option value="근채류">근채류</option>
            </select>
          </div>

          {/* Temp range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              최소 온도 (°C)
            </label>
            <input
              type="number"
              value={form.minTemp}
              onChange={handleChange('minTemp')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              최대 온도 (°C)
            </label>
            <input
              type="number"
              value={form.maxTemp}
              onChange={handleChange('maxTemp')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>

          {/* Humidity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              최소 습도 (%)
            </label>
            <input
              type="number"
              value={form.minHumidity}
              onChange={handleChange('minHumidity')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              최대 습도 (%)
            </label>
            <input
              type="number"
              value={form.maxHumidity}
              onChange={handleChange('maxHumidity')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>

          {/* Soil moisture */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              최소 토양 수분 (%)
            </label>
            <input
              type="number"
              value={form.minSoilMoisture}
              onChange={handleChange('minSoilMoisture')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              최대 토양 수분 (%)
            </label>
            <input
              type="number"
              value={form.maxSoilMoisture}
              onChange={handleChange('maxSoilMoisture')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            수정
          </button>
        </div>
      </div>
    </div>
  )
}
