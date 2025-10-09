import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Code, Database, Brain, Globe } from 'lucide-react'

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const stats = [
    { number: '5+', label: 'Hackathon Experience', icon: Code },
    { number: '20+', label: 'Projects Completed', icon: Database },
    { number: '10+', label: 'Technologies Mastered', icon: Brain },
    { number: '3+', label: 'Certifications', icon: Globe }
  ]


  return (
    <section id="about" className="section-padding bg-dark-900/50">
      <div className="container-custom">
        {/* Heading */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Passionate about leveraging data and technology to solve real-world problems.
          </p>
        </motion.div>

        <div className="space-y-12">
          {/* About Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-gray-300 leading-relaxed mb-6">
              Pre-final year engineering student driven by curiosity for<strong className="text-primary-400">Data Science, Machine Learning, 
              Generative AI, and Full Stack Development</strong>. Passionate about creating intelligent, 
              data-driven solutions that blend innovation with real-world impact and reflect 
              a deep commitment to learning and technological excellence.
              </p>
            </div>
          </motion.div>

          {/* Stats Grid (stacked below description) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="card text-center group hover:bg-white/10"
                >
                  <stat.icon className="w-8 h-8 text-primary-400 mx-auto mb-3 group-hover:text-primary-300 transition-colors" />
                  <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
