import { useProviderStore } from '../../stores/providerStore'
import type { ProviderType } from '../../types/provider'
import { DEFAULT_MODELS } from '../../config/constants'
import { cn } from '../../utils/cn'

const providerList: { id: ProviderType; label: string; color: string }[] = [
  { id: 'deepseek', label: 'DeepSeek', color: 'var(--color-neon-cyan)' },
  { id: 'openai', label: 'OpenAI', color: 'var(--color-neon-green)' },
  { id: 'anthropic', label: 'Anthropic', color: 'var(--color-neon-magenta)' },
]

export function ProviderSettings() {
  const providers = useProviderStore((s) => s.providers)
  const setApiKey = useProviderStore((s) => s.setApiKey)
  const setModel = useProviderStore((s) => s.setModel)
  const activeProvider = useProviderStore((s) => s.activeProvider)
  const setProviderType = useProviderStore((s) => s.setProviderType)

  return (
    <div className="space-y-4">
      <div className="flex gap-1">
        {providerList.map(({ id, label, color }) => (
          <button
            key={id}
            onClick={() => setProviderType(id)}
            className={cn(
              'flex-1 py-1.5 text-xs font-mono border rounded transition-all',
              activeProvider === id
                ? 'border-current text-terminal-bg'
                : 'border-terminal-border text-terminal-muted hover:text-terminal-text'
            )}
            style={activeProvider === id ? { backgroundColor: color, borderColor: color } : {}}
          >
            {label}
          </button>
        ))}
      </div>

      {providerList.map(({ id, label }) => {
        const config = providers[id]
        const isActive = activeProvider === id
        return (
          <div
            key={id}
            className={cn(
              'space-y-3 p-3 rounded border transition-all',
              isActive ? 'border-[var(--color-neon-cyan)]' : 'border-terminal-border'
            )}
          >
            <div>
              <label className="text-[10px] text-terminal-muted font-mono block mb-1">
                {label} API Key
              </label>
              <input
                type="password"
                value={config.apiKey}
                onChange={(e) => setApiKey(id, e.target.value)}
                placeholder="sk-..."
                className="w-full bg-terminal-bg border border-terminal-border rounded px-2 py-1.5 text-xs text-terminal-text font-mono focus:outline-none focus:border-[var(--color-neon-cyan)] placeholder:text-terminal-muted"
              />
            </div>
            <div>
              <label className="text-[10px] text-terminal-muted font-mono block mb-1">
                Model
              </label>
              <input
                type="text"
                value={config.model}
                onChange={(e) => setModel(id, e.target.value)}
                placeholder={DEFAULT_MODELS[id]}
                className="w-full bg-terminal-bg border border-terminal-border rounded px-2 py-1.5 text-xs text-terminal-text font-mono focus:outline-none focus:border-[var(--color-neon-cyan)]"
              />
            </div>
            {id === 'deepseek' && (
              <div>
                <label className="text-[10px] text-terminal-muted font-mono block mb-1">
                  Base URL
                </label>
                <input
                  type="text"
                  value={config.baseURL || 'https://api.deepseek.com'}
                  readOnly
                  className="w-full bg-terminal-bg border border-terminal-border rounded px-2 py-1.5 text-xs text-terminal-muted font-mono"
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
