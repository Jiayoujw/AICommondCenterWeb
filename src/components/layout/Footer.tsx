import { useProviderStore } from '../../stores/providerStore'

export function Footer() {
  const model = useProviderStore((s) => s.providers[s.activeProvider].model)

  return (
    <footer className="h-6 border-t border-terminal-border bg-terminal-surface flex items-center px-3 gap-4 shrink-0 z-10 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-neon-cyan)]/20 to-transparent" />
      <span className="text-[10px] text-terminal-muted font-mono tracking-wider">
        MODEL: <span className="text-terminal-text/70">{model}</span>
      </span>
      <span className="w-1 h-1 rounded-full bg-[var(--color-neon-green)]" />
      <span className="text-[10px] text-terminal-muted font-mono tracking-wider">
        <span className="text-[var(--color-neon-green)]">ONLINE</span>
      </span>
      <span className="flex-1" />
      <span className="text-[10px] text-terminal-muted/50 font-mono">
        BUILD 3.7.1
      </span>
    </footer>
  )
}
