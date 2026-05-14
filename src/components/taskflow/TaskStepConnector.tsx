export function TaskStepConnector() {
  return (
    <div className="flex md:flex-row flex-col items-center justify-center px-1 py-1 md:py-0">
      <div className="md:w-8 md:h-0.5 w-0.5 h-4 bg-terminal-border relative overflow-hidden">
        <div
          className="absolute inset-0 bg-[var(--color-neon-cyan)]/50"
          style={{
            animation: 'slide-in-right 1s ease-in-out infinite',
          }}
        />
      </div>
    </div>
  )
}
