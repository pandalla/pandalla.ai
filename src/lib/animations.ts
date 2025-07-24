// Animation configuration and presets
export const animations = {
  // Duration presets
  duration: {
    fast: 0.3,
    normal: 0.6,
    slow: 0.9,
  },

  // Easing curves
  easing: {
    easeOut: [0.25, 0.46, 0.45, 0.94],
    easeIn: [0.55, 0.06, 0.68, 0.19],
    easeInOut: [0.42, 0, 0.58, 1],
    spring: { type: "spring", damping: 20, stiffness: 100 },
    bounce: { type: "spring", damping: 15, stiffness: 200 },
  },

  // Common animation variants
  variants: {
    // Fade animations
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 }
    },
    fadeInUp: {
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0 }
    },
    fadeInDown: {
      hidden: { opacity: 0, y: -30 },
      visible: { opacity: 1, y: 0 }
    },
    fadeInLeft: {
      hidden: { opacity: 0, x: -30 },
      visible: { opacity: 1, x: 0 }
    },
    fadeInRight: {
      hidden: { opacity: 0, x: 30 },
      visible: { opacity: 1, x: 0 }
    },

    // Scale animations
    scaleIn: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 }
    },
    scaleUp: {
      hidden: { opacity: 0, scale: 0.5 },
      visible: { opacity: 1, scale: 1 }
    },

    // Slide animations
    slideUp: {
      hidden: { y: 100, opacity: 0 },
      visible: { y: 0, opacity: 1 }
    },
    slideDown: {
      hidden: { y: -100, opacity: 0 },
      visible: { y: 0, opacity: 1 }
    },
    slideLeft: {
      hidden: { x: 100, opacity: 0 },
      visible: { x: 0, opacity: 1 }
    },
    slideRight: {
      hidden: { x: -100, opacity: 0 },
      visible: { x: 0, opacity: 1 }
    },

    // Stagger container
    staggerContainer: {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0.1
        }
      }
    },

    // Stagger item
    staggerItem: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    }
  },

  // Hover effects
  hover: {
    scale: { scale: 1.05 },
    scaleDown: { scale: 0.95 },
    lift: { y: -5 },
    glow: { boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)" },
    rotate: { rotate: 5 },
  },

  // Page transitions
  pageTransition: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
  },

  // Loading animations
  loading: {
    spin: {
      animate: { rotate: 360 },
      transition: { duration: 1, repeat: Infinity, ease: "linear" }
    },
    pulse: {
      animate: { scale: [1, 1.1, 1] },
      transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
    },
    bounce: {
      animate: { y: [0, -10, 0] },
      transition: { duration: 0.6, repeat: Infinity, ease: "easeInOut" }
    }
  }
};

// Helper function to get animation with delay
export const getAnimationWithDelay = (animationName: string, delay: number = 0) => {
  const animation = animations.variants[animationName];
  if (!animation) return {};

  return {
    ...animation,
    visible: {
      ...animation.visible,
      transition: {
        delay,
        duration: animations.duration.normal,
        ease: animations.easing.easeOut
      }
    }
  };
};

// Helper function for stagger animations
export const createStaggerAnimation = (staggerDelay: number = 0.1) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: 0.1
    }
  }
});