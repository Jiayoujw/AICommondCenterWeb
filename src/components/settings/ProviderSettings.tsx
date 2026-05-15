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
      <div className="flex gap-1.5">
        {providerList.map(({ id, label, color }) => (
          <button
            key={id}
            onClick={() => setProviderType(id)}
            className={cn(
              'flex-1 py-2 text-xs font-mono border rounded transition-all duration-200 cursor-pointer min-h-[36px]',
              activeProvider === id
                ? 'border-current'
                : 'border-terminal-border text-terminal-muted hover:text-terminal-text hover:border-terminal-muted'
            )}
            style={activeProvider === id ? { backgroundColor: color, borderColor: color, color: '#0a0a0f' } : {}}
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
              'space-y-3 p-3 rounded-lg border transition-all duration-200',
              isActive ? 'border-[var(--color-neon-cyan)]/50 bg-terminal-surface2/50' : 'border-terminal-border bg-transparent'
            )}
          >
            <div>
              <label htmlFor={`api-key-${id}`} className="text-[10px] text-terminal-muted font-mono block mb-1.5 tracking-wider">
                {label} API KEY
              </label>
              <input
                id={`api-key-${id}`}
                type="password"
                value={config.apiKey}
                onChange={(e) => setApiKey(id, e.target.value)}
                placeholder="sk-..."
                autoComplete="off"
                className="w-full bg-terminal-bg border border-terminal-border rounded-md px-3 py-2 text-xs text-terminal-text font-mono placeholder:text-terminal-muted/50 transition-colors duration-200 hover:border-terminal-muted/50"
              />
            </div>
            <div>
              <label htmlFor={`model-${id}`} className="text-[10px] text-terminal-muted font-mono block mb-1.5 tracking-wider">
                MODEL
              </label>
              <input
                id={`model-${id}`}
                type="text"
                value={config.model}
                onChange={(e) => setModel(id, e.target.value)}
                placeholder={DEFAULT_MODELS[id]}
                className="w-full bg-terminal-bg border border-terminal-border rounded-md px-3 py-2 text-xs text-terminal-text font-mono placeholder:text-terminal-muted/50 transition-colors duration-200 hover:border-terminal-muted/50"
              />
            </div>
            {id === 'deepseek' && (
              <div>
                <label className="text-[10px] text-terminal-muted font-mono block mb-1.5 tracking-wider">
                  BASE URL
                </label>
                <input
                  type="text"
                  value={config.baseURL || 'https://api.deepseek.com'}
                  readOnly
                  className="w-full bg-terminal-bg border border-terminal-border rounded-md px-3 py-2 text-xs text-terminal-muted font-mono opacity-60"
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
