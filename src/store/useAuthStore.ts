// src/store/useAuthStore.ts
import {create} from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface AuthState {
  token: string | null
  setToken: (token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token) => set({ token }),
      logout: () => set({ token: null }),
    }),
    {
      name: 'soilmate-auth', // localStorage key
      storage: createJSONStorage(() => localStorage), // 여기!
      // serialize: custom, deserialize: custom 도 필요에 따라 추가 가능
    }
  )
)
