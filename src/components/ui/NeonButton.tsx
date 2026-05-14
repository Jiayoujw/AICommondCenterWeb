import { cn } from '../../utils/cn'

interface NeonButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  color?: 'cyan' | 'magenta' | 'green'
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export function NeonButton({ children, onClick, className, color = 'cyan', disabled, size = 'md' }: NeonButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'font-mono border rounded transition-all duration-200',
        'bg-terminal-surface hover:bg-terminal-surface2',
        'disabled:opacity-40 disabled:cursor-not-allowed',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-terminal-bg',
        size === 'sm' && 'px-3 py-1 text-xs',
        size === 'md' && 'px-4 py-2 text-sm',
        size === 'lg' && 'px-6 py-3 text-base',
        color === 'cyan' && 'border-[var(--color-neon-cyan)] text-[var(--color-neon-cyan)] focus:ring-[var(--color-neon-cyan)] hover:neon-glow-cyan',
        color === 'magenta' && 'border-[var(--color-neon-magenta)] text-[var(--color-neon-magenta)] focus:ring-[var(--color-neon-magenta)] hover:neon-glow-magenta',
        color === 'green' && 'border-[var(--color-neon-green)] text-[var(--color-neon-green)] focus:ring-[var(--color-neon-green)] hover:neon-glow-green',
        className
      )}
    >
      {children}
    </button>
  )
}
