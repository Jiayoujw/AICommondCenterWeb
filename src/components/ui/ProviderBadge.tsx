import { cn } from '../../utils/cn'
import type { ProviderType } from '../../types/provider'

interface ProviderBadgeProps {
  provider: ProviderType
  className?: string
}

const labels: Record<ProviderType, { text: string; color: string }> = {
  anthropic: { text: 'Claude', color: 'text-[var(--color-neon-magenta)]' },
  openai: { text: 'GPT', color: 'text-[var(--color-neon-green)]' },
  deepseek: { text: 'DeepSeek', color: 'text-[var(--color-neon-cyan)]' },
}

export function ProviderBadge({ provider, className }: ProviderBadgeProps) {
  const { text, color } = labels[provider]
  return (
    <span
      className={cn(
        'text-xs px-2 py-0.5 rounded border border-current font-mono',
        color,
        className
      )}
    >
      {text}
    </span>
  )
}
