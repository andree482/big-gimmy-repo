import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface AnimatedCardProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  hoverScale?: number;
  clickScale?: number;
}

export function AnimatedCard({
  children,
  delay = 0,
  className = '',
  hoverScale = 1.02,
  clickScale = 0.98,
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.3,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{
        scale: hoverScale,
        transition: { duration: 0.15 }
      }}
      whileTap={{
        scale: clickScale,
        transition: { duration: 0.08 }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedText({ 
  children, 
  delay = 0, 
  className = '' 
}: { 
  children: ReactNode; 
  delay?: number; 
  className?: string; 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedButton({ 
  children, 
  onClick, 
  className = '',
  variant = 'primary'
}: { 
  children: ReactNode; 
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary';
}) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{
        scale: 1.05,
        boxShadow: variant === 'primary' ? '0 10px 25px rgba(255, 209, 0, 0.3)' : '0 8px 20px rgba(0, 0, 0, 0.1)',
      }}
      whileTap={{ scale: 0.95 }}
      transition={{
        duration: 0.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.button>
  );
}