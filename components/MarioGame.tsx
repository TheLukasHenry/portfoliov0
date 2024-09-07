'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'

const CANVAS_WIDTH = 400
const CANVAS_HEIGHT = 400
const CELL_SIZE = 20
const PACMAN_SIZE = 16
const GHOST_SIZE = 16
const DOT_SIZE = 4
const MOVE_INTERVAL = 150 // Time in ms between moves
const CHASE_DISTANCE = 5 // Number of cells the ghost can see Pacman

type Direction = 'up' | 'down' | 'left' | 'right' | null

interface Position {
  x: number
  y: number
}

const PacmanGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [pacman, setPacman] = useState<Position>({ x: 1, y: 1 })
  const [ghost, setGhost] = useState<Position>({ x: 18, y: 18 })
  const [dots, setDots] = useState<Position[]>([])
  const [currentDirection, setCurrentDirection] = useState<Direction>(null)
  const moveIntervalRef = useRef<number | null>(null)

  const maze = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
    [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ]

  const initializeDots = useCallback(() => {
    const newDots: Position[] = []
    for (let y = 0; y < maze.length; y++) {
      for (let x = 0; x < maze[y].length; x++) {
        if (maze[y][x] === 0) {
          newDots.push({ x, y })
        }
      }
    }
    setDots(newDots)
  }, [maze])

  const getDistance = (pos1: Position, pos2: Position): number => {
    return Math.abs(pos1.x - pos2.x) + Math.abs(pos1.y - pos2.y)
  }

  const moveGhost = useCallback(
    (pacmanPos: Position, ghostPos: Position): Position => {
      const distance = getDistance(ghostPos, pacmanPos)

      if (distance <= CHASE_DISTANCE) {
        // Chase Pacman
        const directions: Direction[] = ['up', 'down', 'left', 'right']
        let bestDirection: Direction | null = null
        let bestDistance = Infinity

        for (const dir of directions) {
          const newPos = getNewPosition(ghostPos, dir)
          if (maze[newPos.y][newPos.x] !== 1) {
            const newDistance = getDistance(newPos, pacmanPos)
            if (newDistance < bestDistance) {
              bestDistance = newDistance
              bestDirection = dir
            }
          }
        }

        if (bestDirection) {
          return getNewPosition(ghostPos, bestDirection)
        }
      }

      // Random movement if not chasing
      const directions: Direction[] = ['up', 'down', 'left', 'right']
      const validMoves = directions.filter((dir) => {
        const newPos = getNewPosition(ghostPos, dir)
        return maze[newPos.y][newPos.x] !== 1
      })

      if (validMoves.length > 0) {
        const randomDir =
          validMoves[Math.floor(Math.random() * validMoves.length)]
        return getNewPosition(ghostPos, randomDir)
      }

      return ghostPos
    },
    [maze]
  )

  const getNewPosition = (pos: Position, dir: Direction): Position => {
    if (!dir) return pos
    switch (dir) {
      case 'up':
        return { x: pos.x, y: Math.max(0, pos.y - 1) }
      case 'down':
        return { x: pos.x, y: Math.min(maze.length - 1, pos.y + 1) }
      case 'left':
        return { x: Math.max(0, pos.x - 1), y: pos.y }
      case 'right':
        return { x: Math.min(maze[0].length - 1, pos.x + 1), y: pos.y }
    }
  }

  const movePacman = useCallback(
    (direction: Direction, pacmanPos: Position): Position => {
      if (!direction) return pacmanPos
      const newPos = getNewPosition(pacmanPos, direction)
      if (maze[newPos.y][newPos.x] !== 1) {
        const dotIndex = dots.findIndex(
          (dot) => dot.x === newPos.x && dot.y === newPos.y
        )
        if (dotIndex !== -1) {
          setDots(dots.filter((_, index) => index !== dotIndex))
          setScore((prevScore) => prevScore + 10)
        }
        return newPos
      }
      return pacmanPos
    },
    [maze, dots]
  )

  const checkCollision = useCallback(
    (pacmanPos: Position, ghostPos: Position) => {
      return pacmanPos.x === ghostPos.x && pacmanPos.y === ghostPos.y
    },
    []
  )

  const drawGame = useCallback(
    (pacmanPos: Position, ghostPos: Position) => {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      // Clear canvas
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

      // Draw maze
      for (let y = 0; y < maze.length; y++) {
        for (let x = 0; x < maze[y].length; x++) {
          if (maze[y][x] === 1) {
            ctx.fillStyle = 'blue'
            ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE)
          }
        }
      }

      // Draw dots
      ctx.fillStyle = 'white'
      dots.forEach((dot) => {
        ctx.beginPath()
        ctx.arc(
          dot.x * CELL_SIZE + CELL_SIZE / 2,
          dot.y * CELL_SIZE + CELL_SIZE / 2,
          DOT_SIZE,
          0,
          Math.PI * 2
        )
        ctx.fill()
      })

      // Draw Pacman
      ctx.fillStyle = 'yellow'
      ctx.beginPath()
      ctx.arc(
        pacmanPos.x * CELL_SIZE + CELL_SIZE / 2,
        pacmanPos.y * CELL_SIZE + CELL_SIZE / 2,
        PACMAN_SIZE / 2,
        0,
        Math.PI * 2
      )
      ctx.fill()

      // Draw Ghost
      ctx.fillStyle = 'red'
      ctx.beginPath()
      ctx.arc(
        ghostPos.x * CELL_SIZE + CELL_SIZE / 2,
        ghostPos.y * CELL_SIZE + CELL_SIZE / 2,
        GHOST_SIZE / 2,
        0,
        Math.PI * 2
      )
      ctx.fill()
    },
    [maze, dots]
  )

  const gameLoop = useCallback(() => {
    if (!gameStarted || gameOver) return

    const newPacmanPos = movePacman(currentDirection, pacman)
    const newGhostPos = moveGhost(newPacmanPos, ghost)

    if (checkCollision(newPacmanPos, newGhostPos)) {
      drawGame(newPacmanPos, newGhostPos)
      setGameOver(true)
      setGameStarted(false)
      if (moveIntervalRef.current) {
        clearInterval(moveIntervalRef.current)
      }
      return
    }

    setPacman(newPacmanPos)
    setGhost(newGhostPos)

    // Check win condition
    if (dots.length === 0) {
      setGameOver(true)
      setGameStarted(false)
      if (moveIntervalRef.current) {
        clearInterval(moveIntervalRef.current)
      }
      return
    }

    drawGame(newPacmanPos, newGhostPos)
  }, [
    gameStarted,
    gameOver,
    currentDirection,
    movePacman,
    moveGhost,
    checkCollision,
    dots,
    drawGame,
    pacman,
    ghost,
  ])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gameStarted || gameOver) return
      e.preventDefault() // Prevent scrolling
      let direction: Direction = null
      switch (e.key) {
        case 'ArrowUp':
          direction = 'up'
          break
        case 'ArrowDown':
          direction = 'down'
          break
        case 'ArrowLeft':
          direction = 'left'
          break
        case 'ArrowRight':
          direction = 'right'
          break
        default:
          return // Ignore other keys
      }
      setCurrentDirection(direction)
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        setCurrentDirection(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [gameStarted, gameOver])

  useEffect(() => {
    if (gameStarted && !gameOver) {
      moveIntervalRef.current = window.setInterval(gameLoop, MOVE_INTERVAL)
    } else if (moveIntervalRef.current) {
      clearInterval(moveIntervalRef.current)
    }

    return () => {
      if (moveIntervalRef.current) {
        clearInterval(moveIntervalRef.current)
      }
    }
  }, [gameStarted, gameOver, gameLoop])

  const startGame = () => {
    setGameStarted(true)
    setGameOver(false)
    setScore(0)
    setPacman({ x: 1, y: 1 })
    setGhost({ x: 18, y: 18 })
    setCurrentDirection(null)
    initializeDots()
    drawGame({ x: 1, y: 1 }, { x: 18, y: 18 })
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        className="border border-gray-300"
      />
      {!gameStarted && !gameOver && (
        <Button onClick={startGame}>Start Game</Button>
      )}
      {gameOver && (
        <div className="text-center">
          <p className="text-xl font-bold mb-2">
            {dots.length === 0 ? 'You Win!' : 'Game Over!'}
          </p>
          <p className="mb-4">Your score: {score}</p>
          <Button onClick={startGame}>Play Again</Button>
        </div>
      )}
      <div className="text-sm text-muted-foreground">
        <p>Use arrow keys to move Pacman</p>
        <p>Eat all dots to win!</p>
        <p>Avoid the ghost!</p>
      </div>
      <div>Score: {score}</div>
    </div>
  )
}

export default PacmanGame
