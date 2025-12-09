import React, { useEffect, useState, useRef } from 'react'
import './typewriter-titles.css'

// Simple typewriter component.
// Props: titles: string[], typingSpeed, deletingSpeed, pause (ms)
export default function TypewriterTitles({ titles = [], typingSpeed = 120, deletingSpeed = 60, pause = 1400, className = '' }) {
  const [text, setText] = useState('')
  const [index, setIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const mounted = useRef(true)
  const textRef = useRef('')

  useEffect(() => {
    mounted.current = true
    if (!titles || titles.length === 0) return

    let timeoutId
    const fullText = titles[index % titles.length]

    const tick = () => {
      if (!mounted.current) return

      if (!isDeleting) {
        setText(prev => {
          const next = fullText.substring(0, prev.length + 1)
          textRef.current = next
          return next
        })
        if (textRef.current === fullText) {
          timeoutId = setTimeout(() => setIsDeleting(true), pause)
        } else {
          timeoutId = setTimeout(tick, typingSpeed)
        }
      } else {
        setText(prev => {
          const next = fullText.substring(0, prev.length - 1)
          textRef.current = next
          return next
        })
        if (textRef.current === '') {
          setIsDeleting(false)
          setIndex(i => (i + 1) % titles.length)
          timeoutId = setTimeout(tick, typingSpeed)
        } else {
          timeoutId = setTimeout(tick, deletingSpeed)
        }
      }
    }

    // start the loop
    timeoutId = setTimeout(tick, typingSpeed)

    return () => {
      mounted.current = false
      clearTimeout(timeoutId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, isDeleting, titles])

  // ARIA: announce live updates politely
  return (
    <span className="typewriter" aria-live="polite" aria-atomic="true">
      <span className={`typewriter-text ${className}`}>{text}</span>
      <span className="typewriter-caret" aria-hidden="true">|</span>
    </span>
  )
}
