import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface FadeInProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
  once?: boolean;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.5,
  className = '',
  threshold = 0.1,
  once = true,
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold,
    triggerOnce: once,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else if (!once) {
      controls.start('hidden');
    }
  }, [controls, inView, once]);

  const getDirectionOffset = () => {
    switch (direction) {
      case 'up':
        return { y: 40 };
      case 'down':
        return { y: -40 };
      case 'left':
        return { x: 40 };
      case 'right':
        return { x: -40 };
      case 'none':
        return {};
      default:
        return { y: 40 };
    }
  };

  const variants = {
    hidden: {
      opacity: 0,
      ...getDirectionOffset(),
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface StaggerContainerProps {
  children: React.ReactNode;
  delay?: number;
  staggerChildren?: number;
  className?: string;
  threshold?: number;
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  delay = 0,
  staggerChildren = 0.1,
  className = '',
  threshold = 0.1,
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay,
        staggerChildren,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div variants={variants} className={className}>
      {children}
    </motion.div>
  );
};

interface ScaleInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
}

export const ScaleIn: React.FC<ScaleInProps> = ({
  children,
  delay = 0,
  duration = 0.5,
  className = '',
  threshold = 0.1,
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration,
        delay,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface ParallaxProps {
  children: React.ReactNode;
  offset?: number;
  className?: string;
}

export const Parallax: React.FC<ParallaxProps> = ({
  children,
  offset = 50,
  className = '',
}) => {
  return (
    <motion.div
      className={className}
      initial={{ y: 0 }}
      style={{ overflow: 'hidden' }}
      whileInView={{
        y: [-offset, offset],
        transition: {
          repeat: 0,
          repeatType: 'reverse',
          duration: 1,
          ease: 'easeInOut',
        },
      }}
      viewport={{ once: true, amount: 'some' }}
    >
      {children}
    </motion.div>
  );
};