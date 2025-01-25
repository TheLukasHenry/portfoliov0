'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function SpaceExplorer3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [exploring, setExploring] = useState<string | null>(null)
  const [speed, setSpeed] = useState(0)
  const [heading, setHeading] = useState(0)
  const router = useRouter()

  useEffect(() => {
    if (!canvasRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000)

    // Ship (camera) movement
    const shipPosition = new THREE.Vector3(0, 0, 0)
    const shipVelocity = new THREE.Vector3(0, 0, 0)
    const shipDirection = new THREE.Vector3(0, 0, -1)
    const maxSpeed = 0.5
    const acceleration = 0.01
    const deceleration = 0.005
    const rotationSpeed = 0.02

    // Load textures
    const textureLoader = new THREE.TextureLoader()
    const planetTextures = [
      textureLoader.load('/placeholder.svg?height=512&width=512&text=About'),
      textureLoader.load('/placeholder.svg?height=512&width=512&text=Contact'),
      textureLoader.load('/placeholder.svg?height=512&width=512&text=Projects'),
    ]

    // Planets
    const planets = [
      {
        name: 'About',
        position: new THREE.Vector3(50, 0, -100),
        texture: planetTextures[0],
        size: 15,
        color: 0xff6347,
      },
      {
        name: 'Contact',
        position: new THREE.Vector3(-50, 25, -150),
        texture: planetTextures[1],
        size: 10,
        color: 0x4169e1,
      },
      {
        name: 'Projects',
        position: new THREE.Vector3(0, -40, -200),
        texture: planetTextures[2],
        size: 20,
        color: 0x32cd32,
      },
      {
        name: 'Mystery',
        position: new THREE.Vector3(100, 30, -180),
        texture: planetTextures[0], // Reusing texture for now
        size: 12,
        color: 0x9932cc, // Purple
      },
      {
        name: 'Hidden',
        position: new THREE.Vector3(-80, -20, -250),
        texture: planetTextures[0], // Reusing texture for now
        size: 18,
        color: 0xffd700, // Gold
      },
    ]

    planets.forEach((planet) => {
      const planetGeometry = new THREE.SphereGeometry(planet.size, 32, 32)
      const planetMaterial = new THREE.MeshPhongMaterial({
        map: planet.texture,
        color: planet.color,
      })
      const planetMesh = new THREE.Mesh(planetGeometry, planetMaterial)
      planetMesh.position.copy(planet.position)
      scene.add(planetMesh)

      // Add planet name using sprite
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      canvas.width = 256
      canvas.height = 256
      if (context) {
        context.font = 'Bold 40px Arial'
        context.fillStyle = 'white'
        context.textAlign = 'center'
        context.fillText(planet.name, 128, 128)
      }
      const nameTexture = new THREE.CanvasTexture(canvas)
      const nameMaterial = new THREE.SpriteMaterial({ map: nameTexture })
      const nameSprite = new THREE.Sprite(nameMaterial)
      nameSprite.position.set(
        planet.position.x,
        planet.position.y + planet.size + 5,
        planet.position.z
      )
      nameSprite.scale.set(20, 10, 1)
      scene.add(nameSprite)
    })

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040)
    scene.add(ambientLight)
    const pointLight = new THREE.PointLight(0xffffff, 1, 300)
    pointLight.position.set(0, 50, -100)
    scene.add(pointLight)

    // Stars
    const starGeometry = new THREE.BufferGeometry()
    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.1,
    })
    const starVertices = []
    for (let i = 0; i < 10000; i++) {
      const x = (Math.random() - 0.5) * 2000
      const y = (Math.random() - 0.5) * 2000
      const z = (Math.random() - 0.5) * 2000
      starVertices.push(x, y, z)
    }
    starGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(starVertices, 3)
    )
    const stars = new THREE.Points(starGeometry, starMaterial)
    scene.add(stars)

    // Controls
    const keys: { [key: string]: boolean } = {}
    window.addEventListener('keydown', (e) => (keys[e.key] = true))
    window.addEventListener('keyup', (e) => (keys[e.key] = false))

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)

      // Ship movement
      if (keys[' ']) {
        // Spacebar
        shipVelocity.add(shipDirection.clone().multiplyScalar(acceleration))
      } else if (keys['Control'] || keys['Meta']) {
        // Ctrl or Cmd
        shipVelocity.sub(shipDirection.clone().multiplyScalar(acceleration))
      } else {
        shipVelocity.multiplyScalar(1 - deceleration)
      }

      // Limit speed
      if (shipVelocity.length() > maxSpeed) {
        shipVelocity.normalize().multiplyScalar(maxSpeed)
      }

      // Update position
      const potentialPosition = shipPosition.clone().add(shipVelocity)

      // Check for collisions with planets
      let collision = false
      planets.forEach((planet) => {
        const distance = potentialPosition.distanceTo(planet.position)
        if (distance < planet.size + 5) {
          collision = true
          setExploring(planet.name)
        }
      })

      // Only update position if there's no collision
      if (!collision) {
        shipPosition.copy(potentialPosition)
      } else {
        shipVelocity.set(0, 0, 0)
      }

      // Change direction
      if (keys['ArrowUp']) shipDirection.y += rotationSpeed
      if (keys['ArrowDown']) shipDirection.y -= rotationSpeed
      if (keys['ArrowLeft']) {
        const rotationMatrix = new THREE.Matrix4().makeRotationY(rotationSpeed)
        shipDirection.applyMatrix4(rotationMatrix)
      }
      if (keys['ArrowRight']) {
        const rotationMatrix = new THREE.Matrix4().makeRotationY(-rotationSpeed)
        shipDirection.applyMatrix4(rotationMatrix)
      }

      // Normalize direction
      shipDirection.normalize()

      // Update camera
      camera.position.copy(shipPosition)
      camera.lookAt(shipPosition.clone().add(shipDirection))

      // Update HUD
      setSpeed(shipVelocity.length() * 100)
      setHeading(Math.atan2(shipDirection.x, shipDirection.z) * (180 / Math.PI))

      renderer.render(scene, camera)
    }

    animate()

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('keydown', (e) => (keys[e.key] = true))
      window.removeEventListener('keyup', (e) => (keys[e.key] = false))
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleExplore = () => {
    if (exploring) {
      router.push(`/${exploring.toLowerCase()}`)
    }
  }

  const handleContinue = () => {
    setExploring(null)
  }

  return (
    <div className="relative w-full h-screen">
      <canvas ref={canvasRef} className="w-full h-full" />
      {exploring && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <Card className="w-80">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 text-center">
                Do you want to explore {exploring}?
              </h2>
              <div className="flex justify-between gap-4">
                <Button
                  onClick={handleExplore}
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Yes
                </Button>
                <Button
                  onClick={handleContinue}
                  variant="outline"
                  className="flex-1"
                >
                  No
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-4 left-4 text-white text-sm bg-black bg-opacity-50 p-2 rounded">
          <p>Speed: {speed.toFixed(2)}</p>
          <p>Heading: {heading.toFixed(2)}°</p>
        </div>
        <div className="absolute bottom-4 left-4 text-white text-sm bg-black bg-opacity-50 p-2 rounded">
          <p>Controls:</p>
          <p>Spacebar: Accelerate</p>
          <p>Ctrl/Cmd: Decelerate</p>
          <p>Up/Down Arrows: Pitch</p>
          <p>Left/Right Arrows: Turn</p>
        </div>
      </div>
    </div>
  )
}
