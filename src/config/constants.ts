import type { ProviderConfig, ProviderType } from '../types/provider'

export const APP_NAME = 'J.A.R.V.I.S.'
export const APP_SUBTITLE = 'AI Command Center v3.7'

export const DEFAULT_MODELS: Record<ProviderType, string> = {
  anthropic: 'claude-sonnet-4-6',
  openai: 'gpt-4o',
  deepseek: 'deepseek-chat',
}

export const DEFAULT_PROVIDER_CONFIGS: Record<ProviderType, ProviderConfig> = {
  anthropic: {
    type: 'anthropic',
    apiKey: '',
    model: DEFAULT_MODELS.anthropic,
    maxTokens: 4096,
    temperature: 0.7,
  },
  openai: {
    type: 'openai',
    apiKey: '',
    model: DEFAULT_MODELS.openai,
    maxTokens: 4096,
    temperature: 0.7,
  },
  deepseek: {
    type: 'deepseek',
    apiKey: '',
    model: DEFAULT_MODELS.deepseek,
    baseURL: 'https://api.deepseek.com',
    maxTokens: 4096,
    temperature: 0.7,
  },
}

export const TYPEWRITER_SPEED = 30
export const MAX_CONVERSATIONS = 50
