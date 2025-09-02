import React, { useRef, useState } from 'react'
import './Card3D.css'

const Card3D = ({ children, intensity = 0.1, className = '' }) => {
  const cardRef = useRef()
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    const rotateX = (y - centerY) / centerY * intensity * 20
    const rotateY = (centerX - x) / centerX * intensity * 20

    setMousePosition({ x: rotateX, y: rotateY })
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setMousePosition({ x: 0, y: 0 })
  }

  const transform = isHovered
    ? `perspective(1000px) rotateX(${mousePosition.x}deg) rotateY(${mousePosition.y}deg) scale(1.05)`
    : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)'

  return (
    <div
      ref={cardRef}
      className={`card-3d ${className}`}
      style={{
        transform,
        transformStyle: 'preserve-3d',
        transition: isHovered ? 'none' : 'transform 0.3s ease-out',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="card-3d-content">
        {children}
      </div>
      {isHovered && (
        <div 
          className="card-3d-glow"
          style={{
            background: `radial-gradient(circle at ${((mousePosition.y + 20) / 40) * 100}% ${((mousePosition.x + 20) / 40) * 100}%, rgba(99, 102, 241, 0.3), transparent 70%)`
          }}
        />
      )}
    </div>
  )
}

export default Card3D
