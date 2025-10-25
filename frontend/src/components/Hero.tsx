import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, Github, Linkedin, Mail } from 'lucide-react';
import { Canvas } from "@react-three/fiber";
import { ErrorBoundary } from "react-error-boundary";
import Hero3D from "./Hero3D";

// Preload the profile image
if (typeof window !== 'undefined') {
  const img = new Image();
  img.src = '/pp.png';
}

const Hero = () => {
  const [typingText, setTypingText] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [, setIsMobile] = useState(false);

  const taglines = [
    'Data Scientist',
    'AI/ML Engineer',
    'Full Stack Developer'
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const typeText = () => {
      const currentTagline = taglines[currentTextIndex];
      if (typingText.length < currentTagline.length) {
        setTypingText(currentTagline.slice(0, typingText.length + 1));
      } else {
        setTimeout(() => {
          setTypingText('');
          setCurrentTextIndex((prev) => (prev + 1) % taglines.length);
        }, 2000);
      }
    };

    const timer = setTimeout(typeText, 100);
    return () => clearTimeout(timer);
  }, [typingText, currentTextIndex, taglines]);

  // const handleResumeDownload = () => {
  //   const link = document.createElement('a');
  //   link.href = `${import.meta.env.VITE_API_URL}/api/resume/download`;
  //   link.download = 'Resume.pdf';
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };

  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 sm:pt-24"
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left side - Text content */}
          <div className="text-center md:text-left order-2 md:order-1 md:-ml-2 lg:-ml-4">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mb-4 md:mb-6"
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-6xl font-bold mb-2 md:mb-4 text-white">
                
                <span className="bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
                  Ashmita Barnwal
                </span>
              </h1>
            
              <div className="flex flex-col items-center md:items-start mt-2">
                <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300">
                  {typingText}
                  <span className="animate-pulse text-blue-400">|</span>
                </span>
              </div>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto md:mx-0 text-gray-400 px-4 sm:px-0"
            >
              Passionate about building robust, scalable applications and
              exploring new technologies to solve complex problems.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start mb-6 sm:mb-8"
            >
              <motion.a
                href="/Resume.pdf"  // points to your public file
                download="Ashmita_Resume.pdf" // this name will be used for download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all duration-300 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm sm:text-base"
              >
                <Download size={18} />
                <span>Download Resume</span>
              </motion.a>
              
              
            </motion.div>

            {/* Social links */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="flex justify-center md:justify-start space-x-4 sm:space-x-6"
            >
              <motion.a
                whileHover={{ scale: 1.2, color: "#ffffff" }}
                href="https://github.com/Ashmita-15"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition-colors duration-200"
              >
                <Github size={20} className="sm:w-6 sm:h-6" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.2, color: "#0077b5" }}
                href="https://www.linkedin.com/in/ashmita-barnwal-692b0928a/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition-colors duration-200"
              >
                <Linkedin size={20} className="sm:w-6 sm:h-6" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.2, color: "#ea4335" }}
                href="mailto:ashmitabarnwal53@gmail.com"
                className="text-gray-400 transition-colors duration-200"
              >
                <Mail size={20} className="sm:w-6 sm:h-6" />
              </motion.a>
            </motion.div>
          </div>

          {/* Right side - 3D Model */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative w-full max-w-[480px] aspect-square sm:max-w-full flex items-center justify-center order-1 md:order-2 mx-auto"
          >
            <ErrorBoundary fallback={<FallbackAnimation />}>
              <div className="w-full h-full max-w-[480px] sm:max-w-full mx-auto">
                <Canvas
                  camera={{ position: [0, 0, 4], fov: 50 }}
                  style={{ background: 'transparent' }}
                >
                  <Hero3D />
                </Canvas>
              </div>
            </ErrorBoundary>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Simple fallback if 3D fails to load
const FallbackAnimation = () => {
  return (
    <div className="w-[420px] h-[420px] relative flex items-center justify-center">
      {/* Silent loading - no text shown */}
    </div>
  );
};

export default Hero;
