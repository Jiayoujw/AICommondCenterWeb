import { useEffect } from 'react'
import { Mic, MicOff } from 'lucide-react'
import { useVoiceInput } from '../../hooks/useVoiceInput'
import { useVoiceStore } from '../../stores/voiceStore'
import { cn } from '../../utils/cn'

interface VoiceInputButtonProps {
  onTranscript: (text: string) => void
}

export function VoiceInputButton({ onTranscript }: VoiceInputButtonProps) {
  const { isSupported, status, toggle } = useVoiceInput()
  const finalTranscript = useVoiceStore((s) => s.voiceState.finalTranscript)
  const interimTranscript = useVoiceStore((s) => s.voiceState.interimTranscript)

  useEffect(() => {
    if (finalTranscript) {
      onTranscript(finalTranscript)
    }
  }, [finalTranscript, onTranscript])

  if (!isSupported) return null

  const isListening = status === 'listening'

  return (
    <div className="relative">
      <button
        onClick={toggle}
        className={cn(
          'p-2 rounded border transition-all',
          isListening
            ? 'border-[var(--color-neon-red)] text-[var(--color-neon-red)] animate-status-pulse'
            : 'border-terminal-border text-terminal-muted hover:text-[var(--color-neon-cyan)] hover:border-[var(--color-neon-cyan)]'
        )}
        title={isListening ? 'Stop listening' : 'Start voice input'}
      >
        {isListening ? <MicOff size={16} /> : <Mic size={16} />}
      </button>

      {isListening && interimTranscript && (
        <div className="absolute bottom-full left-0 mb-2 bg-terminal-surface2 border border-terminal-border rounded px-3 py-1.5 text-xs text-terminal-muted whitespace-nowrap shadow-lg max-w-[200px] truncate">
          {interimTranscript}
        </div>
      )}
    </div>
  )
}
