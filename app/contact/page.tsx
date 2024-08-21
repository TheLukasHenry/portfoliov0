import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { GithubIcon, LinkedinIcon, TwitterIcon } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Contact() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  }

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  }

  return (
    <motion.section
      className="w-full py-12 md:py-24 lg:py-32"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container px-4 md:px-6">
        <motion.h2
          className="text-3xl font-bold tracking-tighter sm:text-5xl mb-8 text-center"
          variants={itemVariants}
        >
          Get in Touch
        </motion.h2>
        <div className="grid gap-10 lg:grid-cols-2">
          <motion.div variants={itemVariants}>
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
          </motion.div>
          <motion.div className="space-y-4" variants={itemVariants}>
            <h3 className="text-2xl font-bold">Contact Information</h3>
            <p className="text-muted-foreground">
              Feel free to reach out to me through the form or via the following
              channels:
            </p>
            <div className="space-y-2">
              <p>Email: jane.doe@example.com</p>
              <p>Phone: (123) 456-7890</p>
              <p>Location: San Francisco, CA</p>
            </div>
            <div className="flex space-x-4">
              {[GithubIcon, LinkedinIcon, TwitterIcon].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon className="h-6 w-6" />
                  <span className="sr-only">
                    {Icon.name.replace('Icon', '')}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
