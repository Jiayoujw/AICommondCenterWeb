import { Terminal, Mic, Cpu, Activity, ChevronRight } from 'lucide-react'
import { NeonText } from '../ui/NeonText'
import { NeonButton } from '../ui/NeonButton'
import { APP_NAME, APP_SUBTITLE } from '../../config/constants'

interface EmptyStateProps {
  onCreateSession: () => void
  hasSessions: boolean
}

export function EmptyState({ onCreateSession }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-10 text-center max-w-2xl mx-auto animate-fade-in-up">
      {/* Central HUD icon with rotating glow ring */}
      <div className="mb-8 relative">
        <div className="absolute inset-0 rounded-full border border-[var(--color-neon-cyan)]/10 animate-rotate-glow"
             style={{ width: 140, height: 140, top: '50%', left: '50%', transform: 'translate(-50%, -50%)', animation: 'rotate-glow 20s linear infinite' }} />
        <div className="absolute inset-0 rounded-full border border-dashed border-[var(--color-neon-cyan)]/15"
             style={{ width: 160, height: 160, top: '50%', left: '50%', transform: 'translate(-50%, -50%)', animation: 'rotate-glow 30s linear infinite reverse' }} />

        <div className="relative w-24 h-24 rounded-full border border-[var(--color-neon-cyan)]/40 flex items-center justify-center neon-glow-cyan animate-float bg-terminal-bg/80 backdrop-blur">
          <Cpu size={42} className="text-[var(--color-neon-cyan)]" />
        </div>
        <div className="absolute inset-0 rounded-full border border-[var(--color-neon-cyan)]/20 animate-ping"
             style={{ width: 96, height: 96, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
      </div>

      {/* Title with HUD brackets */}
      <div className="relative mb-2">
        <NeonText color="cyan" as="h1" className="text-3xl font-bold tracking-[0.3em]">
          {APP_NAME}
        </NeonText>
      </div>

      {/* Status line */}
      <div className="flex items-center gap-3 mb-6 text-[10px]">
        <span className="text-terminal-muted opacity-70 font-mono tracking-wider">{APP_SUBTITLE}</span>
        <span className="w-1 h-1 rounded-full bg-[var(--color-neon-green)]" />
        <span className="flex items-center gap-1 text-[var(--color-neon-green)] font-mono">
          <Activity size={10} />
          SYSTEM READY
        </span>
      </div>

      {/* Feature cards - HUD style */}
      <div className="grid grid-cols-3 gap-3 mb-8 w-full max-w-md">
        {[
          { icon: Terminal, label: 'TEXT CHAT', desc: 'Multi-provider AI with streaming responses' },
          { icon: Mic, label: 'VOICE INPUT', desc: 'Web Speech API with real-time transcript' },
          { icon: Cpu, label: 'TASK FLOW', desc: 'Multi-step orchestration pipeline cards' },
        ].map(({ icon: Icon, label, desc }) => (
          <button
            key={label}
            className="group flex flex-col items-center gap-2 p-4 rounded-lg border border-terminal-border bg-terminal-surface/50 hover:bg-terminal-surface2/80 hover:border-[var(--color-neon-cyan)]/30 transition-all duration-300 cursor-pointer text-left relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-neon-cyan)]/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Icon size={22} className="text-[var(--color-neon-cyan)] relative z-10" />
            <span className="text-[10px] text-terminal-text font-mono tracking-wider relative z-10">{label}</span>
            <span className="text-[8px] text-terminal-muted leading-tight relative z-10">{desc}</span>
          </button>
        ))}
      </div>

      {/* Initialize button */}
      <NeonButton color="cyan" onClick={onCreateSession} size="lg" className="group">
        <span className="flex items-center gap-2">
          INITIALIZE SYSTEM
          <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
        </span>
      </NeonButton>

      {/* Keyboard hint */}
      <div className="flex items-center gap-3 mt-6 text-[10px] text-terminal-muted font-mono">
        <kbd className="px-2 py-0.5 rounded border border-terminal-border bg-terminal-surface text-[9px]">Ctrl</kbd>
        <span>+</span>
        <kbd className="px-2 py-0.5 rounded border border-terminal-border bg-terminal-surface text-[9px]">Enter</kbd>
        <span className="ml-1">to send</span>
      </div>

      {/* HUD scan line decoration at bottom */}
      <div className="mt-8 w-48 h-px bg-gradient-to-r from-transparent via-[var(--color-neon-cyan)]/30 to-transparent relative">
        <div className="absolute top-1/2 left-0 w-full h-px bg-[var(--color-neon-cyan)]/10 animate-hud-scan"
             style={{ animation: 'hud-scan 3s ease-in-out infinite' }} />
      </div>
    </div>
  )
}
