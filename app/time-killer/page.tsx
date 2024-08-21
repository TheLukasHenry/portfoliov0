'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CodeIcon, GamepadIcon } from 'lucide-react'
import SnakeGame from '@/components/SnakeGame'
import MarioGame from '@/components/MarioGame'
import PacmanGame from '@/components/PacmanGame'

type GameType = 'snake' | 'mario' | 'pacman' | null

export default function TimeKillerPage() {
  const [currentGame, setCurrentGame] = useState<GameType>(null)

  const renderGame = () => {
    switch (currentGame) {
      case 'snake':
        return <SnakeGame />
      case 'mario':
        return <MarioGame />
      case 'pacman':
        return <PacmanGame />
      default:
        return null
    }
  }

  const handlePlayClick = (game: GameType) => {
    setCurrentGame(game)
  }

  const handleBackToGames = () => {
    setCurrentGame(null)
  }

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link className="flex items-center justify-center" href="/">
          <CodeIcon className="h-6 w-6 mr-2" />
          <span className="font-bold">Jane Doe</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/about"
          >
            About
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/projects"
          >
            Projects
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/contact"
          >
            Contact
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/time-killer"
          >
            Time Killer
          </Link>
        </nav>
      </header>

      <main className="flex-1 py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-8 text-center">
            Time Killer Games
          </h1>

          {currentGame ? (
            <div className="flex flex-col items-center">
              <div className="mb-4">
                <Button onClick={handleBackToGames}>Back to Games</Button>
              </div>
              {renderGame()}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GamepadIcon className="h-6 w-6" />
                    Snake
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground mb-4">
                    Classic snake game. Eat food to grow longer!
                  </p>
                  <Button
                    className="w-full"
                    onClick={() => handlePlayClick('snake')}
                  >
                    Play Snake
                  </Button>
                </CardContent>
              </Card>
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GamepadIcon className="h-6 w-6" />
                    Mario
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground mb-4">
                    A simple Mario-style platformer. Jump and reach the goal!
                  </p>
                  <Button
                    className="w-full"
                    onClick={() => handlePlayClick('mario')}
                  >
                    Play Mario
                  </Button>
                </CardContent>
              </Card>
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GamepadIcon className="h-6 w-6" />
                    Pacman
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground mb-4">
                    Navigate through the maze and eat all the dots. Avoid the
                    ghost!
                  </p>
                  <Button
                    className="w-full"
                    onClick={() => handlePlayClick('pacman')}
                  >
                    Play Pacman
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>

      <footer className="border-t py-4 text-center text-sm text-muted-foreground">
        © 2024 Jane Doe. All rights reserved.
      </footer>
    </div>
  )
}
