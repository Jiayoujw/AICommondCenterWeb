import { useCallback, useRef } from 'react'
import { useVoiceStore } from '../stores/voiceStore'

export function useVoiceInput() {
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const setStatus = useVoiceStore((s) => s.setStatus)
  const setInterimTranscript = useVoiceStore((s) => s.setInterimTranscript)
  const setFinalTranscript = useVoiceStore((s) => s.setFinalTranscript)
  const setError = useVoiceStore((s) => s.setError)
  const status = useVoiceStore((s) => s.voiceState.status)

  const isSupported =
    typeof window !== 'undefined' &&
    ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)

  const start = useCallback(() => {
    if (!isSupported) {
      setError('Speech recognition not supported in this browser')
      return
    }

    const Ctor = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new Ctor()
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = 'en-US'

    recognition.onresult = (event) => {
      let interim = ''
      let final = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript
        if (event.results[i].isFinal) {
          final += transcript
        } else {
          interim += transcript
        }
      }
      setInterimTranscript(interim)
      if (final) {
        setFinalTranscript(final)
      }
    }

    recognition.onerror = (event) => {
      if (event.error === 'no-speech') return
      setError(event.message || event.error)
    }

    recognition.onend = () => {
      const currentStatus = useVoiceStore.getState().voiceState.status
      if (currentStatus === 'listening') {
        try { recognition.start() } catch { /* ignore */ }
      } else {
        setStatus('idle')
      }
    }

    try {
      recognition.start()
      recognitionRef.current = recognition
      setStatus('listening')
    } catch {
      setError('Failed to start microphone')
    }
  }, [isSupported, setStatus, setInterimTranscript, setFinalTranscript, setError])

  const stop = useCallback(() => {
    recognitionRef.current?.stop()
    setStatus('idle')
  }, [setStatus])

  const toggle = useCallback(() => {
    if (status === 'listening') {
      stop()
    } else {
      start()
    }
  }, [status, start, stop])

  return { isSupported, status, toggle, start, stop }
}
