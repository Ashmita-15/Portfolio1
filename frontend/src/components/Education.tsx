
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { GraduationCap, Award, BookOpen, Briefcase } from 'lucide-react'

const Education = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const education = [
    {
      degree: 'B.Tech in Computer Science',
      specialization: 'Specialization in Data Science',
      institution: 'Heritage Institute of Technology, Kolkata',
      year: '2023 - 2027',
      gpa: '9.1/10',
      description: 'Comprehensive study of computer science fundamentals with specialized focus on data science, machine learning, and artificial intelligence.',
      highlights: [
        'Specialized coursework in Machine Learning and Data Mining',
        'Advanced Statistics and Probability',
        'Database Management Systems',
        'Software Engineering and Project Management'
      ]
    }
  ]

  const experiences = [
    {
      role: 'AI/ML Intern',
      company: 'TechLabs (Remote)',
      period: 'Jun 2024 - Aug 2024',
      description: 'Built prototypes for ML pipelines and lightweight RAG demos for internal PoCs.'
    },
    {
      role: 'Full-Stack Trainee',
      company: 'DevWorks Studio',
      period: 'Jan 2024 - Apr 2024',
      description: 'Contributed to MERN dashboards; implemented charts and auth flows.'
    }
  ]

  const certifications = [
    {
      name: 'Complete Data Science, Machine Learning, DL, NLP Bootcamp',
      issuer: 'KRISHAI Technologies Private Limited',
      year: '2025',
      icon: Award
    },
    {
      name: 'Complete Generative AI Course with Langchain and Hugging Face',
      issuer: 'KRISHAI Technologies Private Limited',
      year: '2025',
      icon: BookOpen
    },
    {
      name: 'Ultimate RAG Bootcamp Using LangChain, LangGraph & Langsmith',
      issuer: 'KRISHAI Technologies Private Limited',
      year: 'Ongoing',
      icon: Award
    }
  ]

 

  return (
    <section id="education" className="section-padding">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Education, <span className="gradient-text">Experience</span> & Certifications
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            My academic journey and professional certifications in data science and technology
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="flex items-center space-x-4 mb-8">
              <div className="p-4 bg-white/10 rounded-lg">
                <GraduationCap className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">Education</h3>
            </div>

            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className="card"
              >
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-2">
                      {edu.degree}
                    </h4>
                    <p className="text-primary-400 font-medium mb-2">
                      {edu.specialization}
                    </p>
                    <p className="text-gray-300 mb-2">{edu.institution}</p>
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>{edu.year}</span>
                      <span>GPA: {edu.gpa}</span>
                    </div>
                  </div>
                  
                  
                  
                 
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Experience */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <div>
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-4 bg-white/10 rounded-lg">
                  <Briefcase className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Experience</h3>
              </div>

              <div className="space-y-4">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className="card group hover:bg-white/10"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-dark-700 rounded-lg group-hover:bg-white/20 transition-colors">
                        <Briefcase className="w-6 h-6 text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-white mb-1">
                          {exp.role}
                        </h4>
                        <p className="text-gray-400 text-sm mb-1">{exp.company}</p>
                        <p className="text-purple-400 text-sm font-medium">{exp.period}</p>
                        <p className="text-gray-300 text-sm mt-2">{exp.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Certifications (full width, below) */}
        <div className="mt-12 space-y-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-4 bg-white/10 rounded-lg">
              <Award className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold text-white">Certifications</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="card group hover:bg-white/10"
              >
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-dark-700 rounded-lg group-hover:bg-white/20 transition-colors">
                    <cert.icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-white mb-1">
                      {cert.name}
                    </h4>
                    <p className="text-gray-400 text-sm mb-1">{cert.issuer}</p>
                    <p className="text-purple-400 text-sm font-medium">{cert.year}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Education
