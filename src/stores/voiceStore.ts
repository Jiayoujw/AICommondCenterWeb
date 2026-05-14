import { create } from 'zustand'
import type { VoiceStatus } from '../types/voice'

interface VoiceState {
  status: VoiceStatus
  interimTranscript: string
  finalTranscript: string
  error?: string
}

interface VoiceStore {
  voiceState: VoiceState
  setStatus: (status: VoiceStatus) => void
  setInterimTranscript: (text: string) => void
  setFinalTranscript: (text: string) => void
  resetTranscript: () => void
  setError: (error: string) => void
}

export const useVoiceStore = create<VoiceStore>()((set) => ({
  voiceState: { status: 'idle', interimTranscript: '', finalTranscript: '' },
  setStatus: (status) => set((s) => ({ voiceState: { ...s.voiceState, status, error: undefined } })),
  setInterimTranscript: (text) =>
    set((s) => ({ voiceState: { ...s.voiceState, interimTranscript: text } })),
  setFinalTranscript: (text) =>
    set((s) => ({
      voiceState: { ...s.voiceState, finalTranscript: text, interimTranscript: '' },
    })),
  resetTranscript: () =>
    set((s) => ({
      voiceState: { ...s.voiceState, interimTranscript: '', finalTranscript: '' },
    })),
  setError: (error) =>
    set((s) => ({ voiceState: { ...s.voiceState, status: 'error', error } })),
}))
