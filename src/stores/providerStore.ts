import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ProviderConfig, ProviderType } from '../types/provider'
import { DEFAULT_PROVIDER_CONFIGS } from '../config/constants'

interface ProviderState {
  providers: Record<ProviderType, ProviderConfig>
  activeProvider: ProviderType
  setProviderType: (type: ProviderType) => void
  setApiKey: (type: ProviderType, key: string) => void
  setModel: (type: ProviderType, model: string) => void
  getActiveConfig: () => ProviderConfig
}

export const useProviderStore = create<ProviderState>()(
  persist(
    (set, get) => ({
      providers: { ...DEFAULT_PROVIDER_CONFIGS },
      activeProvider: 'deepseek',

      setProviderType: (type) => set({ activeProvider: type }),

      setApiKey: (type, key) =>
        set((s) => ({
          providers: { ...s.providers, [type]: { ...s.providers[type], apiKey: key } },
        })),

      setModel: (type, model) =>
        set((s) => ({
          providers: { ...s.providers, [type]: { ...s.providers[type], model } },
        })),

      getActiveConfig: () => {
        const state = get()
        return state.providers[state.activeProvider]
      },
    }),
    { name: 'jarvis-provider' }
  )
)
