import { ReactNode } from 'react';

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
}: AnimatedCardProps) {
  return (
    <div
      className={`animate-fade-in hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200 ${className}`}
      style={{ animationDelay: `${delay * 1000}ms` }}
    >
      {children}
    </div>
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
    <div
      className={`animate-fade-in ${className}`}
      style={{ animationDelay: `${delay * 1000}ms` }}
    >
      {children}
    </div>
  );
}

export function AnimatedButton({
  children,
  onClick,
  className = '',
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary';
}) {
  return (
    <button
      onClick={onClick}
      className={`animate-fade-in hover:scale-105 active:scale-95 transition-transform duration-200 ${className}`}
    >
      {children}
    </button>
  );
}
