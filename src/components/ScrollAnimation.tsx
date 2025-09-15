'use client';

import { useEffect, useRef, useState } from 'react';

interface ScrollAnimationProps {
  children: React.ReactNode;
  animation?: 'scale' | 'fadeSlide' | 'fade' | 'rotate';
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
    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay * 1000);
        }
      },
      {
        threshold: animation === 'rotate' ? 0.5 : 0.3,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [animation, delay, isVisible]);

  const getAnimationClasses = () => {
    const prefersReducedMotion = typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion && animation !== 'rotate') {
      return '';
    }

    // For rotate animation, element is always visible
    if (animation === 'rotate') {
      return prefersReducedMotion ? '' : '';
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

  const getAnimationStyle = () => {
    if (animation === 'rotate' && isVisible) {
      const prefersReducedMotion = typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        return {};
      }

      return {
        animation: 'flipHorizontal 1.2s ease-in-out',
        transformOrigin: 'center center',
        transformStyle: 'preserve-3d' as const,
        perspective: '1000px'
      };
    }
    return {};
  };

  return (
    <>
      {animation === 'rotate' && (
        <style jsx>{`
          @keyframes flipHorizontal {
            from {
              transform: perspective(1000px) rotateY(0deg);
            }
            to {
              transform: perspective(1000px) rotateY(360deg);
            }
          }
        `}</style>
      )}
      <div
        ref={ref}
        className={`${getAnimationClasses()} ${className}`}
        style={getAnimationStyle()}
      >
        {children}
      </div>
    </>
  );
}