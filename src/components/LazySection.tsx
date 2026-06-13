import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LazySectionProps {
  children: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
  placeholderHeight?: string;
}

export default function LazySection({
  children,
  threshold = 0.02,
  rootMargin = '150px',
  placeholderHeight = '200px'
}: LazySectionProps) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        observer.disconnect();
      }
    }, { threshold, rootMargin });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  return (
    <div ref={ref} className="relative">
      <AnimatePresence mode="wait">
        {isIntersecting ? (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {children}
          </motion.div>
        ) : (
          <div 
            key="placeholder" 
            style={{ height: placeholderHeight }} 
            className="w-full flex items-center justify-center bg-transparent"
          >
            {/* Subtle premium shimmer loader */}
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#311e0c]/10 to-transparent animate-pulse" />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
