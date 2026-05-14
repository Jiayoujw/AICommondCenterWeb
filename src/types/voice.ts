export type VoiceStatus = 'idle' | 'listening' | 'processing' | 'error'

export interface VoiceState {
  status: VoiceStatus
  interimTranscript: string
  finalTranscript: string
  error?: string
}
