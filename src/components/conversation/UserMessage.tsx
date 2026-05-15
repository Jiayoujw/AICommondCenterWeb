import type { Message } from '../../types/conversation'
import { ProviderBadge } from '../ui/ProviderBadge'
import { cn } from '../../utils/cn'

interface UserMessageProps {
  message: Message
}

export function UserMessage({ message }: UserMessageProps) {
  return (
    <div className="flex justify-end animate-slide-in-right">
      <div className="max-w-[80%] lg:max-w-[60%]">
        <div
          className={cn(
            'rounded-lg px-4 py-2.5',
            'bg-terminal-surface2 border border-terminal-border',
            'hover:border-[var(--color-neon-cyan)]/50 transition-colors'
          )}
        >
          <p className="text-sm whitespace-pre-wrap break-words text-terminal-text">
            {message.content}
          </p>
        </div>
        <div className="flex items-center justify-end gap-2 mt-1">
          {message.provider && <ProviderBadge provider={message.provider} />}
          <span className="text-[10px] text-terminal-muted tabular-nums">
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    </div>
  )
}
