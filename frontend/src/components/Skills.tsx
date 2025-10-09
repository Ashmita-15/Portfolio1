import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Code, BarChart3, Shield } from 'lucide-react'
import { FadeIn } from './ScrollAnimations'

interface Skill {
  name: string
  icon: string
}

interface SkillCategory {
  title: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  skills: Skill[]
}

const Skills: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const skillCategories: SkillCategory[] = [
    {
      title: 'Languages',
      icon: Code,
      skills: [
        { name: 'Python', icon: '/icons/Python.png' },
        { name: 'R', icon: "https://upload.wikimedia.org/wikipedia/commons/1/1b/R_logo.svg" },
        { name: 'C', icon: "https://img.icons8.com/color/48/000000/c-programming.png" },
        { name: 'C++', icon: "https://img.icons8.com/?size=100&id=40669&format=png&color=000000" },
        { name: 'Java', icon: "https://www.svgrepo.com/show/349418/java.svg" },
        { name: 'SQL', icon: "https://upload.wikimedia.org/wikipedia/commons/8/87/Sql_data_base_with_logo.png" },
        { name: 'JavaScript', icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
        { name: 'HTML5', icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
        { name: 'CSS3', icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
      ]
    },
    {
      title: 'AI & Machine Learning',
      icon: BarChart3,
      skills: [
        { name: 'Pandas', icon: 'https://img.icons8.com/color/48/000000/pandas.png' },
        { name: 'NumPy', icon: 'https://img.icons8.com/color/48/000000/numpy.png' },
        { name: 'Matplotlib', icon: 'https://upload.wikimedia.org/wikipedia/commons/8/84/Matplotlib_icon.svg' },
        { name: 'Scikit-learn', icon: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg' },
        { name: 'Seaborn', icon: 'https://cdn.worldvectorlogo.com/logos/seaborn-1.svg' },
        { name: 'TensorFlow', icon: 'https://img.icons8.com/color/48/000000/tensorflow.png' },
        { name: 'PyTorch', icon: 'https://pytorch.org/assets/images/pytorch-logo.png' },
        { name: 'Hugging Face', icon: 'https://huggingface.co/front/assets/huggingface_logo-noborder.svg' },
        { name: 'LangChain', icon: 'https://cdn.brandfetch.io/idzf7Sjo28/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1751438886450' },
      ]
    },
    {
      title: 'Web Development',
      icon: Code,
      skills: [
        { name: 'React Native', icon: 'https://img.icons8.com/color/48/000000/react-native.png' },
        { name: 'Node.js', icon: 'https://img.icons8.com/color/48/000000/nodejs.png' },
        { name: 'Express', icon: 'https://cdn.brandfetch.io/idh1lvV1BF/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1756519165352' },
        { name: 'Tailwind CSS', icon: 'https://img.icons8.com/color/48/000000/tailwind_css.png' },
        { name: 'Bootstrap', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
        { name: 'Django', icon: 'https://img.icons8.com/color/48/000000/django.png' },
        { name: 'Shiny', icon: 'https://raw.githubusercontent.com/rstudio/hex-stickers/master/SVG/shiny.svg' },
        { name: 'Flask', icon: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Flask_logo.svg' },
        { name: 'Streamlit', icon: 'https://img.icons8.com/?size=96&id=Rffi8qeb2fK5&format=png' },
      ]
    },
    {
      title: 'Databases',
      icon: BarChart3,
      skills: [
        { name: 'MySQL', icon: 'https://img.icons8.com/color/48/000000/mysql-logo.png' },
        { name: 'SQLite', icon: 'https://upload.wikimedia.org/wikipedia/commons/3/38/SQLite370.svg' },
        { name: 'MongoDB', icon: 'https://icon.icepanel.io/Technology/svg/MongoDB.svg' },
        { name: 'Oracle', icon: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg' },
      ]
    },
    {
      title: 'Tools & Platforms',
      icon: Shield,
      skills: [
        { name: 'Git', icon: 'https://img.icons8.com/color/48/000000/git.png' },
        { name: 'GitHub', icon: 'https://cdn-icons-png.flaticon.com/512/25/25231.png' },
        { name: 'Jupyter Notebook', icon: 'https://img.icons8.com/fluency/48/000000/jupyter.png' },
        { name: 'Google Colab', icon: 'https://img.icons8.com/?size=100&id=lOqoeP2Zy02f&format=png&color=000000' },
        { name: 'Postman', icon: 'https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg' },
        { name: 'Ollama', icon: 'https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/ollama.png' },
      ]
    }
  ]

  return (
    <section id="skills" ref={ref} className="section-padding pt-16 sm:pt-20 md:pt-24">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
        <FadeIn>
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
              Technical <span className="gradient-text">Skills</span>
            </h2>
          </div>
        </FadeIn>

        {/* Skill Cards */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              whileHover={{ scale: 1.01 }}
              className="card group relative overflow-hidden p-3 sm:p-4 md:p-5 bg-dark-800 rounded-xl"
            >
              {/* Header */}
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-white/10 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <category.icon className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white">{category.title}</h3>
              </div>

              {/* Skills Box */}
              <div className="bg-dark-700 rounded-lg p-3 sm:p-4 flex flex-wrap justify-center gap-3 min-h-[120px]">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="w-14 h-14 sm:w-14 sm:h-14 p-1.5 bg-dark-600 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
                    title={skill.name}
                  >
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional info section */}
        {/* <StaggerContainer>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-8 sm:mt-12 md:mt-16 text-center"
          >
            <div className="card max-w-4xl mx-auto p-6 sm:p-8 md:p-10 rounded-xl bg-dark-800">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                <StaggerItem>
                  <div className="text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <h4 className="text-base sm:text-lg font-semibold text-white mb-1 sm:mb-2">Certified Professional</h4>
                    <p className="text-xs sm:text-sm text-gray-400">AWS, Google Cloud, and Microsoft Azure certified</p>
                  </div>
                </StaggerItem>

                <StaggerItem>
                  <div className="text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <GitBranch className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <h4 className="text-base sm:text-lg font-semibold text-white mb-1 sm:mb-2">Open Source</h4>
                    <p className="text-xs sm:text-sm text-gray-400">Active contributor to various ML and web projects</p>
                  </div>
                </StaggerItem>

                <StaggerItem>
                  <div className="text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <Cloud className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <h4 className="text-base sm:text-lg font-semibold text-white mb-1 sm:mb-2">Cloud Native</h4>
                    <p className="text-xs sm:text-sm text-gray-400">Experience with scalable cloud architectures</p>
                  </div>
                </StaggerItem>
              </div>
            </div>
          </motion.div>
        </StaggerContainer> */}
      </div>
    </section>
  )
}

export default Skills
