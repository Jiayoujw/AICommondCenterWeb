import { useState } from 'react'
import { Volume2, Copy, Check } from 'lucide-react'
import type { Message } from '../../types/conversation'
import { TypewriterText } from './TypewriterText'
import { MarkdownRenderer } from './MarkdownRenderer'
import { TaskFlowPipeline } from '../taskflow/TaskFlowPipeline'
import { NeonCard } from '../ui/NeonCard'
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
    <div className="animate-slide-in-left">
      <NeonCard color="cyan" glow={false} className="max-w-[85%] lg:max-w-[70%] border-terminal-border">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-[var(--color-neon-cyan)] font-bold tracking-wider">
            J.A.R.V.I.S.
          </span>
          {message.isStreaming && (
            <span className="text-[10px] text-terminal-muted animate-pulse">
              thinking...
            </span>
          )}
          {!message.isStreaming && (
            <span className="text-[10px] text-terminal-muted">
              {new Date(message.timestamp).toLocaleTimeString()}
            </span>
          )}
          {message.error && (
            <span className="text-[10px] text-[var(--color-neon-red)]">
              {message.error}
            </span>
          )}
        </div>

        <div className="text-sm markdown-content">
          {message.isStreaming && isLast ? (
            <TypewriterText text={message.content} enabled={message.isStreaming} />
          ) : (
            <MarkdownRenderer content={message.content} />
          )}
        </div>

        {message.taskFlow && (
          <div className="mt-4 pt-3 border-t border-terminal-border">
            <TaskFlowPipeline taskFlow={message.taskFlow} />
          </div>
        )}
      </NeonCard>

      {!message.isStreaming && message.content && (
        <div className="flex gap-2 mt-1 ml-1">
          <button
            onClick={handleCopy}
            className="text-terminal-muted hover:text-terminal-text transition-colors p-1"
            title="Copy"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
          </button>
          {ttsSupported && (
            <button
              onClick={handleSpeak}
              className="text-terminal-muted hover:text-[var(--color-neon-cyan)] transition-colors p-1"
              title="Read aloud"
            >
              <Volume2 size={14} />
            </button>
          )}
        </div>
      )}
    </div>
  )
}
