import type { AIProvider } from './types'
import type { ProviderType, ProviderConfig } from '../types/provider'
import { AnthropicProvider } from './anthropic-provider'
import { OpenAIProvider } from './openai-provider'
import { DeepSeekProvider } from './deepseek-provider'

const providers: Record<ProviderType, AIProvider> = {
  anthropic: new AnthropicProvider(),
  openai: new OpenAIProvider(),
  deepseek: new DeepSeekProvider(),
}

export function createProvider(config: ProviderConfig): AIProvider {
  return providers[config.type]
}

export function getProvider(type: ProviderType): AIProvider {
  return providers[type]
}
