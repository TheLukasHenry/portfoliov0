'use client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CardContent, Card } from '@/components/ui/card'
import { CodeIcon, DatabaseIcon, LayoutIcon, CloudIcon } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Component() {
  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  }

  const heroVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <motion.header
        className="px-4 lg:px-6 h-14 flex items-center"
        initial="hidden"
        animate="visible"
        variants={headerVariants}
        transition={{ duration: 0.5, staggerChildren: 0.1 }}
      >
        <motion.div variants={headerVariants}>
          <Link className="flex items-center justify-center" href="#">
            <CodeIcon className="h-6 w-6" />
            <span className="sr-only">Jane Doe</span>
          </Link>
        </motion.div>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          {['About', 'Projects', 'Contact'].map((item, index) => (
            <motion.div key={item} variants={headerVariants}>
              <Link
                className="text-sm font-medium hover:underline underline-offset-4"
                href="#"
              >
                {item}
              </Link>
            </motion.div>
          ))}
        </nav>
      </motion.header>
      <main className="flex-1">
        <motion.section
          className="w-full py-12 md:py-24 lg:py-32 xl:py-48"
          initial="hidden"
          animate="visible"
          variants={heroVariants}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <motion.div
                className="space-y-2"
                animate={{ y: [0, -10, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 5,
                  ease: 'easeInOut',
                }}
              >
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Jane Doe
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Software Engineer passionate about creating elegant solutions
                  to complex problems.
                </p>
              </motion.div>
              <div className="space-x-4">
                <Link
                  className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  href="#"
                >
                  View Projects
                </Link>
                <Link
                  className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  href="#"
                >
                  Contact Me
                </Link>
              </div>
            </div>
          </div>
        </motion.section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Skills & Expertise
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Here are some of the technologies I specialize in:
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              <Card>
                <CardContent className="flex flex-col items-center space-y-2 p-6">
                  <DatabaseIcon className="h-12 w-12" />
                  <h3 className="text-xl font-bold">Backend Development</h3>
                  <p className="text-sm text-muted-foreground">
                    Node.js, Python, SQL, NoSQL
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center space-y-2 p-6">
                  <LayoutIcon className="h-12 w-12" />
                  <h3 className="text-xl font-bold">Frontend Development</h3>
                  <p className="text-sm text-muted-foreground">
                    React, Vue.js, HTML, CSS
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center space-y-2 p-6">
                  <CloudIcon className="h-12 w-12" />
                  <h3 className="text-xl font-bold">Cloud & DevOps</h3>
                  <p className="text-sm text-muted-foreground">
                    AWS, Docker, Kubernetes
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          © 2024 Jane Doe. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            GitHub
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            LinkedIn
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Twitter
          </Link>
        </nav>
      </footer>
    </div>
  )
}
