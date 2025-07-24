'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';

interface FloatingElementProps {
  delay: number;
  size: number;
  color: string;
  initialX: number;
  initialY: number;
}

const FloatingElement = ({ delay, size, color, initialX, initialY }: FloatingElementProps) => (
  <motion.div
    className="absolute rounded-full opacity-20 blur-sm"
    style={{
      width: size,
      height: size,
      backgroundColor: color,
      left: `${initialX}%`,
      top: `${initialY}%`,
    }}
    animate={{
      y: [0, -30, 0],
      x: [0, 20, 0],
      rotate: [0, 180, 360],
      scale: [1, 1.2, 1],
    }}
    transition={{
      duration: 15 + delay * 2,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay,
    }}
  />
);

interface GradientOrbProps {
  delay: number;
  size: number;
  initialX: number;
  initialY: number;
}

const GradientOrb = ({ delay, size, initialX, initialY }: GradientOrbProps) => (
  <motion.div
    className="absolute rounded-full opacity-10"
    style={{
      width: size,
      height: size,
      background: 'radial-gradient(circle, rgba(74, 108, 247, 0.3) 0%, rgba(74, 108, 247, 0.1) 50%, transparent 100%)',
      left: `${initialX}%`,
      top: `${initialY}%`,
    }}
    animate={{
      scale: [1, 1.5, 1],
      opacity: [0.1, 0.3, 0.1],
    }}
    transition={{
      duration: 8 + delay,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay,
    }}
  />
);

interface ParticleProps {
  delay: number;
  initialX: number;
  initialY: number;
}

const Particle = ({ delay, initialX, initialY }: ParticleProps) => (
  <motion.div
    className="absolute w-1 h-1 bg-primary rounded-full opacity-30"
    style={{
      left: `${initialX}%`,
      top: `${initialY}%`,
    }}
    animate={{
      y: [0, -100, 0],
      opacity: [0, 1, 0],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      ease: "easeOut",
      delay: delay,
    }}
  />
);

interface AnimatedBackgroundProps {
  variant?: 'default' | 'hero' | 'minimal';
  className?: string;
}

export default function AnimatedBackground({ 
  variant = 'default', 
  className = '' 
}: AnimatedBackgroundProps) {
  const elements = useMemo(() => {
    const floatingElements = [];
    const gradientOrbs = [];
    const particles = [];

    // Generate floating elements
    for (let i = 0; i < 8; i++) {
      floatingElements.push({
        id: i,
        delay: i * 0.5,
        size: 20 + Math.random() * 40,
        color: i % 2 === 0 ? '#4A6CF7' : '#6366F1',
        initialX: Math.random() * 100,
        initialY: Math.random() * 100,
      });
    }

    // Generate gradient orbs
    for (let i = 0; i < 4; i++) {
      gradientOrbs.push({
        id: i,
        delay: i * 1.2,
        size: 100 + Math.random() * 200,
        initialX: Math.random() * 100,
        initialY: Math.random() * 100,
      });
    }

    // Generate particles for hero variant
    if (variant === 'hero') {
      for (let i = 0; i < 15; i++) {
        particles.push({
          id: i,
          delay: i * 0.3,
          initialX: Math.random() * 100,
          initialY: 100,
        });
      }
    }

    return { floatingElements, gradientOrbs, particles };
  }, [variant]);

  if (variant === 'minimal') {
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30 dark:from-blue-900/10 dark:via-transparent dark:to-purple-900/10" />
        {elements.gradientOrbs.slice(0, 2).map((orb) => (
          <GradientOrb key={orb.id} {...orb} />
        ))}
      </div>
    );
  }

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
      
      {/* Floating elements */}
      {elements.floatingElements.map((element) => (
        <FloatingElement key={element.id} {...element} />
      ))}
      
      {/* Gradient orbs */}
      {elements.gradientOrbs.map((orb) => (
        <GradientOrb key={orb.id} {...orb} />
      ))}
      
      {/* Particles for hero variant */}
      {variant === 'hero' && elements.particles.map((particle) => (
        <Particle key={particle.id} {...particle} />
      ))}
      
      {/* Mesh gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/20 via-transparent to-purple-100/20 dark:from-blue-900/20 dark:via-transparent dark:to-purple-900/20" />
    </div>
  );
}