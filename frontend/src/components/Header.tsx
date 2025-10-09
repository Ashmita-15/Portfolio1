import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, Home } from 'lucide-react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)  // only true when scrolled more than 50px
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ]


  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'backdrop-blur-md border-b' : 'bg-transparent'
      }`}
      style={{
        backgroundColor: isScrolled ? 'rgba(11, 15, 20, 0.85)' : 'transparent',
        borderBottomColor: isScrolled ? 'rgba(0, 0, 0, 0.1)' : 'transparent'
      }}
    >
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3"
          >
            <a href="#home" aria-label="Home" className="p-2 rounded-lg text-white hover:text-cyan-400 hover:bg-white/10 transition-colors">
              <Home size={22} />
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="transition-colors duration-200 font-medium text-gray-300 hover:text-cyan-400"
              >
                {item.name}
              </motion.a>
            ))}
            
          </nav>

          {/* Mobile menu button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isMenuOpen ? 1 : 0, 
            height: isMenuOpen ? 'auto' : 0 
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden w-full"
        >
          <div className="px-4 py-6 space-y-4 bg-dark-900/95 backdrop-blur-md border-t border-white/10 w-full">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                whileHover={{ x: 10 }}
                className="block text-gray-300 hover:text-primary-400 transition-colors duration-200 font-medium py-2"
              >
                {item.name}
              </motion.a>
            ))}
            
          </div>
        </motion.div>
      </div>
    </motion.header>
  )
}

export default Header
