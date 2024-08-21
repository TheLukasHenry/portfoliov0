'use client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { CodeIcon, Github, Linkedin, Twitter } from 'lucide-react'

export default function ContactPage() {
  const socialLinks = [
    { Icon: Github, name: 'GitHub', url: 'https://github.com' },
    { Icon: Linkedin, name: 'LinkedIn', url: 'https://linkedin.com' },
    { Icon: Twitter, name: 'Twitter', url: 'https://twitter.com' },
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
            Get in Touch
          </h1>
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <form className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name">Name</label>
                  <Input id="name" placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email">Email</label>
                  <Input id="email" placeholder="Your email" type="email" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message">Message</label>
                  <Textarea id="message" placeholder="Your message" />
                </div>
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Contact Information</h2>
              <p className="text-muted-foreground">
                Feel free to reach out to me through the form or via the
                following channels:
              </p>
              <div className="space-y-2">
                <p>Email: jane.doe@example.com</p>
                <p>Phone: (123) 456-7890</p>
                <p>Location: San Francisco, CA</p>
              </div>
              <div className="flex space-x-4">
                {socialLinks.map(({ Icon, name, url }) => (
                  <Link
                    key={name}
                    href={url}
                    className="text-muted-foreground hover:text-primary"
                  >
                    <Icon className="h-6 w-6" />
                    <span className="sr-only">{name}</span>
                  </Link>
                ))}
              </div>
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
