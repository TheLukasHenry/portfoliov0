'use client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CodeIcon } from 'lucide-react'

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

      <main className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Jane Doe
          </h1>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
            Software Engineer passionate about creating elegant solutions to
            complex problems.
          </p>
          <div className="space-x-4">
            <Button asChild>
              <Link href="/contact">Contact Me</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/projects">View Projects</Link>
            </Button>
          </div>
        </div>
      </main>

      <footer className="border-t py-4 text-center text-sm text-muted-foreground">
        © 2024 Jane Doe. All rights reserved.
      </footer>
    </div>
  )
}
