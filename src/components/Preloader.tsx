import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { imageCache } from '@/lib/imageCache';

const FRAME_COUNT = 48;
const CRITICAL_FRAME_COUNT = 8;

const getFrameUrl = (i: number) => 
  `/frames_webp/frame_${String(Math.min(i * 4, 191)).padStart(5, '0')}.webp`;

const staticAssets = ['/logo.png'];

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    let loadedCriticalCount = 0;
    
    // Divide frames into critical (blocking) and background (progressive)
    const criticalFrameUrls = Array.from({ length: CRITICAL_FRAME_COUNT }).map((_, i) => getFrameUrl(i));
    const backgroundFrameUrls = Array.from({ length: FRAME_COUNT - CRITICAL_FRAME_COUNT }).map((_, i) => 
      getFrameUrl(i + CRITICAL_FRAME_COUNT)
    );

    const blockingAssets = [...criticalFrameUrls, ...staticAssets];
    const totalBlocking = blockingAssets.length;

    let hasCompleted = false;

    const checkComplete = () => {
      if (loadedCriticalCount === totalBlocking && !hasCompleted) {
        hasCompleted = true;
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(onComplete, 600);
        }, 300);
      }
    };

    const updateProgress = () => {
      loadedCriticalCount++;
      const currentProgress = Math.min(100, Math.round((loadedCriticalCount / totalBlocking) * 100));
      setProgress(currentProgress);
      checkComplete();
    };

    // 1. Load critical blocking assets (critical frames + logo)
    blockingAssets.forEach((url, index) => {
      const isFrame = url.includes('/frames_webp/');
      const frameIdx = isFrame ? index : -1;

      // If already cached in memory, count it immediately
      if (isFrame && imageCache.images[frameIdx]) {
        updateProgress();
        return;
      }

      const img = new Image();
      img.onload = () => {
        if (isFrame) {
          imageCache.images[frameIdx] = img;
        }
        updateProgress();
      };
      img.onerror = () => {
        updateProgress();
      };
      img.src = url;
    });

    // 2. Load background assets progressively to prevent layout choking
    const loadBackground = async () => {
      // Yield to let critical animation/loads complete
      await new Promise(r => setTimeout(r, 200));

      for (let i = 0; i < backgroundFrameUrls.length; i++) {
        const frameIdx = i + CRITICAL_FRAME_COUNT;
        const url = backgroundFrameUrls[i];

        if (imageCache.images[frameIdx]) continue; // Already loaded

        const img = new Image();
        img.onload = () => {
          imageCache.images[frameIdx] = img;
        };
        img.src = url;

        // Yield execution to the browser thread after every few items
        if (i % 3 === 0) {
          await new Promise(r => setTimeout(r, 50));
        }
      }
    };

    loadBackground();
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#efdfce]"
        >
          {/* Main Loader Container */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative flex flex-col items-center justify-center p-10 rounded-[3rem] bg-[#f6ebdd]/80 border border-[#311e0c]/10 shadow-[0_24px_50px_-12px_rgba(49,30,12,0.12)]"
          >
            {/* Ambient Glow */}
            <div className="absolute inset-0 bg-[#311e0c]/3 blur-3xl rounded-full" />

            {/* Circular Logo Progress Loader */}
            <div className="relative w-28 h-28 mb-6 flex items-center justify-center">
              {/* SVG Circle Progress */}
              <svg viewBox="0 0 100 100" className="w-full h-full rotate-[-90deg] drop-shadow-sm">
                {/* Background Track Circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="44"
                  fill="none"
                  stroke="#311e0c"
                  strokeWidth="2"
                  strokeOpacity="0.08"
                />
                {/* Active Progress Circle */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="44"
                  fill="none"
                  stroke="#311e0c"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeDasharray="276.4"
                  strokeDashoffset={276.4 - (progress * 2.764)}
                  transition={{ duration: 0.2 }}
                />
              </svg>

              {/* Centered Logo Image */}
              <div className="absolute w-20 h-20 rounded-full overflow-hidden flex items-center justify-center bg-white shadow-md">
                <img 
                  src="/logo.png" 
                  alt="LUCA Logo" 
                  className="w-full h-full object-cover" 
                />
              </div>
            </div>

            {/* Progress Label */}
            <div className="relative text-center">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <span className="text-[#311e0c] text-2xl font-display font-bold tracking-tighter">
                  {progress}
                </span>
                <span className="text-[#311e0c]/70 text-sm font-bold">%</span>
              </div>
              <p className="text-[#311e0c]/45 text-[9px] uppercase tracking-[0.3em] font-bold">
                Benvenuti da LUCA
              </p>
            </div>
          </motion.div>

          {/* Background pattern */}
          <div className="absolute inset-0 z-[-1] pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.02]" 
              style={{ backgroundImage: 'radial-gradient(#311e0c 1px, transparent 1px)', backgroundSize: '32px 32px' }} 
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
