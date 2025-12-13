import React, { useRef, useMemo } from 'react'
import useIsMobile from '../hooks/useIsMobile'
import { Canvas, useFrame } from '@react-three/fiber'

// Floating stat orb with 3D text effect
function StatOrb({ position, color, value, label, index }) {
  const meshRef = useRef()
  const ringRef = useRef()
  
  useFrame((state) => {
    if (!meshRef.current || !ringRef.current) return
    
    const time = state.clock.getElapsedTime()
    // Main orb animation
    meshRef.current.rotation.y = time * 0.5 + index
    meshRef.current.position.y = position[1] + Math.sin(time + index) * 0.2
    
    // Ring rotation
    ringRef.current.rotation.x = time * 0.3
    ringRef.current.rotation.z = time * 0.4
  })

  return (
    <group position={position}>
      {/* Main stat orb */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial 
          color={color}
          transparent
          opacity={0.8}
          roughness={0.2}
          metalness={0.8}
          emissive={color}
          emissiveIntensity={0.1}
        />
      </mesh>
      
      {/* Rotating ring around orb */}
      <mesh ref={ringRef}>
        <torusGeometry args={[1.2, 0.1, 8, 16]} />
        <meshStandardMaterial 
          color={color}
          transparent
          opacity={0.6}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Inner glow */}
      <mesh>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshBasicMaterial 
          color={color}
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  )
}

// Skill constellation - connected skill nodes
function SkillConstellation() {
  const groupRef = useRef()
  
  const skillNodes = useMemo(() => [
    { pos: [-2, 1, 0], color: '#61dafb', name: 'React' },
    { pos: [0, 2, -1], color: '#f7df1e', name: 'JavaScript' },
    { pos: [2, 1, 0], color: '#339933', name: 'Node.js' },
    { pos: [-1, -1, 1], color: '#1572b6', name: 'CSS' },
    { pos: [1, -1, -1], color: '#47a248', name: 'MongoDB' },
    { pos: [0, 0, 0], color: '#8b5cf6', name: 'Core' },
  ], [])
  
  useFrame((state) => {
    if (!groupRef.current) return
    
    const time = state.clock.getElapsedTime()
    groupRef.current.rotation.y = time * 0.1
    groupRef.current.rotation.x = Math.sin(time * 0.5) * 0.1
  })

  return (
    <group ref={groupRef}>
      {/* Skill nodes */}
      {skillNodes.map((node, index) => (
        <mesh key={index} position={node.pos}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial 
            color={node.color}
            emissive={node.color}
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}
      
      {/* Connection lines */}
      {skillNodes.slice(0, -1).map((node, index) => {
        const centerNode = skillNodes[skillNodes.length - 1]
        const points = [
          node.pos[0], node.pos[1], node.pos[2],
          centerNode.pos[0], centerNode.pos[1], centerNode.pos[2]
        ]
        
        return (
          <line key={`line-${index}`}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array(points)}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#8b5cf6" transparent opacity={0.4} />
          </line>
        )
      })}
    </group>
  )
}

// Floating experience timeline
function ExperienceTimeline() {
  const timelineRef = useRef()
  
  const milestones = useMemo(() => [
    { pos: [0, 2, 0], color: '#10b981', year: '2024' },
    { pos: [0, 1, 0], color: '#3b82f6', year: '2023' },
    { pos: [0, 0, 0], color: '#f59e0b', year: '2022' },
    { pos: [0, -1, 0], color: '#ef4444', year: '2021' },
  ], [])
  
  useFrame((state) => {
    if (!timelineRef.current) return
    
    const time = state.clock.getElapsedTime()
    timelineRef.current.position.y = Math.sin(time * 0.8) * 0.2
  })

  return (
    <group ref={timelineRef}>
      {/* Timeline line */}
      <mesh>
        <cylinderGeometry args={[0.02, 0.02, 4, 8]} />
        <meshStandardMaterial color="#6b7280" transparent opacity={0.6} />
      </mesh>
      
      {/* Milestone nodes */}
      {milestones.map((milestone, index) => (
        <group key={index} position={milestone.pos}>
          <mesh>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial 
              color={milestone.color}
              emissive={milestone.color}
              emissiveIntensity={0.4}
            />
          </mesh>
          
          {/* Pulsing ring */}
          <mesh>
            <torusGeometry args={[0.25, 0.05, 8, 16]} />
            <meshBasicMaterial 
              color={milestone.color}
              transparent
              opacity={0.8}
            />
          </mesh>
        </group>
      ))}
    </group>
  )
}

// Main 3D scene for About section
function AboutScene({ variant = 'stats' }) {
  const stats = [
    { value: '15+', label: 'Projects', color: '#61dafb', position: [-3, 0, 0] },
    { value: '200+', label: 'Problems', color: '#f59e0b', position: [0, 1, -1] },
    { value: '2+', label: 'Experience', color: '#10b981', position: [3, 0, 0] },
    { value: '10+', label: 'Technologies', color: '#8b5cf6', position: [0, -1, 1] },
  ]

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={0.8} />
      <pointLight position={[-5, -5, -5]} intensity={0.3} color="#8b5cf6" />
      <spotLight 
        position={[0, 10, 0]} 
        angle={0.3} 
        penumbra={1} 
        intensity={0.5}
        castShadow
      />
      
      {variant === 'stats' && (
        <>
          {stats.map((stat, index) => (
            <StatOrb
              key={index}
              position={stat.position}
              color={stat.color}
              value={stat.value}
              label={stat.label}
              index={index}
            />
          ))}
        </>
      )}
      
      {variant === 'skills' && <SkillConstellation />}
      
      {variant === 'timeline' && <ExperienceTimeline />}
    </>
  )
}

// Main exported component
const About3DBackground = ({ variant = 'stats', height = '400px' }) => {
  const isMobile = useIsMobile()
  if (isMobile) {
    // Mobile fallback: show simple static layout for accessibility & performance
    return (
      <div style={{ width: '100%', height: height, position: 'relative', borderRadius: '12px', background: 'linear-gradient(135deg, rgba(99,102,241,0.03), rgba(168,85,247,0.03))' }}>
        <div style={{ padding: '16px', display: 'flex', gap: '12px', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
          {variant === 'stats' && (
            <>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>15+</div>
                <div style={{ fontSize: '0.85rem' }}>Projects</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>200+</div>
                <div style={{ fontSize: '0.85rem' }}>Problems</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>2+</div>
                <div style={{ fontSize: '0.85rem' }}>Experience</div>
              </div>
            </>
          )}
        </div>
      </div>
    )
  }

  return (
    <div style={{
      width: '100%',
      height: height,
      position: 'relative',
      borderRadius: '15px',
      background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(168, 85, 247, 0.05) 100%)',
      overflow: 'hidden'
    }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        style={{ background: 'transparent' }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0)
        }}
      >
        <AboutScene variant={variant} />
      </Canvas>
    </div>
  )
}

export default About3DBackground
