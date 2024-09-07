'use client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CodeIcon } from 'lucide-react'
import SpaceShip from '@/components/SpaceShip'

export default function LandingPage() {
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

      <SpaceShip />
    </div>
  )
}
