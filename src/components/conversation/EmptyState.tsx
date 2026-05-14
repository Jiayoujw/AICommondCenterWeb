import { Terminal, Mic, Cpu } from 'lucide-react'
import { NeonText } from '../ui/NeonText'
import { NeonButton } from '../ui/NeonButton'
import { APP_NAME, APP_SUBTITLE } from '../../config/constants'

interface EmptyStateProps {
  onCreateSession: () => void
  hasSessions: boolean
}

export function EmptyState({ onCreateSession }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-12 text-center max-w-lg animate-fade-in">
      <div className="mb-6 relative">
        <div className="w-20 h-20 rounded-full border-2 border-[var(--color-neon-cyan)] flex items-center justify-center neon-glow-cyan">
          <Cpu size={36} className="text-[var(--color-neon-cyan)]" />
        </div>
        <div className="absolute inset-0 rounded-full border border-[var(--color-neon-cyan)]/30 animate-ping" />
      </div>

      <NeonText color="cyan" as="h1" className="text-2xl font-bold tracking-widest mb-2">
        {APP_NAME}
      </NeonText>

      <p className="text-terminal-muted text-sm mb-6 font-mono">
        {APP_SUBTITLE}
      </p>

      <div className="grid grid-cols-3 gap-4 mb-8 w-full max-w-sm">
        {[
          { icon: Terminal, label: 'Text Chat', desc: 'AI-powered conversation' },
          { icon: Mic, label: 'Voice Input', desc: 'Speak your commands' },
          { icon: Cpu, label: 'Task Flow', desc: 'Auto-orchestration' },
        ].map(({ icon: Icon, label, desc }) => (
          <div
            key={label}
            className="flex flex-col items-center gap-1 p-3 rounded-lg border border-terminal-border bg-terminal-surface hover:border-[var(--color-neon-cyan)]/40 transition-colors"
          >
            <Icon size={20} className="text-[var(--color-neon-cyan)]" />
            <span className="text-[10px] text-terminal-text font-mono">{label}</span>
            <span className="text-[8px] text-terminal-muted leading-tight">{desc}</span>
          </div>
        ))}
      </div>

      <NeonButton color="cyan" onClick={onCreateSession} size="lg">
        INITIALIZE SYSTEM
      </NeonButton>

      <p className="text-[10px] text-terminal-muted mt-4 font-mono">
        Press Ctrl+Enter to submit messages
      </p>
    </div>
  )
}
