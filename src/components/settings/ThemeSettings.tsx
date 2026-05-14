import { useUIStore } from '../../stores/uiStore'
import { cn } from '../../utils/cn'

export function ThemeSettings() {
  const glowIntensity = useUIStore((s) => s.glowIntensity)
  const setGlowIntensity = useUIStore((s) => s.setGlowIntensity)
  const fontSize = useUIStore((s) => s.fontSize)
  const setFontSize = useUIStore((s) => s.setFontSize)
  const scanlinesEnabled = useUIStore((s) => s.scanlinesEnabled)
  const toggleScanlines = useUIStore((s) => s.toggleScanlines)

  return (
    <div className="space-y-4">
      <div>
        <label className="text-[10px] text-terminal-muted font-mono block mb-1">
          GLOW INTENSITY ({glowIntensity}%)
        </label>
        <input
          type="range"
          min={10}
          max={100}
          value={glowIntensity}
          onChange={(e) => setGlowIntensity(Number(e.target.value))}
          className="w-full accent-[var(--color-neon-cyan)] h-1.5"
        />
      </div>

      <div>
        <label className="text-[10px] text-terminal-muted font-mono block mb-1">
          FONT SIZE
        </label>
        <div className="flex gap-1">
          {(['sm', 'md', 'lg'] as const).map((size) => (
            <button
              key={size}
              onClick={() => setFontSize(size)}
              className={cn(
                'flex-1 py-1.5 text-xs font-mono border rounded transition-all',
                fontSize === size
                  ? 'border-[var(--color-neon-cyan)] text-[var(--color-neon-cyan)]'
                  : 'border-terminal-border text-terminal-muted hover:text-terminal-text'
              )}
            >
              {size.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-[10px] text-terminal-muted font-mono block mb-1">
          CRT SCANLINES
        </label>
        <button
          onClick={toggleScanlines}
          className={cn(
            'w-full py-2 text-xs font-mono border rounded transition-all',
            scanlinesEnabled
              ? 'border-[var(--color-neon-green)] text-[var(--color-neon-green)]'
              : 'border-terminal-border text-terminal-muted'
          )}
        >
          {scanlinesEnabled ? 'ENABLED' : 'DISABLED'}
        </button>
      </div>

      <div className="pt-4 border-t border-terminal-border">
        <p className="text-[10px] text-terminal-muted font-mono leading-relaxed">
          Colors can be customized via CSS custom properties. Edit <code className="text-[10px]">index.css</code> to
          change neon colors, background, and more.
        </p>
      </div>
    </div>
  )
}
