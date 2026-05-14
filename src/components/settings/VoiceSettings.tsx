import { useVoiceInput } from '../../hooks/useVoiceInput'
import { useVoiceStore } from '../../stores/voiceStore'
import { cn } from '../../utils/cn'

export function VoiceSettings() {
  const { isSupported, status, toggle } = useVoiceInput()
  const voiceState = useVoiceStore((s) => s.voiceState)

  return (
    <div className="space-y-4">
      <div>
        <label className="text-[10px] text-terminal-muted font-mono block mb-1">
          VOICE INPUT SUPPORT
        </label>
        <div
          className={cn(
            'text-xs font-mono py-1.5 px-2 rounded border',
            isSupported
              ? 'border-[var(--color-neon-green)] text-[var(--color-neon-green)]'
              : 'border-[var(--color-neon-red)] text-[var(--color-neon-red)]'
          )}
        >
          {isSupported ? 'SUPPORTED' : 'NOT SUPPORTED'}
        </div>
        {!isSupported && (
          <p className="text-[10px] text-terminal-muted mt-1">
            Safari and some mobile browsers do not support Web Speech API.
            Try Chrome or Edge for voice input.
          </p>
        )}
      </div>

      {isSupported && (
        <>
          <div>
            <label className="text-[10px] text-terminal-muted font-mono block mb-1">
              MICROPHONE TEST
            </label>
            <button
              onClick={toggle}
              className={cn(
                'w-full py-2 text-xs font-mono border rounded transition-all',
                status === 'listening'
                  ? 'border-[var(--color-neon-red)] text-[var(--color-neon-red)] animate-status-pulse'
                  : 'border-terminal-border text-terminal-muted hover:text-[var(--color-neon-cyan)]'
              )}
            >
              {status === 'listening' ? 'STOP LISTENING' : 'START TEST'}
            </button>
            {voiceState.interimTranscript && (
              <p className="text-[10px] text-terminal-muted mt-1 italic">
                "{voiceState.interimTranscript}"
              </p>
            )}
            {voiceState.error && (
              <p className="text-[10px] text-[var(--color-neon-red)] mt-1">
                Error: {voiceState.error}
              </p>
            )}
          </div>
        </>
      )}

      <div className="pt-4 border-t border-terminal-border">
        <p className="text-[10px] text-terminal-muted font-mono leading-relaxed">
          Voice input uses the browser's built-in Web Speech API. No audio data is
          sent to any external server. Voice output (TTS) reads AI responses aloud.
        </p>
      </div>
    </div>
  )
}
