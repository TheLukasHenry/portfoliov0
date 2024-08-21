'use client'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CodeIcon } from 'lucide-react'

export default function ProjectsPage() {
  const projects = [
    {
      title: 'E-commerce Platform',
      description:
        'A full-stack e-commerce solution with real-time inventory management.',
      image: '/placeholder.svg',
      technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
      link: '#',
    },
    {
      title: 'Task Management App',
      description:
        'A collaborative task management tool with real-time updates and analytics.',
      image: '/placeholder.svg',
      technologies: ['Vue.js', 'Express', 'PostgreSQL', 'Chart.js'],
      link: '#',
    },
    {
      title: 'Weather Forecast App',
      description:
        'A mobile-friendly weather app with location-based forecasts and alerts.',
      image: '/placeholder.svg',
      technologies: ['React Native', 'OpenWeatherMap API', 'Redux'],
      link: '#',
    },
  ]

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
        </nav>
      </header>

      <main className="flex-1 py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-8 text-center">
            My Projects
          </h1>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <Card key={index} className="flex flex-col h-full">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                  width={300}
                  height={200}
                />
                <CardContent className="flex-grow p-6">
                  <h2 className="text-xl font-bold mb-2">{project.title}</h2>
                  <p className="text-muted-foreground mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <Button asChild>
                    <Link href={project.link}>View Project</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <footer className="border-t py-4 text-center text-sm text-muted-foreground">
        © 2024 Jane Doe. All rights reserved.
      </footer>
    </div>
  )
}
