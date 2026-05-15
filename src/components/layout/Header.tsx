import { Menu, Settings, Trash2 } from 'lucide-react'
import { useUIStore } from '../../stores/uiStore'
import { useProviderStore } from '../../stores/providerStore'
import { useConversationStore } from '../../stores/conversationStore'
import { NeonText } from '../ui/NeonText'
import { StatusDot } from '../ui/StatusDot'
import { ProviderBadge } from '../ui/ProviderBadge'
import { APP_NAME } from '../../config/constants'
import type { ProviderType } from '../../types/provider'

const providerOptions: { value: ProviderType; label: string }[] = [
  { value: 'deepseek', label: 'DeepSeek' },
  { value: 'openai', label: 'OpenAI' },
  { value: 'anthropic', label: 'Anthropic' },
]

export function Header() {
  const toggleSidebar = useUIStore((s) => s.toggleSidebar)
  const toggleSettings = useUIStore((s) => s.toggleSettings)
  const activeProvider = useProviderStore((s) => s.activeProvider)
  const setProviderType = useProviderStore((s) => s.setProviderType)
  const deleteConversation = useConversationStore((s) => s.deleteConversation)
  const activeConversationId = useConversationStore((s) => s.activeConversationId)

  return (
    <header className="h-12 border-b border-terminal-border bg-terminal-surface flex items-center px-3 gap-3 shrink-0 z-10 relative overflow-hidden">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-neon-cyan)]/40 to-transparent" />

      <button
        onClick={toggleSidebar}
        className="text-terminal-muted hover:text-[var(--color-neon-cyan)] transition-colors duration-200 min-w-[36px] min-h-[36px] flex items-center justify-center rounded cursor-pointer"
        aria-label="Toggle sidebar"
      >
        <Menu size={18} />
      </button>

      <div className="flex items-center gap-2.5 hud-brackets px-3 py-1">
        <span className="text-[10px] text-terminal-muted opacity-50 select-none">[</span>
        <NeonText color="cyan" as="span" className="text-sm font-bold tracking-widest animate-glitch-text">
          {APP_NAME}
        </NeonText>
        <span className="text-[10px] text-terminal-muted opacity-50 select-none">]</span>
        <StatusDot status="online" />
      </div>

      <div className="flex-1" />

      <label htmlFor="provider-select" className="sr-only">AI Provider</label>
      <select
        id="provider-select"
        value={activeProvider}
        onChange={(e) => setProviderType(e.target.value as ProviderType)}
        className="bg-terminal-bg border border-terminal-border rounded px-2 py-1.5 text-xs text-terminal-text font-mono cursor-pointer hover:border-[var(--color-neon-cyan)]/50 transition-colors duration-200 min-h-[36px]"
      >
        {providerOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <ProviderBadge provider={activeProvider} />

      {activeConversationId && (
        <button
          onClick={() => deleteConversation(activeConversationId)}
          className="text-terminal-muted hover:text-[var(--color-neon-red)] hover:bg-[var(--color-neon-red)]/10 transition-all duration-200 min-w-[36px] min-h-[36px] flex items-center justify-center rounded cursor-pointer"
          aria-label="Clear conversation"
        >
          <Trash2 size={16} />
        </button>
      )}

      <button
        onClick={toggleSettings}
        className="text-terminal-muted hover:text-[var(--color-neon-cyan)] hover:bg-[var(--color-neon-cyan)]/5 transition-all duration-200 min-w-[36px] min-h-[36px] flex items-center justify-center rounded cursor-pointer"
        aria-label="Open settings"
      >
        <Settings size={18} />
      </button>
    </header>
  )
}
