import { cn } from '../../utils/cn'

interface StatusDotProps {
  status: 'online' | 'offline' | 'busy'
  className?: string
}

const colors: Record<string, string> = {
  online: 'bg-[var(--color-neon-green)] text-[var(--color-neon-green)]',
  offline: 'bg-[var(--color-terminal-muted)] text-[var(--color-terminal-muted)]',
  busy: 'bg-[var(--color-neon-yellow)] text-[var(--color-neon-yellow)]',
}

export function StatusDot({ status, className }: StatusDotProps) {
  return (
    <span
      className={cn(
        'inline-block w-2.5 h-2.5 rounded-full animate-status-pulse',
        colors[status],
        className
      )}
    />
  )
}
