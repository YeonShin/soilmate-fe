import React, { useEffect, useState } from 'react'
import { usePlantStore } from '../store/usePlantStore';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import AlertBanner from '../components/dashboard/AlertBanner';
import ControlIrrigation from '../components/irrigation/ControlIrrigation';
import IrrigationLogs from '../components/irrigation/IrrigationLogs';
import { useAuthStore } from '../store/useAuthStore';
import axios from 'axios';
import { useAlertStore } from '../store/useAlertStore';

interface Plant {
  id: number
  name: string
}

export interface IrrigationLog {
  id: number
  plant: Plant
  amountMl: number
  method: 'auto' | 'manual'
  timestamp: string
}

const Irrigation = () => {
  const {selectedPlant} = usePlantStore();
  const {alerts} = useAlertStore()
  const [logs, setLogs] = useState<IrrigationLog[]>([])
  const {token} = useAuthStore();
  const onSuccess = () => {
    console.log("관수 성공")
  }

  const fetchIrrigationLogs = async () => {
    if (selectedPlant === null) return;
    try {

      const res = await axios.get<IrrigationLog[]>(
        `/api/watering/logs/plants/${selectedPlant.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      )

      setLogs(res.data)

    } catch (err) {
      console.error("관수 기록 조회 실패", err)
    }
  }

  useEffect(() => {
    fetchIrrigationLogs()
  }, [selectedPlant, onSuccess])


  return (
    <div className='p-2 space-y-6'>
      <DashboardHeader title="관수 제어" subTitle='작물의 수동 관수 및 관수 기록을 확인하세요요' />

      <hr className='h-0.25 border-0 bg-gray-200 dark:bg-gray-600' />

      {alerts.length > 0 && <AlertBanner /> }
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <ControlIrrigation onSuccess={fetchIrrigationLogs}  />
        <IrrigationLogs logs={logs} />
      </div>
    </div>
  )
}

export default Irrigation
