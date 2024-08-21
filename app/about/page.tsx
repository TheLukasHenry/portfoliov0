import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { GraduationCapIcon, BriefcaseIcon } from 'lucide-react'
import { motion } from 'framer-motion'

export default function About() {
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
          About Me
        </motion.h2>
        <div className="grid gap-10 lg:grid-cols-2">
          <motion.div className="space-y-4" variants={itemVariants}>
            <h3 className="text-2xl font-bold">Hi, I am Jane Doe</h3>
            <p className="text-muted-foreground">
              I am a passionate software engineer with 5 years of experience in
              full-stack development. I love creating efficient, scalable, and
              user-friendly applications that solve real-world problems.
            </p>
            <p className="text-muted-foreground">
              When I am not coding, you can find me hiking, reading sci-fi
              novels, or experimenting with new cooking recipes.
            </p>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <GraduationCapIcon className="h-6 w-6" />
                    <div>
                      <h4 className="font-bold">Education</h4>
                      <p className="text-sm text-muted-foreground">
                        B.S. in Computer Science, Tech University (2018)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <BriefcaseIcon className="h-6 w-6" />
                    <div>
                      <h4 className="font-bold">Work Experience</h4>
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
          </motion.div>
        </div>
        <motion.div className="mt-10" variants={itemVariants}>
          <h3 className="text-2xl font-bold mb-4">Skills</h3>
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
              <motion.div
                key={skill}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Badge variant="secondary">{skill}</Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
