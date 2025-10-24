import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, Github, Eye, Youtube, FileText } from 'lucide-react'

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [activeFilter, setActiveFilter] = useState('All')

  const filters = ['All', 'AI/ML', 'Web Development', 'Blockchain', 'Data Analysis']

  const projects = [
    {
      id: 1,
      title: 'GramSathi',
      description: 'GramSathi is a multilingual telemedicine platform (web + mobile) designed for rural healthcare. It enables video consultations, offline health records, AI-powered symptom checking, and real-time emergency alerts, bridging the gap between patients, doctors, and local pharmacies.',
      image: '/projects/gramsathi.png',
      categories: ['AI/ML','Web Development'],
      tags: ['MERN', 'GenAi', 'WebSocket', 'Gemini API','Tailwind CSS'],
      github: 'https://github.com/Ashmita-15/GramSathi',
      live: 'https://gramsathi1.onrender.com',
      youtube: 'https://www.youtube.com/watch?v=UKMqw93RWWU',
      featured: true
    },
    {
      id: 2,
      title: 'D-Buddy',
      description: ' D-Buddy is an R Shiny dashboard offering comprehensive diabetes analysis and personalized health features. It provides interactive EDA, Descriptive Analysis, and uses Machine Learning (XGBoost) for immediate risk prediction, alongside tailored 3-course meal recommendations.',
      image: '/projects/dbuddy1.png',
      categories: ['AI/ML','Data Analysis'],
      tags: ['R Shiny','Data Cleaning','Data Visualization','Feature Engineering','XGBoost'],
      github: 'https://github.com/Ashmita-15/D-Buddy',
      live: 'https://rohit21.shinyapps.io/D-Buddy1/',
      youtube: null,
      report: 'reports/Dbuddy.pdf',
      featured: true
    },
    {
      id: 3,
      title: 'Vi-cket',
      description: 'Vi-cket is a blockchain-powered ticket booking platform for IPL, concerts, and events. It combines secure INR payments, Civic identity verification, and NFT-based ticketing to prevent fraud, ensure transparency, and deliver a tamper-proof ticketing experience.',
      image: '/projects/vicket.png',
      categories: ['Blockchain','Web Development'],
      tags: ['React', 'Web3.js', 'Ethereum', 'MongoDB', 'Civic Authentication','Razorpay Integration'],
      github: 'https://github.com/Ashmita-15/Vi-cket',
      youtube:'https://www.youtube.com/watch?v=2yg2NUGDqd8',
      live: null,
      featured: false
    },
    {
      id: 4,
      title: 'Plateful',
      description: 'PLATEFUL is a digital prototype to prevent food waste by facilitating the redistribution of surplus food from institutions (like colleges) to people, using instant notifications and tracking for safety and impact.',
      image: '/projects/plateful.png',
      categories: ['AI/ML','Web Development','Data Analysis'],
      tags: ['MERN','chart.js','ANN', 'AI Chatbot', 'Carbon FootprintAnalytics'],
      github: 'https://github.com/Ashmita-15/Plateful',
      live: null,
      youtube: null,
      featured: false
    },
    
    {
      id: 5,
      title: 'Customer Churn Prediction',
      description: 'Predict customer churn in banking using an Artificial Neural Network (ANN) model. Built with TensorFlow and deployed via Streamlit for interactive predictions',
      image: '/projects/churn.png',
      categories: ['AI/ML'],
      tags: ['Pandas','NumPy','Scikit-learn','TensorFlow','Streamlit','ANN'],
      github: 'https://github.com/Ashmita-15/ANN-Classification-Churn',
      live: 'https://ann-classification-churn-nx4uzfywbzejghq2jyvwsj.streamlit.app/',
      featured: false
    }
  ]

  const filteredProjects = projects.filter(project => 
    activeFilter === 'All' || project.categories.includes(activeFilter)
  )

  const ProjectCard = ({ project, index }: { project: any, index: number }) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="card group relative overflow-hidden"
    >
      {/* Featured badge */}
      {project.featured && (
        <div className="absolute top-2 sm:top-4 right-2 sm:right-4 z-10">
          <span className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-xs font-semibold px-2 py-1 sm:px-3 sm:py-1 rounded-full">
            Featured
          </span>
        </div>
      )}

      {/* Project image */}
      <div className="relative h-36 sm:h-48 mb-4 sm:mb-6 overflow-hidden rounded-lg group">
        {/* Project Image */}
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />

        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
          {project.github && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 sm:p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
            >
              <Github className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </motion.a>
          )}
          {project.live && (
            <motion.a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 sm:p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
            >
              <ExternalLink className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </motion.a>
          )}
          {project.youtube && (
            <motion.a
              href={project.youtube}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 sm:p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
              title="Watch on YouTube"
            >
              <Youtube className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
            </motion.a>
          )}
          {project.report && (
            <motion.a
              href={project.report}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 sm:p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
            >
              <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </motion.a>
          )}
        </div>
      </div>


      {/* Project content */}
      <div className="space-y-2 sm:space-y-4">
        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-white mb-1 sm:mb-2 group-hover:text-primary-400 transition-colors">
            {project.title}
          </h3>
          <p className="text-xs sm:text-sm leading-relaxed text-gray-400">
            {project.description}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 sm:gap-2">
          {project.tags.map((tag: string) => (
            <span
              key={tag}
              className="px-2 py-0.5 sm:px-3 sm:py-1 bg-dark-700 text-gray-300 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center justify-between pt-2 sm:pt-4">
          <div className="flex flex-wrap gap-1">
            {project.categories.map((cat: string) => (
              <span key={cat} className="text-xs sm:text-sm text-primary-400 font-medium">
                {cat}
              </span>
            ))}
          </div>
          <div className="flex space-x-2 sm:space-x-3">
            {project.github && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-400 hover:text-white transition-colors"
                title="View Code"
              >
                <Github size={16} className="sm:w-5 sm:h-5" />
              </motion.a>
            )}
            {project.live && (
              <motion.a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-400 hover:text-white transition-colors"
                title="View Live"
              >
                <ExternalLink size={16} className="sm:w-5 sm:h-5" />
              </motion.a>
            )}
            {project.youtube && (
            <motion.a
              href={project.youtube}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-gray-400 hover:text-white transition-colors"
              title="Watch on YouTube"
            >
              <Youtube className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.a>
          )}
          {project.report && (
            <motion.a
              href={project.report}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FileText className="w-5 h-5 sm:w-5 sm:h-5 " />
            </motion.a>
          )}
          </div>
        </div>
      </div>
    </motion.div>
  )

  return (
    <section id="projects" className="section-padding bg-dark-900/30">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto px-4 sm:px-0">
            A showcase of my recent work across different domains and technologies
          </p>
        </motion.div>

        {/* Filter buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12"
        >
          {filters.map((filter) => (
            <motion.button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-3 py-2 sm:px-6 sm:py-3 text-sm sm:text-base rounded-lg font-medium transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg shadow-primary-500/25'
                  : 'bg-dark-700 text-gray-300 hover:bg-dark-600 hover:text-white'
              }`}
            >
              {filter}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View more button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-8 sm:mt-12"
        >
        <motion.a
          href="https://github.com/riku-d"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-secondary inline-flex items-center space-x-2 text-sm sm:text-base px-4 py-2 sm:px-6 sm:py-3"
        >
          <Eye size={18} className="sm:w-5 sm:h-5" />
          <span>View All Projects on GitHub</span>
        </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
