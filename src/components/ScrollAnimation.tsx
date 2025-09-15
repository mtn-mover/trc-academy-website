'use client';

import { useEffect, useRef, useState } from 'react';

interface ScrollAnimationProps {
  children: React.ReactNode;
  animation?: 'scale' | 'fadeSlide' | 'fade';
  delay?: number;
  className?: string;
}

export default function ScrollAnimation({
  children,
  animation = 'scale',
  delay = 0.2,
  className = ''
}: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay * 1000);
        }
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay, isVisible]);

  const getAnimationClasses = () => {
    const prefersReducedMotion = typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      return '';
    }

    const baseClasses = 'transition-all duration-700 ease-out';

    switch (animation) {
      case 'scale':
        return `${baseClasses} ${isVisible
          ? 'scale-100 opacity-100'
          : 'scale-90 opacity-0'}`;

      case 'fadeSlide':
        return `${baseClasses} ${isVisible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-12 opacity-0'}`;

      case 'fade':
        return `${baseClasses} ${isVisible
          ? 'opacity-100'
          : 'opacity-0'}`;

      default:
        return baseClasses;
    }
  };

  return (
    <div
      ref={ref}
      className={`${getAnimationClasses()} ${className}`}
    >
      {children}
    </div>
  );
}