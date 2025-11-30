import React, { useEffect, useState, useRef } from 'react'
import './rotating-titles.css'

// Simple rotating titles component — cycles through `titles` array
// Animation: vertical scroll (slide up) per item; configurable interval
export default function RotatingTitles({ titles = [], interval = 2000, className = '' }) {
  const [index, setIndex] = useState(0)
  const mounted = useRef(true)

  useEffect(() => {
    mounted.current = true
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % titles.length)
    }, interval)
    return () => {
      mounted.current = false
      clearInterval(timer)
    }
  }, [titles.length, interval])

  if (!titles || titles.length === 0) return null

  return (
    <div className="rotating-titles" aria-live="polite">
      <div className="rotating-window">
        {titles.map((t, i) => (
          <div
            key={t + i}
            className={`rotating-item ${i === index ? 'active' : ''} ${className}`}>
            {t}
          </div>
        ))}
      </div>
    </div>
  )
}
