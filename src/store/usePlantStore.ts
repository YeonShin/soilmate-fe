import { create } from 'zustand';

export interface Plant {
  id: number;
  name: string;
  plantType: string;
  minTemp: number;
  maxTemp: number;
  minHumidity: number;
  maxHumidity: number;
  minSoilMoisture: number;
  maxSoilMoisture: number;
}

interface PlantState {
  plants: Plant[];
  selectedPlantId: number | null;
  setPlants: (plants: Plant[]) => void;
  setSelectedPlantId: (id: number) => void;
}

export const usePlantStore = create<PlantState>((set) => ({
  plants: [],
  selectedPlantId: null,
  setPlants: (plants) => set({ plants }),
  setSelectedPlantId: (id) => set({ selectedPlantId: id }),
}));
