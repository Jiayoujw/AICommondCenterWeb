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
    <header className="h-12 border-b border-terminal-border bg-terminal-surface flex items-center px-3 gap-3 shrink-0 z-10">
      <button
        onClick={toggleSidebar}
        className="text-terminal-muted hover:text-terminal-text transition-colors p-1"
        title="Toggle Sidebar"
      >
        <Menu size={18} />
      </button>

      <div className="flex items-center gap-2">
        <NeonText color="cyan" as="span" className="text-sm font-bold tracking-wider">
          {APP_NAME}
        </NeonText>
        <StatusDot status="online" />
      </div>

      <div className="flex-1" />

      <select
        value={activeProvider}
        onChange={(e) => setProviderType(e.target.value as ProviderType)}
        className="bg-terminal-bg border border-terminal-border rounded px-2 py-1 text-xs text-terminal-text font-mono focus:outline-none focus:border-[var(--color-neon-cyan)]"
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
          className="text-terminal-muted hover:text-[var(--color-neon-red)] transition-colors p-1"
          title="Clear conversation"
        >
          <Trash2 size={16} />
        </button>
      )}

      <button
        onClick={toggleSettings}
        className="text-terminal-muted hover:text-terminal-text transition-colors p-1"
        title="Settings"
      >
        <Settings size={18} />
      </button>
    </header>
  )
}
