// src/store/usePlantStore.ts
import { create } from 'zustand'

// API에서 받아오는 Plant, SensorData 타입 정의
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

export interface SensorData {
  temperature: number
  humidity: number
  soilMoisture: number
}

interface PlantState {
  plants: Plant[]
  selectedPlant: Plant | null
  sensorData: SensorData

  // actions
  setPlants: (plants: Plant[]) => void
  setSelectedPlant: (p: Plant) => void
  setSensorData: (d: SensorData) => void
}

export const usePlantStore = create<PlantState>((set) => ({
  plants: [],
  selectedPlant: null,
  sensorData: { temperature: 0, humidity: 0, soilMoisture: 0 },

  setPlants: (plants) => set({ plants }),
  setSelectedPlant: (selectedPlant) => set({ selectedPlant }),
  setSensorData: (sensorData) => set({ sensorData }),
}))
