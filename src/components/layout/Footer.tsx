import { useProviderStore } from '../../stores/providerStore'

export function Footer() {
  const model = useProviderStore((s) => s.providers[s.activeProvider].model)

  return (
    <footer className="h-6 border-t border-terminal-border bg-terminal-surface flex items-center px-3 gap-4 shrink-0 z-10">
      <span className="text-[10px] text-terminal-muted font-mono">
        MODEL: {model}
      </span>
      <span className="text-[10px] text-terminal-muted font-mono">
        STATUS: <span className="text-[var(--color-neon-green)]">ONLINE</span>
      </span>
      <span className="flex-1" />
      <span className="text-[10px] text-terminal-muted font-mono">
        v3.7
      </span>
    </footer>
  )
}
