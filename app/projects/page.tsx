import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Projects() {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
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
          My Projects
        </motion.h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="flex flex-col h-full">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                  width={300}
                  height={200}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
                <CardContent className="flex-grow p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="p-6">
                  <Button asChild>
                    <Link href={project.link}>View Project</Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
