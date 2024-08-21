'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'

const CANVAS_WIDTH = 800
const CANVAS_HEIGHT = 400
const GRAVITY = 0.5
const JUMP_FORCE = -20
const MOVE_SPEED = 5

interface GameObject {
  x: number
  y: number
  width: number
  height: number
}

const MarioGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number>()
  const [gameStarted, setGameStarted] = useState(false)
  const [gameWon, setGameWon] = useState(false)

  const [player, setPlayer] = useState<GameObject>({
    x: 50,
    y: CANVAS_HEIGHT - 80,
    width: 40,
    height: 60,
  })

  const [velocity, setVelocity] = useState({ x: 0, y: 0 })
  const [isJumping, setIsJumping] = useState(false)
  const [moveDirection, setMoveDirection] = useState({
    left: false,
    right: false,
  })

  const platforms: GameObject[] = [
    { x: 200, y: 300, width: 100, height: 20 },
    { x: 400, y: 200, width: 100, height: 20 },
    { x: 600, y: 300, width: 100, height: 20 },
  ]

  const goal: GameObject = {
    x: 750,
    y: CANVAS_HEIGHT - 80,
    width: 40,
    height: 60,
  }

  const checkCollision = useCallback((obj1: GameObject, obj2: GameObject) => {
    return (
      obj1.x < obj2.x + obj2.width &&
      obj1.x + obj1.width > obj2.x &&
      obj1.y < obj2.y + obj2.height &&
      obj1.y + obj1.height > obj2.y
    )
  }, [])

  const updatePlayerPosition = useCallback(() => {
    setPlayer((prev) => {
      let newX = prev.x + velocity.x
      let newY = prev.y + velocity.y

      // Check platform collisions
      let onGround = false
      for (const platform of platforms) {
        if (checkCollision({ ...prev, x: newX, y: newY }, platform)) {
          // Collision from above
          if (
            prev.y + prev.height <= platform.y &&
            newY + prev.height > platform.y
          ) {
            newY = platform.y - prev.height
            onGround = true
          }
          // Collision from below
          else if (
            prev.y >= platform.y + platform.height &&
            newY < platform.y + platform.height
          ) {
            newY = platform.y + platform.height
          }
          // Collision from the side
          else {
            newX =
              velocity.x > 0
                ? platform.x - prev.width
                : platform.x + platform.width
          }
        }
      }

      // Check ground collision
      if (newY + prev.height > CANVAS_HEIGHT - 20) {
        newY = CANVAS_HEIGHT - prev.height - 20
        onGround = true
      }

      if (onGround) {
        setIsJumping(false)
        setVelocity((v) => ({ ...v, y: 0 }))
      } else {
        setVelocity((v) => ({ ...v, y: v.y + GRAVITY }))
      }

      // Boundary checks
      newX = Math.max(0, Math.min(newX, CANVAS_WIDTH - prev.width))
      newY = Math.max(0, Math.min(newY, CANVAS_HEIGHT - prev.height - 20))

      return { ...prev, x: newX, y: newY }
    })
  }, [velocity, platforms, checkCollision])

  const jump = useCallback(() => {
    if (!isJumping) {
      setVelocity((prev) => ({ ...prev, y: JUMP_FORCE }))
      setIsJumping(true)
    }
  }, [isJumping])

  const gameLoop = useCallback(() => {
    if (!gameStarted || gameWon) return

    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    // Clear canvas
    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    // Draw background (sky)
    context.fillStyle = '#87CEEB'
    context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    // Update player position
    updatePlayerPosition()

    // Draw ground
    context.fillStyle = '#5a3e2a'
    context.fillRect(0, CANVAS_HEIGHT - 20, CANVAS_WIDTH, 20)

    // Draw platforms
    context.fillStyle = '#8b4513'
    platforms.forEach((platform) => {
      context.fillRect(platform.x, platform.y, platform.width, platform.height)
    })

    // Draw player
    context.fillStyle = 'red'
    context.fillRect(player.x, player.y, player.width, player.height)

    // Draw goal
    context.fillStyle = 'gold'
    context.fillRect(goal.x, goal.y, goal.width, goal.height)

    // Check win condition
    if (checkCollision(player, goal)) {
      setGameWon(true)
    }

    requestRef.current = requestAnimationFrame(gameLoop)
  }, [
    gameStarted,
    gameWon,
    player,
    updatePlayerPosition,
    platforms,
    checkCollision,
  ])

  useEffect(() => {
    requestRef.current = requestAnimationFrame(gameLoop)
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [gameLoop])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault()
      if (e.code === 'ArrowLeft') {
        setMoveDirection((prev) => ({ ...prev, left: true }))
      } else if (e.code === 'ArrowRight') {
        setMoveDirection((prev) => ({ ...prev, right: true }))
      } else if (e.code === 'Space') {
        jump()
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'ArrowLeft') {
        setMoveDirection((prev) => ({ ...prev, left: false }))
      } else if (e.code === 'ArrowRight') {
        setMoveDirection((prev) => ({ ...prev, right: false }))
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [jump])

  useEffect(() => {
    const xVelocity =
      (moveDirection.left ? -MOVE_SPEED : 0) +
      (moveDirection.right ? MOVE_SPEED : 0)
    setVelocity((prev) => ({ ...prev, x: xVelocity }))
  }, [moveDirection])

  const startGame = () => {
    setGameStarted(true)
    setGameWon(false)
    setPlayer({
      x: 50,
      y: CANVAS_HEIGHT - 80,
      width: 40,
      height: 60,
    })
    setVelocity({ x: 0, y: 0 })
    setMoveDirection({ left: false, right: false })
    setIsJumping(false)
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        className="border border-gray-300"
        tabIndex={0}
      />
      {!gameStarted && <Button onClick={startGame}>Start Game</Button>}
      {gameWon && (
        <div className="text-center">
          <p className="text-xl font-bold mb-2">You Win!</p>
          <Button onClick={startGame}>Play Again</Button>
        </div>
      )}
      <div className="text-sm text-muted-foreground">
        <p>Use arrow keys to move left and right</p>
        <p>Press space to jump</p>
        <p>Reach the gold block to win!</p>
      </div>
    </div>
  )
}

export default MarioGame
