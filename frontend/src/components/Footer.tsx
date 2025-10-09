
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Download, Heart } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' }
  ]

  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      href: 'https://github.com/riku-d',
      color: 'hover:text-gray-300'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/rohit-dutta-64b0242a0/',
      color: 'hover:text-blue-400'
    },
    {
      name: 'Email',
      icon: Mail,
      href: 'mailto:rohitdutta2103@gmail.com',
      color: 'hover:text-red-400'
    }
  ]

  const handleResumeDownload = () => {
    window.open(`${import.meta.env.VITE_API_URL}/api/resume/download`, '_blank')
  }

  return (
    <footer className="bg-dark-950 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        
          

        {/* Bottom section */}
        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-gray-400 text-sm flex items-center space-x-2"
            >
              <span>© {currentYear} Ashmita Barnwal. All rights reserved.</span>
              <span className="hidden md:inline">•</span>
              <span className="flex items-center space-x-1">
                <span>Made with</span>
                <Heart size={14} className="text-red-500 animate-pulse" />
                <span>and lots of coffee</span>
              </span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center space-x-6 text-sm text-gray-400"
            >
              <a 
                href="#privacy" 
                className="hover:text-primary-400 transition-colors"
              >
                Privacy Policy
              </a>
              <a 
                href="#terms" 
                className="hover:text-primary-400 transition-colors"
              >
                Terms of Service
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      {/* <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-500" /> */}
    </footer>
  )
}

export default Footer
