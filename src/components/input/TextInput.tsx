import { useRef, useCallback, type KeyboardEvent } from 'react'
import { cn } from '../../utils/cn'

interface TextInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  disabled?: boolean
}

export function TextInput({ value, onChange, onSubmit, disabled }: TextInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault()
        onSubmit()
      }
    },
    [onSubmit]
  )

  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange(e.target.value)
      const el = textareaRef.current
      if (el) {
        el.style.height = 'auto'
        el.style.height = Math.min(el.scrollHeight, 160) + 'px'
      }
    },
    [onChange]
  )

  return (
    <textarea
      id="chat-input"
      ref={textareaRef}
      value={value}
      onChange={handleInput}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      placeholder="Type your command... (Ctrl+Enter to send)"
      rows={1}
      className={cn(
        'w-full resize-none bg-terminal-bg border border-terminal-border rounded-lg px-3 py-2',
        'text-sm text-terminal-text placeholder:text-terminal-muted font-mono',
        'focus:outline-none focus:border-[var(--color-neon-cyan)] focus:ring-1 focus:ring-[var(--color-neon-cyan)]/20',
        'transition-colors disabled:opacity-50',
        'max-h-[160px]'
      )}
    />
  )
}
