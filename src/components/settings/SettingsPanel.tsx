import { X, Key, Palette, Mic, Shield } from 'lucide-react'
import { useState } from 'react'
import { useUIStore } from '../../stores/uiStore'
import { ProviderSettings } from './ProviderSettings'
import { ThemeSettings } from './ThemeSettings'
import { VoiceSettings } from './VoiceSettings'
import { cn } from '../../utils/cn'

type Tab = 'provider' | 'theme' | 'voice'

const tabs: { id: Tab; icon: React.ElementType; label: string }[] = [
  { id: 'provider', icon: Key, label: 'Provider' },
  { id: 'theme', icon: Palette, label: 'Theme' },
  { id: 'voice', icon: Mic, label: 'Voice' },
]

export function SettingsPanel() {
  const [activeTab, setActiveTab] = useState<Tab>('provider')
  const toggleSettings = useUIStore((s) => s.toggleSettings)

  return (
    <div className="fixed inset-y-0 right-0 w-80 bg-terminal-surface border-l border-terminal-border z-40 flex flex-col animate-slide-in-right shadow-2xl">
      <div className="flex items-center justify-between p-3 border-b border-terminal-border">
        <div className="flex items-center gap-2">
          <Shield size={16} className="text-[var(--color-neon-cyan)]" />
          <span className="text-sm font-bold tracking-wider text-[var(--color-neon-cyan)]">
            SETTINGS
          </span>
        </div>
        <button
          onClick={toggleSettings}
          className="text-terminal-muted hover:text-terminal-text transition-colors p-1"
        >
          <X size={18} />
        </button>
      </div>

      <div className="flex border-b border-terminal-border">
        {tabs.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={cn(
              'flex-1 flex items-center justify-center gap-1 py-2 text-xs font-mono transition-colors',
              activeTab === id
                ? 'text-[var(--color-neon-cyan)] border-b-2 border-[var(--color-neon-cyan)]'
                : 'text-terminal-muted hover:text-terminal-text'
            )}
          >
            <Icon size={12} />
            {label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'provider' && <ProviderSettings />}
        {activeTab === 'theme' && <ThemeSettings />}
        {activeTab === 'voice' && <VoiceSettings />}
      </div>

      <div className="p-3 border-t border-terminal-border">
        <p className="text-[9px] text-terminal-muted text-center font-mono">
          API keys are stored locally in your browser. Never sent to any server.
        </p>
      </div>
    </div>
  )
}
