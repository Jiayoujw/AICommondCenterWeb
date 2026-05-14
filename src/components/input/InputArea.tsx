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
  const createConversation = useConversationStore((s) => s.createConversation)
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
            onClick={() => useConversationStore.getState().createConversation === createConversation && createConversation(activeProvider)}
          >
            CONFIGURE API KEY
          </NeonButton>
        </div>
      </div>
    )
  }

  return (
    <div className="border-t border-terminal-border bg-terminal-surface p-3">
      <div className="flex items-end gap-2 max-w-4xl mx-auto">
        <VoiceInputButton onTranscript={handleVoiceTranscript} />

        <div className="flex-1">
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
          className="p-2 rounded border transition-all disabled:opacity-30 disabled:cursor-not-allowed border-[var(--color-neon-cyan)] text-[var(--color-neon-cyan)] hover:neon-glow-cyan bg-terminal-surface2"
        >
          {isStreaming ? <Square size={16} /> : <Send size={16} />}
        </button>
      </div>
    </div>
  )
}
