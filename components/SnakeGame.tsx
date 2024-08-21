'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'

const CANVAS_SIZE = 300
const SCALE = 10
const SPEED = 100
const DIRECTIONS = {
  38: [0, -1], // up
  40: [0, 1], // down
  37: [-1, 0], // left
  39: [1, 0], // right
}

type Food = {
  position: [number, number]
  type: 'normal' | 'speed' | 'slow' | 'grow'
  color: string
}

const SnakeGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [snake, setSnake] = useState([[8, 8]])
  const [food, setFood] = useState<Food>({
    position: [5, 5],
    type: 'normal',
    color: '#FF5722',
  })
  const [dir, setDir] = useState([0, -1])
  const [speed, setSpeed] = useState<number | null>(null)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)

  const moveSnake = useCallback(() => {
    const newSnake = [...snake]
    const newHead = [newSnake[0][0] + dir[0], newSnake[0][1] + dir[1]]

    // Check wall collision
    if (
      newHead[0] < 0 ||
      newHead[0] >= CANVAS_SIZE / SCALE ||
      newHead[1] < 0 ||
      newHead[1] >= CANVAS_SIZE / SCALE
    ) {
      setSpeed(null)
      setGameOver(true)
      return
    }

    newSnake.unshift(newHead as [number, number])
    if (newHead[0] === food.position[0] && newHead[1] === food.position[1]) {
      setScore((score) => score + 1)

      // Apply food effects
      switch (food.type) {
        case 'speed':
          setSpeed((prevSpeed) => (prevSpeed ? prevSpeed * 0.8 : SPEED * 0.8))
          break
        case 'slow':
          setSpeed((prevSpeed) => (prevSpeed ? prevSpeed * 1.2 : SPEED * 1.2))
          break
        case 'grow':
          newSnake.push([...newSnake[newSnake.length - 1]])
          break
        default:
          break
      }

      setFood(createFood())
    } else {
      newSnake.pop()
    }

    setSnake(newSnake)

    // Check self collision
    if (isCollision(newHead)) {
      setSpeed(null)
      setGameOver(true)
    }
  }, [snake, dir, food])

  const isCollision = (head: number[]) => {
    for (let i = 1; i < snake.length; i++) {
      if (head[0] === snake[i][0] && head[1] === snake[i][1]) return true
    }
    return false
  }

  const createFood = useCallback((): Food => {
    const position: [number, number] = [
      Math.floor(Math.random() * (CANVAS_SIZE / SCALE)),
      Math.floor(Math.random() * (CANVAS_SIZE / SCALE)),
    ]
    const types: Food['type'][] = ['normal', 'speed', 'slow', 'grow']
    const type = types[Math.floor(Math.random() * types.length)]
    const colors = {
      normal: '#FF5722',
      speed: '#FFC107',
      slow: '#3F51B5',
      grow: '#4CAF50',
    }
    return { position, type, color: colors[type] }
  }, [])

  const startGame = () => {
    setSnake([[8, 8]])
    setFood(createFood())
    setDir([0, -1])
    setSpeed(SPEED)
    setGameOver(false)
    setScore(0)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.keyCode
      if (key in DIRECTIONS) {
        e.preventDefault() // Prevent default scrolling behavior
        setDir(DIRECTIONS[key as keyof typeof DIRECTIONS])
      }
    }

    // Add the event listener to the window object
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      // Remove the event listener when the component unmounts
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  useEffect(() => {
    if (!speed) return

    const interval = setInterval(moveSnake, speed)

    return () => clearInterval(interval)
  }, [moveSnake, speed])

  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.setTransform(SCALE, 0, 0, SCALE, 0, 0)
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)

    // Draw snake
    ctx.fillStyle = '#4CAF50'
    snake.forEach(([x, y]) => ctx.fillRect(x, y, 1, 1))

    // Draw food
    ctx.fillStyle = food.color
    ctx.fillRect(food.position[0], food.position[1], 1, 1)

    // Draw score
    ctx.fillStyle = '#000'
    ctx.font = '1px Arial'
    ctx.fillText(`Score: ${score}`, 1, 1)
  }, [snake, food, score])

  return (
    <div className="flex flex-col items-center gap-4">
      <canvas
        ref={canvasRef}
        width={CANVAS_SIZE}
        height={CANVAS_SIZE}
        className="border border-gray-300"
      />
      {gameOver && (
        <div className="text-center">
          <p className="text-xl font-bold mb-2">Game Over!</p>
          <p className="mb-4">Your score: {score}</p>
          <Button onClick={startGame}>Restart</Button>
        </div>
      )}
      {!speed && !gameOver && <Button onClick={startGame}>Start Game</Button>}
      <div className="text-sm text-muted-foreground">
        <p>Yellow: Speed up</p>
        <p>Blue: Slow down</p>
        <p>Green: Grow</p>
        <p>Orange: Normal</p>
      </div>
    </div>
  )
}

export default SnakeGame
