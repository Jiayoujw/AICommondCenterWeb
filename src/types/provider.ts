export type ProviderType = 'anthropic' | 'openai' | 'deepseek'

export interface ProviderConfig {
  type: ProviderType
  apiKey: string
  model: string
  baseURL?: string
  maxTokens: number
  temperature: number
}

export interface StreamChunk {
  type: 'text' | 'tool_use' | 'tool_result' | 'thinking' | 'error' | 'done'
  content: string
  metadata?: {
    toolName?: string
    toolInput?: Record<string, unknown>
    usage?: { input_tokens: number; output_tokens: number }
  }
}

export interface AIProvider {
  streamChat(
    messages: { role: string; content: string }[],
    config: ProviderConfig,
    signal?: AbortSignal
  ): AsyncGenerator<StreamChunk>
}
