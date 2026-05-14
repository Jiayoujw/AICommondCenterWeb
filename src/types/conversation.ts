import type { TaskFlow } from './task'
import type { ProviderType } from './provider'

export type Role = 'user' | 'assistant' | 'system'

export interface Message {
  id: string
  role: Role
  content: string
  timestamp: number
  provider?: ProviderType
  model?: string
  taskFlow?: TaskFlow
  isStreaming?: boolean
  error?: string
}

export interface Conversation {
  id: string
  title: string
  messages: Message[]
  createdAt: number
  updatedAt: number
  providerType: ProviderType
}
