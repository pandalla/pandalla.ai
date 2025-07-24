'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ReactNode } from 'react';

interface ScrollAnimationProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale';
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  triggerOnce?: boolean;
  threshold?: number;
}

const getVariants = (direction: string, distance: number) => {
  const variants = {
    up: { y: distance, opacity: 0 },
    down: { y: -distance, opacity: 0 },
    left: { x: distance, opacity: 0 },
    right: { x: -distance, opacity: 0 },
    fade: { opacity: 0 },
    scale: { scale: 0.8, opacity: 0 }
  };
  
  return {
    hidden: variants[direction] || variants.up,
    visible: { 
      x: 0, 
      y: 0, 
      scale: 1, 
      opacity: 1
    }
  };
};

export default function ScrollAnimation({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  distance = 30,
  className = '',
  triggerOnce = true,
  threshold = 0.1
}: ScrollAnimationProps) {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce
  });

  const variants = getVariants(direction, distance);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}