import { cn } from '../../utils/cn'

interface NeonTextProps {
  children: React.ReactNode
  color?: 'cyan' | 'magenta' | 'green'
  className?: string
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'p'
}

export function NeonText({ children, color = 'cyan', className, as: Tag = 'span' }: NeonTextProps) {
  return (
    <Tag
      className={cn(
        color === 'cyan' && 'neon-text-cyan',
        color === 'magenta' && 'neon-text-magenta',
        color === 'green' && 'neon-text-green',
        className
      )}
    >
      {children}
    </Tag>
  )
}
