import { useEffect, useRef } from 'react'

export function useAutoScroll(dependency: unknown) {
  const containerRef = useRef<HTMLDivElement>(null)
  const shouldScrollRef = useRef(true)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container
      shouldScrollRef.current = scrollHeight - scrollTop - clientHeight < 60
    }
    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (shouldScrollRef.current && containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [dependency])

  return containerRef
}
