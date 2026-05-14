import { cn } from '../../utils/cn'

interface QuickActionsProps {
  onSelect: (text: string) => void
}

const actions = [
  { label: 'Analyze', prompt: 'Analyze the following and provide insights:' },
  { label: 'Summarize', prompt: 'Summarize the following concisely:' },
  { label: 'Generate Report', prompt: 'Generate a detailed report with task steps for:' },
  { label: 'Code Review', prompt: 'Review this code and suggest improvements:' },
]

export function QuickActions({ onSelect }: QuickActionsProps) {
  return (
    <div className="flex gap-1.5 flex-wrap">
      {actions.map(({ label, prompt }) => (
        <button
          key={label}
          onClick={() => onSelect(prompt)}
          className={cn(
            'text-[10px] px-2 py-1 rounded border transition-colors font-mono',
            'border-terminal-border text-terminal-muted',
            'hover:border-[var(--color-neon-cyan)]/50 hover:text-terminal-text'
          )}
        >
          /{label}
        </button>
      ))}
    </div>
  )
}
