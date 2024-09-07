'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useRouter } from 'next/navigation'

export default function SpaceExplorer3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [exploring, setExploring] = useState<string | null>(null)
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
    const textures = [
      textureLoader.load('/placeholder.svg?height=512&width=512&text=About'),
      textureLoader.load('/placeholder.svg?height=512&width=512&text=Contact'),
      textureLoader.load('/placeholder.svg?height=512&width=512&text=Projects'),
    ]

    // Planets
    const planets = [
      {
        name: 'About',
        position: new THREE.Vector3(50, 0, -100),
        texture: textures[0],
        size: 15,
        color: 0x8b4513,
      }, // Brown
      {
        name: 'Contact',
        position: new THREE.Vector3(-50, 25, -150),
        texture: textures[1],
        size: 10,
        color: 0xffd700,
      }, // Yellow
      {
        name: 'Projects',
        position: new THREE.Vector3(0, -40, -200),
        texture: textures[2],
        size: 20,
        color: 0x808080,
      }, // Grey
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
    const pointLight = new THREE.PointLight(0xffffff, 1, 100)
    pointLight.position.set(0, 0, 0)
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
      } else {
        shipVelocity.multiplyScalar(1 - deceleration)
      }

      // Limit speed
      if (shipVelocity.length() > maxSpeed) {
        shipVelocity.normalize().multiplyScalar(maxSpeed)
      }

      // Update position
      shipPosition.add(shipVelocity)

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

      // Collision detection
      planets.forEach((planet) => {
        const distance = shipPosition.distanceTo(planet.position)
        if (distance < planet.size + 5) {
          setExploring(planet.name)
        }
      })

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

  return (
    <div className="relative w-full h-screen">
      <canvas ref={canvasRef} className="w-full h-full" />
      {exploring && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded shadow">
          <p className="mb-4">Do you want to explore {exploring}?</p>
          <div className="flex justify-between">
            <button
              onClick={handleExplore}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Yes
            </button>
            <button
              onClick={() => setExploring(null)}
              className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
            >
              No
            </button>
          </div>
        </div>
      )}
      <div className="absolute bottom-4 left-4 text-white text-sm">
        <p>Controls:</p>
        <p>Spacebar: Accelerate</p>
        <p>Up/Down Arrows: Pitch</p>
        <p>Left/Right Arrows: Turn</p>
      </div>
    </div>
  )
}
