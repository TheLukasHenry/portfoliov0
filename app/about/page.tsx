'use client'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CodeIcon, GraduationCapIcon, BriefcaseIcon } from 'lucide-react'

export default function AboutPage() {
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
            About Me
          </h1>
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Hi, I'm Jane Doe</h2>
              <p className="text-muted-foreground">
                I'm a passionate software engineer with 5 years of experience in
                full-stack development. I love creating efficient, scalable, and
                user-friendly applications that solve real-world problems.
              </p>
              <p className="text-muted-foreground">
                When I'm not coding, you can find me hiking, reading sci-fi
                novels, or experimenting with new cooking recipes.
              </p>
            </div>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <GraduationCapIcon className="h-6 w-6" />
                    <div>
                      <h3 className="font-bold">Education</h3>
                      <p className="text-sm text-muted-foreground">
                        B.S. in Computer Science, Tech University (2018)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <BriefcaseIcon className="h-6 w-6" />
                    <div>
                      <h3 className="font-bold">Work Experience</h3>
                      <p className="text-sm text-muted-foreground">
                        Senior Software Engineer at InnoTech Solutions
                        (2020-Present)
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Software Developer at StartUp Inc. (2018-2020)
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {[
                'JavaScript',
                'Python',
                'React',
                'Node.js',
                'SQL',
                'AWS',
                'Docker',
                'Git',
              ].map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t py-4 text-center text-sm text-muted-foreground">
        © 2024 Jane Doe. All rights reserved.
      </footer>
    </div>
  )
}
