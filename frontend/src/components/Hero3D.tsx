import { useRef, useEffect, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { OrbitControls, useTexture } from "@react-three/drei"
import { Mesh } from "three"

// Detect if device is mobile
const isMobile = () => {
  return window.innerWidth < 768
}

const Hero3D = () => {
  const [mobile, setMobile] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  
  useEffect(() => {
    // Set initial state
    setMobile(isMobile())
    
    // Add resize listener
    const handleResize = () => setMobile(isMobile())
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      {/* Simple lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[0, 5, 5]} intensity={0.8} />

      {/* Simple Profile Image with glow */}
      <SimpleProfileImage 
        position={[0, 0, 0]} 
        mobile={mobile} 
        isHovered={isHovered}
        setIsHovered={setIsHovered}
      />

      {/* No auto-rotation, just basic controls */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 3}
      />
    </>
  )
}

// Enhanced Profile Image with Glowing Sparkly Purple-Pink Shadow
const SimpleProfileImage = ({ position, mobile, isHovered, setIsHovered }: { 
  position: [number, number, number]; 
  mobile: boolean; 
  isHovered: boolean;
  setIsHovered: (hovered: boolean) => void;
}) => {
  const meshRef = useRef<Mesh>(null)
  const glowRef = useRef<Mesh>(null)
  const texture = useTexture('/ro_img.jpeg')

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.lookAt(state.camera.position)
      
      // Continuous floating and rotation animation (no hover needed)
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5) * 0.08
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 1.2) * 0.08
      
      // Add subtle scaling on hover for extra effect
      if (isHovered) {
        meshRef.current.scale.setScalar(1.05 + Math.sin(state.clock.elapsedTime * 2) * 0.02)
      } else {
        meshRef.current.scale.setScalar(1)
      }
    }
    
    // Single thin neon glow - subtle pulsing
    if (glowRef.current) {
      glowRef.current.lookAt(state.camera.position)
      const glowIntensity = 0.4 + Math.sin(state.clock.elapsedTime * 1.8) * 0.2
      if (glowRef.current.material && 'opacity' in glowRef.current.material) {
        (glowRef.current.material as any).opacity = glowIntensity
      }
    }
  })

  // Adjusted profile picture size
  const size = mobile ? 0.7 : 1.1

  return (
    <group>
      {/* Single Thin Neon Glow */}
      <mesh 
        ref={glowRef} 
        position={[position[0], position[1], position[2] - 0.01]}
      >
        <circleGeometry args={[size + 0.08, 32]} />
        <meshBasicMaterial 
          color="#a855f7" // Purple-400 (matching portfolio gradient)
          transparent 
          opacity={0.4}
        />
      </mesh>
      
      {/* Profile Image with hover detection */}
      <mesh 
        ref={meshRef} 
        position={position}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
      >
        <circleGeometry args={[size, 32]} />
        <meshBasicMaterial map={texture} transparent opacity={1} />
      </mesh>
    </group>
  )
}


export default Hero3D
