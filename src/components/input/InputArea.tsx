import { useState, useCallback } from 'react'
import { Send, Square } from 'lucide-react'
import { useStreamingChat } from '../../hooks/useStreamingChat'
import { useConversationStore } from '../../stores/conversationStore'
import { useProviderStore } from '../../stores/providerStore'
import { TextInput } from './TextInput'
import { VoiceInputButton } from './VoiceInputButton'
import { NeonButton } from '../ui/NeonButton'

interface InputAreaProps {
  conversationId: string
}

export function InputArea({ conversationId }: InputAreaProps) {
  const [text, setText] = useState('')
  const { send, stop, isStreaming } = useStreamingChat()
  const apiKey = useProviderStore((s) => s.providers[s.activeProvider].apiKey)
  const activeProvider = useProviderStore((s) => s.activeProvider)

  const handleSubmit = useCallback(() => {
    const trimmed = text.trim()
    if (!trimmed || isStreaming) return
    setText('')
    send(trimmed, conversationId)
  }, [text, isStreaming, send, conversationId])

  const handleVoiceTranscript = useCallback(
    (transcript: string) => {
      setText((prev) => prev + transcript)
    },
    []
  )

  if (!apiKey) {
    return (
      <div className="border-t border-terminal-border bg-terminal-surface p-4">
        <div className="text-center">
          <p className="text-terminal-muted text-xs mb-2 font-mono">
            No API key configured. Open settings to add your key.
          </p>
          <NeonButton
            color="cyan"
            size="sm"
            onClick={() => {
              const state = useConversationStore.getState()
              if (state.conversations.length === 0) {
                state.createConversation(activeProvider)
              }
            }}
          >
            CONFIGURE API KEY
          </NeonButton>
        </div>
      </div>
    )
  }

  return (
    <div className="border-t border-terminal-border bg-terminal-surface/80 backdrop-blur p-3">
      <div className="flex items-end gap-2.5 max-w-4xl mx-auto">
        <VoiceInputButton onTranscript={handleVoiceTranscript} />

        <div className="flex-1">
          <label htmlFor="chat-input" className="sr-only">Type your command</label>
          <TextInput
            value={text}
            onChange={setText}
            onSubmit={handleSubmit}
            disabled={isStreaming}
          />
        </div>

        <button
          onClick={isStreaming ? stop : handleSubmit}
          disabled={!isStreaming && !text.trim()}
          aria-label={isStreaming ? 'Stop streaming' : 'Send message'}
          className="min-w-[44px] min-h-[44px] rounded-lg border flex items-center justify-center transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed border-[var(--color-neon-cyan)] text-[var(--color-neon-cyan)] hover:neon-glow-cyan bg-terminal-surface2 cursor-pointer"
        >
          {isStreaming ? <Square size={18} /> : <Send size={18} />}
        </button>
      </div>
    </div>
  )
}
