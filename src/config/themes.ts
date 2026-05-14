export const NEON_COLORS = {
  cyan: '#00fff5',
  magenta: '#ff00ff',
  green: '#39ff14',
  yellow: '#ffff00',
  red: '#ff3344',
  blue: '#00aaff',
} as const

export const STATUS_COLORS: Record<string, string> = {
  pending: NEON_COLORS.blue,
  running: NEON_COLORS.cyan,
  completed: NEON_COLORS.green,
  failed: NEON_COLORS.red,
  skipped: '#666666',
}

export const GLOW_PRESETS = {
  cyan: `0 0 5px ${NEON_COLORS.cyan}, 0 0 10px ${NEON_COLORS.cyan}66`,
  magenta: `0 0 5px ${NEON_COLORS.magenta}, 0 0 10px ${NEON_COLORS.magenta}66`,
  green: `0 0 5px ${NEON_COLORS.green}, 0 0 10px ${NEON_COLORS.green}66`,
}

export const FONT_SIZES = {
  sm: '13px',
  md: '15px',
  lg: '17px',
} as const
