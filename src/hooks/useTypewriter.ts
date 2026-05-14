import { useState, useEffect, useRef, useCallback } from 'react'
import { TYPEWRITER_SPEED } from '../config/constants'

interface UseTypewriterOptions {
  speed?: number
  enabled?: boolean
}

export function useTypewriter(targetText: string, options: UseTypewriterOptions = {}) {
  const { speed = TYPEWRITER_SPEED, enabled = true } = options
  const [displayText, setDisplayText] = useState('')
  const queueRef = useRef<string[]>([])
  const lastTimeRef = useRef(0)
  const rafRef = useRef(0)
  const prevTargetLenRef = useRef(0)

  useEffect(() => {
    const newLen = targetText.length
    const prevLen = prevTargetLenRef.current
    if (newLen > prevLen) {
      const newChars = targetText.slice(prevLen).split('')
      queueRef.current.push(...newChars)
    }
    prevTargetLenRef.current = newLen
  }, [targetText])

  useEffect(() => {
    if (!enabled) return

    const tick = (time: number) => {
      if (time - lastTimeRef.current >= speed) {
        const char = queueRef.current.shift()
        if (char !== undefined) {
          setDisplayText((prev) => prev + char)
        }
        lastTimeRef.current = time
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [enabled, speed])

  const isAnimating = displayText.length < targetText.length

  const skipToEnd = useCallback(() => {
    queueRef.current = []
    setDisplayText(targetText)
    prevTargetLenRef.current = targetText.length
  }, [targetText])

  return { displayText, isAnimating, skipToEnd }
}
