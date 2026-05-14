import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UIState {
  sidebarOpen: boolean
  settingsOpen: boolean
  glowIntensity: number
  fontSize: 'sm' | 'md' | 'lg'
  soundEnabled: boolean
  scanlinesEnabled: boolean
  toggleSidebar: () => void
  toggleSettings: () => void
  setGlowIntensity: (v: number) => void
  setFontSize: (s: 'sm' | 'md' | 'lg') => void
  toggleSound: () => void
  toggleScanlines: () => void
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarOpen: false,
      settingsOpen: false,
      glowIntensity: 70,
      fontSize: 'md',
      soundEnabled: true,
      scanlinesEnabled: true,
      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
      toggleSettings: () => set((s) => ({ settingsOpen: !s.settingsOpen })),
      setGlowIntensity: (v) => set({ glowIntensity: v }),
      setFontSize: (s) => set({ fontSize: s }),
      toggleSound: () => set((s) => ({ soundEnabled: !s.soundEnabled })),
      toggleScanlines: () => set((s) => ({ scanlinesEnabled: !s.scanlinesEnabled })),
    }),
    { name: 'jarvis-ui' }
  )
)
