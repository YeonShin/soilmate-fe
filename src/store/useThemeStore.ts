// src/store/useThemeStore.ts
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface ThemeState {
  dark: boolean
  toggle: () => void
  setDark: (val: boolean) => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      dark: false,
      toggle: () => set({ dark: !get().dark }),
      setDark: (val) => set({ dark: val }),
    }),
    {
      name: 'soilmate-theme',                          // localStorage 키
      storage: createJSONStorage(() => localStorage), // 여기!
    }
  )
)
