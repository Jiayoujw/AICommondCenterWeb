import { useState } from 'react'
import { Volume2, Copy, Check } from 'lucide-react'
import type { Message } from '../../types/conversation'
import { TypewriterText } from './TypewriterText'
import { MarkdownRenderer } from './MarkdownRenderer'
import { TaskFlowPipeline } from '../taskflow/TaskFlowPipeline'
import { useVoiceOutput } from '../../hooks/useVoiceOutput'

interface AIMessageProps {
  message: Message
  isLast: boolean
}

export function AIMessage({ message, isLast }: AIMessageProps) {
  const [copied, setCopied] = useState(false)
  const { isSupported: ttsSupported, speak } = useVoiceOutput()

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSpeak = () => {
    if (message.content) speak(message.content)
  }

  return (
    <div className="animate-slide-in-left group/message">
      <div className="max-w-[85%] lg:max-w-[70%] bg-terminal-surface/60 backdrop-blur border border-terminal-border rounded-lg transition-all duration-200 relative">
        {/* HUD corner accent */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[var(--color-neon-cyan)]/30 rounded-tl pointer-events-none" />

        <div className="px-4 py-3">
          {/* Header */}
          <div className="flex items-center gap-2.5 mb-3 pb-2 border-b border-terminal-border/50">
            <span className="text-xs text-[var(--color-neon-cyan)] font-bold tracking-widest">
              J.A.R.V.I.S.
            </span>
            {message.isStreaming && (
              <span className="flex items-center gap-1 text-[10px] text-terminal-muted">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-neon-cyan)] animate-pulse" />
                processing
              </span>
            )}
            {!message.isStreaming && (
              <span className="text-[10px] text-terminal-muted tabular-nums">
                {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </span>
            )}
            {message.model && !message.isStreaming && (
              <span className="text-[9px] text-terminal-muted/50 ml-auto">{message.model}</span>
            )}
            {message.error && (
              <span className="text-[10px] text-[var(--color-neon-red)] font-mono">
                ERROR: {message.error}
              </span>
            )}
          </div>

          {/* Content */}
          <div className="text-sm markdown-content min-h-[1em]">
            {message.isStreaming && isLast ? (
              <TypewriterText text={message.content} enabled={message.isStreaming} />
            ) : (
              message.content ? <MarkdownRenderer content={message.content} /> : null
            )}
          </div>

          {/* Task flow */}
          {message.taskFlow && (
            <div className="mt-4 pt-3 border-t border-terminal-border/50">
              <TaskFlowPipeline taskFlow={message.taskFlow} />
            </div>
          )}
        </div>
      </div>

      {/* Action buttons */}
      {!message.isStreaming && message.content && (
        <div className="flex gap-1.5 mt-1.5 ml-1 opacity-0 group-hover/message:opacity-100 transition-opacity duration-200">
          <button
            onClick={handleCopy}
            className="text-terminal-muted hover:text-[var(--color-neon-cyan)] transition-colors duration-200 min-w-[32px] min-h-[32px] flex items-center justify-center rounded cursor-pointer"
            aria-label={copied ? 'Copied' : 'Copy to clipboard'}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
          </button>
          {ttsSupported && (
            <button
              onClick={handleSpeak}
              className="text-terminal-muted hover:text-[var(--color-neon-cyan)] transition-colors duration-200 min-w-[32px] min-h-[32px] flex items-center justify-center rounded cursor-pointer"
              aria-label="Read message aloud"
            >
              <Volume2 size={14} />
            </button>
          )}
        </div>
      )}
    </div>
  )
}
