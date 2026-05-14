import { useRef, useCallback } from 'react'
import { useConversationStore, generateMessageId } from '../stores/conversationStore'
import { useProviderStore } from '../stores/providerStore'
import { useTaskStore } from '../stores/taskStore'
import { getProvider } from '../providers/factory'
import { extractTaskFlow } from '../utils/task-extractor'

export function useStreamingChat() {
  const abortRef = useRef<AbortController | null>(null)
  const addMessage = useConversationStore((s) => s.addMessage)
  const updateMessageContent = useConversationStore((s) => s.updateMessageContent)
  const setMessageStreaming = useConversationStore((s) => s.setMessageStreaming)
  const setMessageError = useConversationStore((s) => s.setMessageError)
  const attachTaskFlow = useConversationStore((s) => s.attachTaskFlow)
  const setLoading = useConversationStore((s) => s.setLoading)
  const getActiveConfig = useProviderStore((s) => s.getActiveConfig)
  const startTaskFlow = useTaskStore((s) => s.startTaskFlow)

  const send = useCallback(async (text: string, conversationId: string) => {
    const config = getActiveConfig()
    if (!config.apiKey) {
      console.warn('No API key configured')
      return
    }

    const userMsg = {
      id: generateMessageId(),
      role: 'user' as const,
      content: text,
      timestamp: Date.now(),
      provider: config.type,
    }
    addMessage(conversationId, userMsg)

    const assistantMsgId = generateMessageId()
    const assistantMsg = {
      id: assistantMsgId,
      role: 'assistant' as const,
      content: '',
      timestamp: Date.now(),
      provider: config.type,
      model: config.model,
      isStreaming: true,
    }
    addMessage(conversationId, assistantMsg)
    setLoading(true)

    const conversation = useConversationStore.getState().conversations.find(
      (c) => c.id === conversationId
    )
    const history = (conversation?.messages ?? [])
      .filter((m) => !m.isStreaming && m.id !== assistantMsgId)
      .map((m) => ({ role: m.role, content: m.content }))
    history.push({ role: 'user', content: text })

    abortRef.current = new AbortController()
    const provider = getProvider(config.type)
    let fullContent = ''

    try {
      for await (const chunk of provider.streamChat(history, config, abortRef.current.signal)) {
        if (chunk.type === 'text') {
          fullContent += chunk.content
          updateMessageContent(conversationId, assistantMsgId, fullContent)
        } else if (chunk.type === 'done') {
          setMessageStreaming(conversationId, assistantMsgId, false)
          const taskFlow = extractTaskFlow(fullContent)
          if (taskFlow) {
            attachTaskFlow(conversationId, assistantMsgId, taskFlow)
            startTaskFlow(assistantMsgId, taskFlow)
          }
        } else if (chunk.type === 'error') {
          setMessageError(conversationId, assistantMsgId, chunk.content || 'Stream error')
        }
      }
    } catch (err) {
      if ((err as Error).name === 'AbortError') {
        setMessageStreaming(conversationId, assistantMsgId, false)
      } else {
        setMessageError(conversationId, assistantMsgId, (err as Error).message)
      }
    } finally {
      setLoading(false)
      abortRef.current = null
    }
  }, [addMessage, updateMessageContent, setMessageStreaming, setMessageError, attachTaskFlow, setLoading, getActiveConfig, startTaskFlow])

  const stop = useCallback(() => {
    abortRef.current?.abort()
  }, [])

  const isStreaming = useConversationStore((s) => s.isLoading)

  return { send, stop, isStreaming }
}
