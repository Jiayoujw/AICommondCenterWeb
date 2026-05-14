import Anthropic from '@anthropic-ai/sdk'
import type { ProviderConfig, StreamChunk } from '../types/provider'
import type { AIProvider } from './types'

export class AnthropicProvider implements AIProvider {
  async *streamChat(
    messages: { role: string; content: string }[],
    config: ProviderConfig,
    signal?: AbortSignal
  ): AsyncGenerator<StreamChunk> {
    const client = new Anthropic({
      apiKey: config.apiKey,
      dangerouslyAllowBrowser: true,
    })

    const stream = client.messages.stream(
      {
        model: config.model,
        max_tokens: config.maxTokens,
        system: 'You are J.A.R.V.I.S., an AI assistant with a geeky, sci-fi personality. Respond in Markdown. When asked to perform multi-step tasks, wrap your task plan in a ```taskflow JSON block with this structure: {"title":"Task Title","steps":[{"id":"1","title":"Step Name","description":"What this step does"}]}. After outputting the taskflow block, continue with your analysis.',
        messages: messages.filter(m => m.role !== 'system').map((m) => ({
          role: m.role as 'user' | 'assistant',
          content: m.content,
        })),
      },
      { signal }
    )

    for await (const event of stream) {
      if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
        yield { type: 'text', content: event.delta.text }
      }
    }

    const final = await stream.finalMessage()
    yield {
      type: 'done',
      content: '',
      metadata: {
        usage: {
          input_tokens: final.usage.input_tokens,
          output_tokens: final.usage.output_tokens,
        },
      },
    }
  }
}
