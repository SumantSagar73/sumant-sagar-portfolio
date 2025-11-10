import React, { useState, useEffect, useRef } from 'react'
import { 
  FaReact, 
  FaJs, 
  FaNodeJs, 
  FaCss3Alt, 
  FaHtml5, 
  FaGitAlt,
  FaPython,
  FaDocker,
  FaAws,
  FaDatabase,
  FaServer,
  FaBootstrap,
  FaSass,
  FaMobile,
  FaPalette,
  FaCode
} from 'react-icons/fa'
import { 
  SiMongodb, 
  SiExpress, 
  SiTailwindcss,
  SiTypescript,
  SiVite,
  SiNextdotjs,
  SiFirebase,
  SiRedis,
  SiPostgresql,
  SiGraphql,
  SiRedux,
  SiJest,
  SiWebpack,
  SiBabel,
  SiEslint,
  SiFigma,
  SiCplusplus,
  SiMysql,
  SiKotlin,
  SiJavascript,
  SiLeetcode,
  SiGeeksforgeeks,
  SiCodingninjas
} from 'react-icons/si'
import { DiDotnet } from 'react-icons/di'
import '../styles/components/SkillOrbs.css'

const SkillOrbsFallback = () => {
  const containerRef = useRef(null)
  const [orbs, setOrbs] = useState([])
  const [draggedOrb, setDraggedOrb] = useState(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const animationRef = useRef()

  // Initialize orbs with physics properties
  useEffect(() => {
    if (!containerRef.current) return

    const skills = [
      // Core Programming Languages
      { name: 'JavaScript', color: '#f7df1e', icon: SiJavascript },
      { name: 'TypeScript', color: '#3178c6', icon: SiTypescript },
      { name: 'Python', color: '#3776ab', icon: FaPython },
      { name: 'C++', color: '#00599c', icon: SiCplusplus },
      { name: 'C#', color: '#239120', icon: DiDotnet },
      { name: 'Kotlin', color: '#7f52ff', icon: SiKotlin },
      
      // Frontend Technologies
      { name: 'React', color: '#61dafb', icon: FaReact },
      { name: 'HTML5', color: '#e34f26', icon: FaHtml5 },
      { name: 'CSS3', color: '#1572b6', icon: FaCss3Alt },
      { name: 'Next.js', color: '#000000', icon: SiNextdotjs },
      { name: 'Sass', color: '#cc6699', icon: FaSass },
      { name: 'Bootstrap', color: '#7952b3', icon: FaBootstrap },
      { name: 'Tailwind', color: '#06b6d4', icon: SiTailwindcss },
      
      // Backend & Database
      { name: 'Node.js', color: '#339933', icon: FaNodeJs },
      { name: 'Express', color: '#000000', icon: SiExpress },
      { name: 'MongoDB', color: '#47a248', icon: SiMongodb },
      { name: 'MySQL', color: '#4479a1', icon: SiMysql },
      { name: 'PostgreSQL', color: '#336791', icon: SiPostgresql },
      { name: 'Firebase', color: '#ffca28', icon: SiFirebase },
      { name: 'Redis', color: '#dc382d', icon: SiRedis },
      
      // Tools & DevOps
      { name: 'Git', color: '#f05032', icon: FaGitAlt },
      { name: 'Docker', color: '#2496ed', icon: FaDocker },
      { name: 'AWS', color: '#ff9900', icon: FaAws },
      { name: 'Vite', color: '#646cff', icon: SiVite },
      { name: 'Webpack', color: '#8dd6f9', icon: SiWebpack },
      { name: 'Babel', color: '#f9dc3e', icon: SiBabel },
      { name: 'ESLint', color: '#4b32c3', icon: SiEslint },
      
      // State Management & Testing
      { name: 'Redux', color: '#764abc', icon: SiRedux },
      { name: 'GraphQL', color: '#e10098', icon: SiGraphql },
      { name: 'Jest', color: '#c21325', icon: SiJest },
      
      // Design & Other Skills
      { name: 'UI/UX', color: '#ff6b6b', icon: FaPalette },
      { name: 'Figma', color: '#f24e1e', icon: SiFigma },
      { name: 'DSA', color: '#4ecdc4', icon: FaCode },
      { name: 'Responsive', color: '#764abc', icon: FaMobile },
      
      // Coding Platforms
      { name: 'LeetCode', color: '#ffa116', icon: SiLeetcode },
      { name: 'GeeksforGeeks', color: '#0f9d58', icon: SiGeeksforgeeks },
      { name: 'CodingNinjas', color: '#dd6620', icon: SiCodingninjas },
    ]

    const containerRect = containerRef.current.getBoundingClientRect()
    const orbSize = 85 //80
    
    const initialOrbs = skills.map((skill, index) => ({
      id: index,
      skill,
      x: Math.random() * (containerRect.width - orbSize),
      y: -100 - (index * 50), // Start above container
      vx: (Math.random() - 0.5) * 2, // Initial horizontal velocity
      vy: 0, // Vertical velocity starts at 0
      radius: orbSize / 2,
      isDragging: false,
      dragOffset: { x: 0, y: 0 },
      bounceScale: 1 // For bounce animation
    }))

    setOrbs(initialOrbs)
  }, [])

  // Physics simulation with ball-to-ball collisions
  useEffect(() => {
    if (!containerRef.current || orbs.length === 0) return

    const animate = () => {
      const containerRect = containerRef.current.getBoundingClientRect()
      const gravity = 0.25 // Further reduced gravity
      const bounce = 0.3 // Much reduced bounce to prevent bouncing
      const friction = 0.995 // Higher friction for better damping
      const minVelocity = 0.05 // Higher threshold to stop micro-movements
      const floorDamping = 0.15 // Additional damping when near floor
      const sleepThreshold = 0.15 // Velocity below which balls "sleep"

      setOrbs(prevOrbs => {
        const newOrbs = prevOrbs.map(orb => {
          // Decay bounce scale back to 1
          const newBounceScale = orb.bounceScale > 1 
            ? Math.max(1, orb.bounceScale - 0.02) 
            : orb.bounceScale < 1 
            ? Math.min(1, orb.bounceScale + 0.02)
            : 1

          if (orb.isDragging) {
            // Calculate target position based on mouse and drag offset
            const targetX = mousePos.x - orb.dragOffset.x
            const targetY = mousePos.y - orb.dragOffset.y
            
            // Use smoother following with less aggressive movement
            const dragForce = 0.15 // Reduced for smoother following
            const deltaX = targetX - orb.x
            const deltaY = targetY - orb.y
            
            return {
              ...orb,
              x: orb.x + deltaX * dragForce,
              y: orb.y + deltaY * dragForce,
              vx: deltaX * 0.08, // Reduced velocity transfer
              vy: deltaY * 0.08,
              isAsleep: false,
              bounceScale: newBounceScale
            }
          }

          let newX = orb.x + orb.vx
          let newY = orb.y + orb.vy
          let newVx = orb.vx * friction
          let newVy = orb.vy + gravity

          // Enhanced sleep mode for settled balls
          const velocityMagnitude = Math.sqrt(newVx * newVx + newVy * newVy)
          const isNearFloor = newY >= containerRect.height - orb.radius - 5
          
          if (velocityMagnitude < sleepThreshold && isNearFloor) {
            // Ball is essentially motionless, put it to sleep
            newVx = 0
            newVy = 0
            newY = containerRect.height - orb.radius // Snap to exact floor position
            return {
              ...orb,
              x: newX,
              y: newY,
              vx: newVx,
              vy: newVy,
              isAsleep: true,
              bounceScale: 1
            }
          }

          // Apply stronger damping when moving slowly to avoid micro-vibrations
          if (Math.abs(newVx) < minVelocity) {
            newVx = 0
          }
          if (Math.abs(newVy) < minVelocity && isNearFloor) {
            newVy = 0
          }

          // Extra damping when near floor to prevent bouncing
          if (isNearFloor) {
            newVx *= (1 - floorDamping)
            newVy *= (1 - floorDamping)
          }

          // Boundary collisions
          const containerWidth = containerRect.width
          const containerHeight = containerRect.height

          // Track if collision happened for bounce animation
          let hasCollision = false

          // Left and right walls
          if (newX <= orb.radius) {
            newX = orb.radius
            newVx = -newVx * bounce
            hasCollision = Math.abs(newVx) > 0.5 // Only trigger if significant impact
          } else if (newX >= containerWidth - orb.radius) {
            newX = containerWidth - orb.radius
            newVx = -newVx * bounce
            hasCollision = Math.abs(newVx) > 0.5
          }

          // Floor - with enhanced settling logic to eliminate tiny bounces
          if (newY >= containerHeight - orb.radius) {
            newY = containerHeight - orb.radius

            // If vertical velocity is small, stop vertical movement completely
            if (Math.abs(newVy) < 1.0) {
              newVy = 0
              // Aggressively damp horizontal velocity as well to prevent sliding/vibration
              newVx *= 0.5
            } else {
              newVy = -newVy * bounce
              hasCollision = Math.abs(newVy) > 1.0 // Trigger bounce on floor impact
            }

            // If very close to floor and low energy, zero it out completely
            const distanceFromFloor = (containerHeight - orb.radius) - orb.y
            if (distanceFromFloor < 2 && Math.abs(newVy) < 1.5) {
              newVy = 0
              // Stop horizontal movement too to prevent vibration
              if (Math.abs(newVx) < 0.5) {
                newVx = 0
              }
            }
          }

          return {
            ...orb,
            x: newX,
            y: newY,
            vx: newVx,
            vy: newVy,
            bounceScale: hasCollision ? 1.08 : newBounceScale
          }
        })

        // Ball-to-ball collision detection and response
        for (let i = 0; i < newOrbs.length; i++) {
          for (let j = i + 1; j < newOrbs.length; j++) {
            const orb1 = newOrbs[i]
            const orb2 = newOrbs[j]

            // Skip collision if both balls are asleep (settled)
            if (orb1.isAsleep && orb2.isAsleep) continue

            // Calculate distance between centers
            const dx = orb2.x - orb1.x
            const dy = orb2.y - orb1.y
            const distance = Math.sqrt(dx * dx + dy * dy)
            const minDistance = orb1.radius + orb2.radius

            // Check for collision
            if (distance < minDistance && distance > 0) {
              // Wake up sleeping balls when collision occurs
              newOrbs[i].isAsleep = false
              newOrbs[j].isAsleep = false
              
              // Normalize collision vector
              const normalX = dx / distance
              const normalY = dy / distance

              // Separate overlapping balls
              const overlap = minDistance - distance
              const separationX = (normalX * overlap) / 2
              const separationY = (normalY * overlap) / 2

              // Track collision impact for bounce effect
              const impactStrength = Math.min(Math.abs(overlap) / 10, 1)

              // If one ball is being dragged, only move the non-dragged ball
              if (orb1.isDragging && !orb2.isDragging) {
                newOrbs[j].x += separationX * 2 // Move the non-dragged ball away
                newOrbs[j].y += separationY * 2
                
                // Apply strong push force to the non-dragged ball
                const pushForce = 2
                newOrbs[j].vx += normalX * pushForce
                newOrbs[j].vy += normalY * pushForce
                
                // Add bounce effect to pushed ball
                newOrbs[j].bounceScale = 1.1
              } else if (orb2.isDragging && !orb1.isDragging) {
                newOrbs[i].x -= separationX * 2 // Move the non-dragged ball away
                newOrbs[i].y -= separationY * 2
                
                // Apply strong push force to the non-dragged ball
                const pushForce = 2
                newOrbs[i].vx -= normalX * pushForce
                newOrbs[i].vy -= normalY * pushForce
                
                // Add bounce effect to pushed ball
                newOrbs[i].bounceScale = 1.1
              } else if (!orb1.isDragging && !orb2.isDragging) {
                // Normal collision between two non-dragged balls
                newOrbs[i].x -= separationX
                newOrbs[i].y -= separationY
                newOrbs[j].x += separationX
                newOrbs[j].y += separationY

                // Calculate relative velocity
                const relativeVx = orb2.vx - orb1.vx
                const relativeVy = orb2.vy - orb1.vy

                // Calculate relative velocity along normal
                const velocityAlongNormal = relativeVx * normalX + relativeVy * normalY

                // Don't resolve if velocities are separating
                if (velocityAlongNormal > 0) continue

                // Much reduced restitution for minimal bouncing
                const restitution = 0.15 // Further reduced to minimize bounce

                // Calculate impulse scalar
                const impulse = -(1 + restitution) * velocityAlongNormal

                // Apply impulse to velocities with reduced force
                const impulseX = impulse * normalX
                const impulseY = impulse * normalY

                newOrbs[i].vx -= impulseX * 0.3 // Further reduced impulse transfer
                newOrbs[i].vy -= impulseY * 0.3
                newOrbs[j].vx += impulseX * 0.3
                newOrbs[j].vy += impulseY * 0.3

                // Apply additional damping after collision to settle faster
                newOrbs[i].vx *= 0.95
                newOrbs[i].vy *= 0.95
                newOrbs[j].vx *= 0.95
                newOrbs[j].vy *= 0.95

                // Add subtle bounce effect based on impact strength
                if (impactStrength > 0.3) {
                  newOrbs[i].bounceScale = 1 + (impactStrength * 0.08)
                  newOrbs[j].bounceScale = 1 + (impactStrength * 0.08)
                }
              }
            }
          }
        }

        return newOrbs
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [orbs.length, mousePos, draggedOrb])

  // Mouse move handler with velocity tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return
      
      const containerRect = containerRef.current.getBoundingClientRect()
      const newMousePos = {
        x: e.clientX - containerRect.left,
        y: e.clientY - containerRect.top
      }
      
      setMousePos(newMousePos)
    }

    const handleMouseUp = () => {
      if (draggedOrb !== null) {
        setOrbs(prevOrbs => prevOrbs.map(orb => {
          if (orb.id === draggedOrb) {
            // Give the ball momentum based on drag velocity
            const releaseVelocityMultiplier = 0.3
            return { 
              ...orb, 
              isDragging: false,
              vx: orb.vx * releaseVelocityMultiplier,
              vy: orb.vy * releaseVelocityMultiplier
            }
          }
          return orb
        }))
        setDraggedOrb(null)
      }
    }

    if (draggedOrb !== null) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [draggedOrb])

  const handleOrbMouseDown = (e, orbId) => {
    e.preventDefault()
    if (!containerRef.current) return

    const containerRect = containerRef.current.getBoundingClientRect()
    const orb = orbs.find(o => o.id === orbId)
    if (!orb) return

    const mouseX = e.clientX - containerRect.left
    const mouseY = e.clientY - containerRect.top

    // Set initial mouse position to prevent jump
    setMousePos({ x: mouseX, y: mouseY })
    
    setDraggedOrb(orbId)
    setOrbs(prevOrbs => prevOrbs.map(o => 
      o.id === orbId 
        ? { 
            ...o, 
            isDragging: true,
            dragOffset: {
              x: mouseX - o.x, // Offset from ball center to mouse
              y: mouseY - o.y
            }
          }
        : o
    ))
  }

  return (
    <div className="skill-orbs-container">
      {/* Fun Interactive Message */}
      <div className="interaction-message">
        <p>🎮 <strong>Interactive Physics Playground!</strong></p>
        <p>Drag, throw, and watch the tech skills bounce around! 
           <span className="emoji-hint"> ✨ Hover for skill details</span>
        </p>
      </div>
      
      <div 
        ref={containerRef}
        className="physics-playground"
        style={{ position: 'relative', overflow: 'hidden' }}
      >
        {orbs.map((orb) => {
          const IconComponent = orb.skill.icon
          return (
            <div
              key={orb.id}
              className="skill-orb physics-ball"
              style={{
                position: 'absolute',
                left: `${orb.x - orb.radius}px`,
                top: `${orb.y - orb.radius}px`,
                '--primary-color': orb.skill.color,
                cursor: orb.isDragging ? 'grabbing' : 'grab',
                zIndex: orb.isDragging ? 10 : 1,
                transform: orb.isDragging 
                  ? 'scale(1.1)' 
                  : `scale(${orb.bounceScale})`,
                transition: orb.isDragging ? 'none' : 'transform 0.15s ease-out'
              }}
              onMouseDown={(e) => handleOrbMouseDown(e, orb.id)}
              data-skill={orb.skill.name}
            >
              <div className="orb-content">
                <IconComponent className="skill-icon" />
                <span className="skill-tooltip">{orb.skill.name}</span>
              </div>
              <div className="orb-glow"></div>
              <div className="orb-ripple"></div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SkillOrbsFallback
