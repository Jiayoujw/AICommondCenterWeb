interface ScanlinesProps {
  enabled?: boolean
}

export function Scanlines({ enabled = true }: ScanlinesProps) {
  if (!enabled) return null
  return <div className="scanlines" />
}
