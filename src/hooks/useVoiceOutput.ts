import { useCallback, useRef } from 'react'

export function useVoiceOutput() {
  const queueRef = useRef<SpeechSynthesisUtterance[]>([])
  const speakingRef = useRef(false)

  const isSupported =
    typeof window !== 'undefined' && 'speechSynthesis' in window

  const speak = useCallback((text: string, rate = 1) => {
    if (!isSupported) return
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = rate
    utterance.lang = 'en-US'
    utterance.onend = () => {
      speakingRef.current = false
      const next = queueRef.current.shift()
      if (next) {
        speakingRef.current = true
        window.speechSynthesis.speak(next)
      }
    }

    if (speakingRef.current) {
      queueRef.current.push(utterance)
    } else {
      speakingRef.current = true
      window.speechSynthesis.speak(utterance)
    }
  }, [isSupported])

  const stop = useCallback(() => {
    window.speechSynthesis?.cancel()
    queueRef.current = []
    speakingRef.current = false
  }, [])

  return { isSupported, speak, stop }
}
