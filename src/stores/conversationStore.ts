import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Conversation, Message } from '../types/conversation'
import type { ProviderType } from '../types/provider'
import type { TaskFlow } from '../types/task'
import { MAX_CONVERSATIONS } from '../config/constants'

interface ConversationState {
  conversations: Conversation[]
  activeConversationId: string | null
  isLoading: boolean
  createConversation: (providerType: ProviderType) => string
  deleteConversation: (id: string) => void
  setActiveConversation: (id: string) => void
  addMessage: (conversationId: string, message: Message) => void
  updateMessageContent: (conversationId: string, messageId: string, content: string) => void
  setMessageStreaming: (conversationId: string, messageId: string, isStreaming: boolean) => void
  setMessageError: (conversationId: string, messageId: string, error: string) => void
  attachTaskFlow: (conversationId: string, messageId: string, taskFlow: TaskFlow) => void
  getActiveConversation: () => Conversation | undefined
  setLoading: (v: boolean) => void
}

let msgIdCounter = 0

export const useConversationStore = create<ConversationState>()(
  persist(
    (set, get) => ({
      conversations: [],
      activeConversationId: null,
      isLoading: false,

      createConversation: (providerType) => {
        const id = `conv-${Date.now()}`
        const conv: Conversation = {
          id,
          title: 'New Session',
          messages: [],
          createdAt: Date.now(),
          updatedAt: Date.now(),
          providerType,
        }
        set((s) => {
          const conversations = [conv, ...s.conversations].slice(0, MAX_CONVERSATIONS)
          return { conversations, activeConversationId: id }
        })
        return id
      },

      deleteConversation: (id) =>
        set((s) => {
          const conversations = s.conversations.filter((c) => c.id !== id)
          const activeConversationId =
            s.activeConversationId === id ? conversations[0]?.id ?? null : s.activeConversationId
          return { conversations, activeConversationId }
        }),

      setActiveConversation: (id) => set({ activeConversationId: id }),

      addMessage: (conversationId, message) =>
        set((s) => ({
          conversations: s.conversations.map((c) =>
            c.id === conversationId
              ? {
                  ...c,
                  messages: [...c.messages, message],
                  updatedAt: Date.now(),
                  title:
                    c.messages.length === 0 && message.role === 'user'
                      ? message.content.slice(0, 40) + (message.content.length > 40 ? '...' : '')
                      : c.title,
                }
              : c
          ),
        })),

      updateMessageContent: (conversationId, messageId, content) =>
        set((s) => ({
          conversations: s.conversations.map((c) =>
            c.id === conversationId
              ? {
                  ...c,
                  messages: c.messages.map((m) =>
                    m.id === messageId ? { ...m, content } : m
                  ),
                  updatedAt: Date.now(),
                }
              : c
          ),
        })),

      setMessageStreaming: (conversationId, messageId, isStreaming) =>
        set((s) => ({
          conversations: s.conversations.map((c) =>
            c.id === conversationId
              ? {
                  ...c,
                  messages: c.messages.map((m) =>
                    m.id === messageId ? { ...m, isStreaming } : m
                  ),
                }
              : c
          ),
        })),

      setMessageError: (conversationId, messageId, error) =>
        set((s) => ({
          conversations: s.conversations.map((c) =>
            c.id === conversationId
              ? {
                  ...c,
                  messages: c.messages.map((m) =>
                    m.id === messageId ? { ...m, isStreaming: false, error } : m
                  ),
                }
              : c
          ),
          isLoading: false,
        })),

      attachTaskFlow: (conversationId, messageId, taskFlow) =>
        set((s) => ({
          conversations: s.conversations.map((c) =>
            c.id === conversationId
              ? {
                  ...c,
                  messages: c.messages.map((m) =>
                    m.id === messageId ? { ...m, taskFlow } : m
                  ),
                }
              : c
          ),
        })),

      getActiveConversation: () => {
        const state = get()
        return state.conversations.find((c) => c.id === state.activeConversationId)
      },

      setLoading: (v) => set({ isLoading: v }),
    }),
    { name: 'jarvis-conversations' }
  )
)

export function generateMessageId(): string {
  msgIdCounter++
  return `msg-${Date.now()}-${msgIdCounter}`
}
