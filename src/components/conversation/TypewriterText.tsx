import { useTypewriter } from '../../hooks/useTypewriter'
import { TerminalCursor } from '../ui/TerminalCursor'

interface TypewriterTextProps {
  text: string
  enabled?: boolean
  speed?: number
}

export function TypewriterText({ text, enabled = true, speed }: TypewriterTextProps) {
  const { displayText, isAnimating } = useTypewriter(text, { enabled, speed })

  if (!text) return null

  return (
    <span className="whitespace-pre-wrap break-words">
      {displayText}
      {isAnimating && <TerminalCursor />}
    </span>
  )
}
