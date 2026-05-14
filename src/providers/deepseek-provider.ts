import { OpenAIProvider } from './openai-provider'
import type { ProviderConfig, StreamChunk } from '../types/provider'
import type { AIProvider } from './types'

export class DeepSeekProvider implements AIProvider {
  private openaiProvider = new OpenAIProvider()

  async *streamChat(
    messages: { role: string; content: string }[],
    config: ProviderConfig,
    signal?: AbortSignal
  ): AsyncGenerator<StreamChunk> {
    const dsConfig: ProviderConfig = {
      ...config,
      baseURL: config.baseURL || 'https://api.deepseek.com',
    }
    yield* this.openaiProvider.streamChat(messages, dsConfig, signal)
  }
}
