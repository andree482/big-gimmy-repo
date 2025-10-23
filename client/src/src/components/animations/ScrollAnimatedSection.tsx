import { useRef, ReactNode } from 'react';
import { useIntersectionObserver } from '@/hooks/useScrollAnimation';

interface ScrollAnimatedSectionProps {
  children: ReactNode;
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scaleUp' | 'bounceIn';
  delay?: number;
  duration?: number;
  className?: string;
}

export default function ScrollAnimatedSection({
  children,
  animation = 'fadeIn',
  delay = 0,
  duration = 0.6,
  className = '',
}: ScrollAnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { hasIntersected } = useIntersectionObserver(ref, {
    threshold: 0.1,
    rootMargin: '50px 0px',
  });

  const getAnimationClass = () => {
    const baseClasses = 'transition-all ease-out smooth-scroll';
    
    if (!hasIntersected) {
      switch (animation) {
        case 'slideUp':
          return `${baseClasses} opacity-0 translate-y-8`;
        case 'slideLeft':
          return `${baseClasses} opacity-0 translate-x-8`;
        case 'slideRight':
          return `${baseClasses} opacity-0 -translate-x-8`;
        case 'scaleUp':
          return `${baseClasses} opacity-0 scale-95`;
        case 'bounceIn':
          return `${baseClasses} opacity-0 scale-90`;
        default:
          return `${baseClasses} opacity-0`;
      }
    } else {
      return `${baseClasses} opacity-100 translate-y-0 translate-x-0 scale-100`;
    }
  };

  return (
    <div
      ref={ref}
      className={`${getAnimationClass()} ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}s`,
      }}
    >
      {children}
    </div>
  );
}