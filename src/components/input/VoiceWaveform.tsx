import { cn } from '../../utils/cn'

interface VoiceWaveformProps {
  active?: boolean
  className?: string
}

export function VoiceWaveform({ active = true, className }: VoiceWaveformProps) {
  if (!active) return null

  return (
    <div className={cn('flex items-center gap-0.5 h-4', className)}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className="w-1 bg-[var(--color-neon-cyan)] rounded-full animate-waveform-bar opacity-80"
          style={{ animationDelay: `${i * 0.15}s`, animationDuration: `${0.6 + i * 0.2}s` }}
        />
      ))}
    </div>
  )
}

/* Waveform animation */