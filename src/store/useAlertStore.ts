// src/store/useAlertStore.ts
import {create} from 'zustand'

export interface AlertLog {
  id: number
  plant: { id: number; name: string }
  sensorType: 'temp' | 'humidity' | 'soil_moisture'
  thresholdType: 'min' | 'max'
  value: number
  timestamp: string
}

interface AlertState {
  alerts: AlertLog[]
  setAlerts: (alerts: AlertLog[]) => void
  clearAlerts: () => void
}

export const useAlertStore = create<AlertState>()(
  // 필요 시 persist로 로컬스토리지에도 저장할 수 있습니다.
  (set) => ({
    alerts: [],
    setAlerts: (alerts) => set({ alerts }),
    clearAlerts: () => set({ alerts: [] }),
  })
)
