import React, { useEffect, useState } from 'react'
import { usePlantStore } from '../../store/usePlantStore'
import { IoIosWater } from 'react-icons/io'
import axios from 'axios'
import { useAuthStore } from '../../store/useAuthStore'

interface ControlIrrigationProps {
  onSuccess: () => void
}

const ControlIrrigation:React.FC<ControlIrrigationProps> = ({onSuccess}) => {
  const { selectedPlant } = usePlantStore()
  const [amount, setAmount] = useState<number>(0)
  const {token} = useAuthStore();
  const [disabled, setDisabled] = useState<boolean>(false);

  const handleIrrigate = async () => {
    if (selectedPlant === null) return;

    try {
      const payload = {
        plantId: selectedPlant.id,
        amopuntMl: amount,
        method: "manual"
      }

      await axios.post(
        `/api/pump_commands`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      )

      alert("수동 관수 명령 성공")
      onSuccess()
    } catch (err) {
      console.error("수동 관수 실패", err)
    }
  }

  useEffect(() => {
    if (selectedPlant === null) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }, [selectedPlant])


  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm space-y-4">
      {/* 헤더 */}
      <div className="flex items-center text-lg font-semibold ">
        <IoIosWater className="mr-2 text-2xl text-blue-500" />
        <span className='text-gray-800 dark:text-gray-200'>관수 제어</span>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        선택된 식물에 대한 수동 관수를 실행합니다.
      </p>

      {/* 입력 */}
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        관수량 (ml)
      </label>
      <input
        type="number"
        value={amount}
        disabled={disabled}
        onChange={e => setAmount(Number(e.target.value))}
        className="w-full h-10 px-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition disabled:bg-gray-200"
        placeholder="입력하세요"
      />

      {/* 버튼 */}
      <button
        onClick={() => handleIrrigate()}
        disabled={disabled}
        className={`
          cursor-pointer disabled:cursor-auto
          w-full h-12 flex items-center justify-center space-x-2
          bg-green-500 hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-600
          text-white font-medium rounded-md
          focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-green-300
          transition
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <IoIosWater />
        <span>관수 시작</span>
      </button>

      {/* 요약 */}
      <div className="bg-gray-100 dark:bg-gray-700 rounded-md p-4 text-sm text-gray-700 dark:text-gray-300">
        현재 선택: {selectedPlant?.name ?? '없음'}
      </div>
    </div>
  )
}

export default ControlIrrigation
