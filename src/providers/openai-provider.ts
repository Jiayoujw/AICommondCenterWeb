import OpenAI from 'openai'
import type { ProviderConfig, StreamChunk } from '../types/provider'
import type { AIProvider } from './types'

export class OpenAIProvider implements AIProvider {
  async *streamChat(
    messages: { role: string; content: string }[],
    config: ProviderConfig,
    signal?: AbortSignal
  ): AsyncGenerator<StreamChunk> {
    const client = new OpenAI({
      apiKey: config.apiKey,
      baseURL: config.baseURL,
      dangerouslyAllowBrowser: true,
    })

    const stream = await client.chat.completions.create(
      {
        model: config.model,
        messages: [
          { role: 'system', content: 'You are J.A.R.V.I.S., an AI assistant with a geeky, sci-fi personality. Respond in Markdown. When asked to perform multi-step tasks, wrap your task plan in a ```taskflow JSON block with this structure: {"title":"Task Title","steps":[{"id":"1","title":"Step Name","description":"What this step does"}]}. After outputting the taskflow block, continue with your analysis.' },
          ...messages.filter(m => m.role !== 'system').map((m) => ({
            role: m.role as 'user' | 'assistant',
            content: m.content,
          })),
        ],
        stream: true,
      },
      { signal }
    )

    for await (const chunk of stream) {
      const delta = chunk.choices[0]?.delta?.content
      if (delta) {
        yield { type: 'text', content: delta }
      }
    }

    yield { type: 'done', content: '' }
  }
}
