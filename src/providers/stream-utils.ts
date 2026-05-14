export function createAbortController(): AbortController {
  return new AbortController()
}

export function createTimeoutSignal(ms: number): { signal: AbortSignal; clear: () => void } {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(new Error('Request timed out')), ms)
  return {
    signal: controller.signal,
    clear: () => clearTimeout(timeoutId),
  }
}
