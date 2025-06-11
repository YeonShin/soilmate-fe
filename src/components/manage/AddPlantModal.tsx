// src/components/plant/AddPlantModal.tsx
import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import axios from 'axios'
import { useAuthStore } from '../../store/useAuthStore'

interface AddPlantModalProps {
  onSuccess: () => void     // 성공 시 호출할 콜백
  isOpen: boolean
  setIsOpen:  React.Dispatch<React.SetStateAction<boolean>>
}

const AddPlantModal: React.FC<AddPlantModalProps> = ({
  onSuccess,
  isOpen,
  setIsOpen,
}) => {
  const { token } = useAuthStore();
  const [form, setForm] = useState({
    name: '',
    type: '',
    minTemp: 0,
    maxTemp: 0,
    minHumidity: 0,
    maxHumidity: 0,
    minSoilMoisture: 0,
    maxSoilMoisture: 0,
  })

  const handleChange =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const raw = e.target.value
      const val =
        e.target instanceof HTMLInputElement && e.target.type === 'number'
          ? Number(raw)
          : raw
      setForm((prev) => ({ ...prev, [key]: val }))
    }

  const handleSubmit = async () => {

    // 등록 api 요청
    try {
      const payload = {
        name: form.name,
        plantType: form.type,
        minTemp: form.minTemp,
        maxTemp: form.maxTemp,
        minHumidity: form.minHumidity,
        maxHumidity: form.maxHumidity,
        minSoilMoisture: form.minSoilMoisture,
        maxSoilMoisture: form.maxSoilMoisture,
      }

      await axios.post(
        '/api/plants',
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      )

      alert("작물 정보 등록에 성공하였습니다")
      onSuccess();
      setIsOpen(false);

    } catch (err) {
      console.error("작물 정보 등록 실패", err);
    }

    setIsOpen(false)
  }

  if (!isOpen) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              작물 등록
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              새로운 작물을 등록하세요.
            </p>
          </div>
          <button onClick={() => setIsOpen(false)} className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
            <IoClose className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* 폼 */}
        <div className="grid grid-cols-2 gap-4">
          {/* 이름 */}
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

          {/* 유형 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              식물 유형 *
            </label>
            <select
              value={form.type}
              onChange={handleChange('type')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">선택하세요</option>
              <option value="과채류">과채류</option>
              <option value="엽채류">엽채류</option>
              <option value="근채류">근채류</option>
            </select>
          </div>

          {/* 온도 범위 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              최소 온도 (°C)
            </label>
            <input
              type="number"
              value={form.minTemp}
              onChange={handleChange('minTemp')}
              min={0}
              max={100}
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
              min={0}
              max={100}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>

          {/* 습도 범위 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              최소 습도 (%)
            </label>
            <input
              type="number"
              value={form.minHumidity}
              onChange={handleChange('minHumidity')}
              min={0}
              max={100}
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
              min={0}
              max={100}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>

          {/* 토양 수분 범위 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              최소 토양 수분 (%)
            </label>
            <input
              type="number"
              value={form.minSoilMoisture}
              onChange={handleChange('minSoilMoisture')}
              min={0}
              max={100}
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
              min={0}
              max={100}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
        </div>

        {/* 액션 버튼 */}
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
            등록
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddPlantModal