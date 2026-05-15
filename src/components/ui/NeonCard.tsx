import { cn } from '../../utils/cn'

interface NeonCardProps {
  children: React.ReactNode
  className?: string
  color?: 'cyan' | 'magenta' | 'green'
  glow?: boolean
  onClick?: () => void
}

export function NeonCard({ children, className, color = 'cyan', glow = true, onClick }: NeonCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'border rounded-lg p-4 transition-all duration-300',
        'bg-terminal-surface',
        color === 'cyan' && 'border-[var(--color-neon-cyan)]',
        color === 'magenta' && 'border-[var(--color-neon-magenta)]',
        color === 'green' && 'border-[var(--color-neon-green)]',
        glow && color === 'cyan' && 'neon-glow-cyan',
        glow && color === 'magenta' && 'neon-glow-magenta',
        glow && color === 'green' && 'neon-glow-green',
        onClick && 'cursor-pointer hover:border-[var(--color-neon-cyan)]/60 hover:shadow-lg',
        className
      )}
    >
      {children}
    </div>
  )
}
