import { CheckCircle2, Loader2, XCircle, Circle } from 'lucide-react'
import type { TaskStep } from '../../types/task'
import { cn } from '../../utils/cn'
import { STATUS_COLORS } from '../../config/themes'

interface TaskStepCardProps {
  step: TaskStep
  index: number
}

const statusIcons: Record<string, React.ElementType> = {
  pending: Circle,
  running: Loader2,
  completed: CheckCircle2,
  failed: XCircle,
  skipped: Circle,
}

export function TaskStepCard({ step, index }: TaskStepCardProps) {
  const Icon = statusIcons[step.status] || Circle
  const statusColor = STATUS_COLORS[step.status] || '#666'

  return (
    <div
      className={cn(
        'border rounded-lg px-3 py-2 min-w-[140px] max-w-[200px] transition-all duration-500 bg-terminal-surface',
        step.status === 'running' && 'animate-glow-pulse'
      )}
      style={{
        borderColor: statusColor,
        boxShadow:
          step.status === 'running'
            ? `0 0 8px ${statusColor}, 0 0 16px ${statusColor}44`
            : step.status === 'completed'
              ? `0 0 4px ${statusColor}44`
              : 'none',
      }}
    >
      <div className="flex items-center gap-1.5 mb-1">
        <Icon
          size={14}
          className={cn(
            step.status === 'running' && 'animate-spin',
            step.status === 'completed' && 'text-[var(--color-neon-green)]',
            step.status === 'failed' && 'text-[var(--color-neon-red)]',
            step.status === 'pending' && 'text-terminal-muted'
          )}
          style={{ color: statusColor }}
        />
        <span className="text-[10px] text-terminal-muted font-mono">#{index + 1}</span>
      </div>

      <p
        className={cn(
          'text-xs font-mono font-medium',
          step.status === 'completed' && 'text-[var(--color-neon-green)]',
          step.status === 'running' && 'text-[var(--color-neon-cyan)]',
          step.status === 'failed' && 'text-[var(--color-neon-red)]',
          step.status === 'pending' && 'text-terminal-muted'
        )}
      >
        {step.title}
      </p>

      {step.description && (
        <p className="text-[10px] text-terminal-muted mt-0.5 truncate">{step.description}</p>
      )}

      {step.error && (
        <p className="text-[10px] text-[var(--color-neon-red)] mt-1 truncate">{step.error}</p>
      )}
    </div>
  )
}
