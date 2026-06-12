import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 192;

function currentFrame(index: number): string {
  return `/frames_webp/frame_${String(index).padStart(5, '0')}.webp`;
}

export default function ScrollCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const initialCTARef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const frameIndexRef = useRef({ value: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const images: (HTMLImageElement | null)[] = Array(FRAME_COUNT).fill(null);

    // Adaptive resolution based on device — cap at 1.2x on mobile for high speed, and 2x on desktop
    const setCanvasSize = () => {
      const dpr = isMobile ? 1.2 : Math.min(window.devicePixelRatio || 1, 2); 
      const w = window.innerWidth;
      const h = window.innerHeight;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = isMobile ? 'low' : 'medium'; // Low quality improves mobile FPS significantly
    };
    setCanvasSize();

    const renderFrame = (index: number) => {
      let img = images[index];
      
      // Fallback: If target image is not loaded yet, find the nearest loaded one in a window of 20 frames
      if (!img || !img.complete) {
        let fallbackImg = null;
        for (let offset = 1; offset <= 20; offset++) {
          const prevIdx = index - offset;
          if (prevIdx >= 0 && images[prevIdx] && images[prevIdx]!.complete) {
            fallbackImg = images[prevIdx];
            break;
          }
          const nextIdx = index + offset;
          if (nextIdx < FRAME_COUNT && images[nextIdx] && images[nextIdx]!.complete) {
            fallbackImg = images[nextIdx];
            break;
          }
        }
        if (fallbackImg) {
          img = fallbackImg;
        } else {
          return; // No fallback image found, retain current canvas frame
        }
      }

      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.clearRect(0, 0, w, h);

      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = w / h;

      let drawW: number, drawH: number, drawX: number, drawY: number;
      if (canvasRatio > imgRatio) {
        drawW = w;
        drawH = w / imgRatio;
        drawX = 0;
        drawY = (h - drawH) / 2;
      } else {
        drawH = h;
        drawW = h * imgRatio;
        drawX = (w - drawW) / 2;
        drawY = 0;
      }

      ctx.drawImage(img, drawX, drawY, drawW, drawH);
    };

    // Virtualized loading window - only keep frames near the active index loaded
    const frameObj = frameIndexRef.current;
    const manageFrames = (current: number) => {
      const PRE_WINDOW = isMobile ? 12 : 20;
      const POST_WINDOW = isMobile ? 24 : 35;
      
      const start = Math.max(0, current - PRE_WINDOW);
      const end = Math.min(FRAME_COUNT - 1, current + POST_WINDOW);

      // Load frames inside sliding window
      for (let i = start; i <= end; i++) {
        if (!images[i]) {
          const img = new Image();
          images[i] = img;
          img.onload = () => {
            const activeFrame = Math.round(frameObj.value);
            if (activeFrame === i) {
              renderFrame(i);
            }
          };
          img.src = currentFrame(i);
        }
      }

      // Unload frames outside sliding window to free up GPU memory
      for (let i = 0; i < FRAME_COUNT; i++) {
        if ((i < start || i > end) && images[i]) {
          // Retain first 30 frames near top for instant load back
          if (current < 15 && i < 30) {
            continue;
          }
          images[i]!.onload = null;
          images[i]!.src = ''; // Deallocates GPU memory in most browsers
          images[i] = null;
        }
      }
    };

    // Prioritized pre-loading and decoding of first 30 critical frames
    const loadInitialImages = async () => {
      const INITIAL_LOAD = 30;
      const priorityPromises = Array.from({ length: INITIAL_LOAD }).map((_, i) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          images[i] = img;
          img.onload = () => {
            if (i === 0) renderFrame(0);
            img.decode().then(() => resolve()).catch(() => resolve());
          };
          img.onerror = () => resolve();
          img.src = currentFrame(i);
        });
      });

      await Promise.all(priorityPromises);
    };

    loadInitialImages();
    imagesRef.current = images;

    // GSAP ScrollTrigger animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=150%',
        scrub: isMobile ? 0.5 : 1, // responsive snappiness on mobile
        pin: true,
        anticipatePin: 1,
      },
    });

    // Animate through frames
    tl.to(frameObj, {
      value: FRAME_COUNT - 1,
      ease: 'none',
      duration: 3,
      snap: { value: 1 },
      onUpdate: () => {
        const current = Math.round(frameObj.value);
        manageFrames(current);
        renderFrame(current);
      },
    });

    // Initial CTA animation — fade out and move up as we scroll
    const initialCTA = initialCTARef.current;
    if (initialCTA) {
      tl.to(initialCTA, {
        opacity: 0,
        y: -150,
        duration: 0.8,
        ease: 'power2.inOut',
      }, 0);
    }

    // Overlay animations — fade in main content as we scroll further
    const overlay = overlayRef.current;
    if (overlay) {
      // Initial state — content starts hidden
      gsap.set(overlay, { opacity: 0 });

      // At ~40% through the frames, start fading in overlay
      tl.to(overlay, {
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
      }, 0.8);

      // Stagger text elements in
      const textEls = overlay.querySelectorAll('.hero-animate');
      gsap.set(textEls, { y: 60, opacity: 0 });
      tl.to(textEls, {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.6,
        ease: 'power3.out',
      }, 1.0);
    }

    // Handle resize - ignore mobile toolbar height-resize trigger to prevent canvas stutter
    let lastWidth = window.innerWidth;
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      if (isMobile && currentWidth === lastWidth) return;
      lastWidth = currentWidth;

      setCanvasSize();
      renderFrame(Math.round(frameObj.value));
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-[#1B110A]">
      {/* Canvas for frame animation */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ display: 'block' }}
      />

      {/* Dark gradient overlay for text readability */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.1) 70%, transparent 100%)',
      }} />

      {/* Bottom vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'linear-gradient(to top, rgba(27,17,10,0.9) 0%, transparent 40%)',
      }} />

      {/* Top subtle vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 20% 10%, rgba(212,107,37,0.12) 0%, transparent 60%)',
      }} />

      {/* ─────────────────── INITIAL CTA ─────────────────── */}
      <div 
        ref={initialCTARef}
        className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 pointer-events-none"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <h2 className="text-[5rem] sm:text-8xl lg:text-9xl xl:text-[10rem] font-display font-bold leading-[0.85] mb-8" style={{ color: '#eedecd' }}>
            <span className="italic font-medium block mb-4" style={{ color: '#eedecd' }}>Scroll</span>
            <span className="text-[0.22em] tracking-[0.5em] uppercase font-light block mb-4 ml-2" style={{ color: 'rgba(238, 222, 205, 0.45)' }}>To Savor Your</span>
            <span className="block font-display italic text-4xl sm:text-5xl lg:text-6xl tracking-tight" style={{ color: '#eedecd' }}>Perfect Feast</span>
          </h2>
          
          <div className="mt-8 flex flex-col items-center gap-6">
            <div className="w-[1px] h-20 bg-gradient-to-b from-accent/60 via-accent/20 to-transparent" />
            <div className="relative">
              <div className="w-1.5 h-1.5 rounded-full bg-accent animate-ping absolute inset-0" />
              <div className="w-1.5 h-1.5 rounded-full bg-accent relative z-10" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Content overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-10 flex items-center pointer-events-none"
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-2xl">
            {/* Logo + Badge */}
            <div className="hero-animate mb-6 pointer-events-auto">
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <img src="/logo.png" alt="LUCA Logo" className="w-7 h-7 rounded-full object-cover" />
                <span className="text-[11px] font-semibold tracking-[0.18em] uppercase" style={{ color: '#e5d4c2' }}>
                  LUCA · The Oven
                </span>
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="hero-animate text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-display font-bold leading-[1.05] mb-6" style={{ color: '#e5d4c2' }}>
              Where Taste
              <br />
              <span className="italic font-medium" style={{
                background: 'linear-gradient(135deg, #e5d4c2, #b8a695)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Meets Passion
              </span>
            </h1>

            {/* Subtitle */}
            <p className="hero-animate text-base sm:text-lg lg:text-xl font-light leading-relaxed mb-8 max-w-lg"
              style={{ color: 'rgba(229, 212, 194, 0.75)' }}
            >
              Wood-fired Italian specialties, gourmet multi-cuisine menus, and artisan coffee. Savor an authentic dining experience in Swaroop Nagar, Kanpur.
            </p>

            {/* Social proof */}
            <div className="hero-animate flex items-center gap-5 mb-10 pointer-events-auto">
              <div className="flex -space-x-3">
                {['AK', 'PS', 'RM', 'VG'].map((initial, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-[10px] font-medium shadow-sm"
                    style={{
                      background: '#2A1B14',
                      border: '2px solid rgba(27,17,10,1)',
                      color: 'rgba(229, 212, 194, 0.5)',
                    }}
                  >
                    {initial}
                  </div>
                ))}
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-1 mb-1">
                  {[1, 2, 3, 4, 5].map(i => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#D46B25] text-[#D46B25]" />
                  ))}
                </div>
                <p className="text-xs" style={{ color: 'rgba(229, 212, 194, 0.6)' }}>
                  Loved by <span className="font-medium" style={{ color: '#e5d4c2' }}>2,400+</span> happy diners
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="hero-animate flex flex-row gap-4 pointer-events-auto">
              <Button
                asChild
                className="text-[15px] font-semibold px-8 py-7 rounded-full text-white hover:opacity-90 border-0 shadow-lg transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #D78B5D, #A4532B)',
                  boxShadow: '0 8px 32px rgba(212,107,37,0.3)',
                }}
              >
                <Link to="/menu" className="flex items-center">
                  Order Now <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button
                variant="ghost"
                asChild
                className="text-[15px] font-medium px-8 py-7 rounded-full text-white/80 hover:text-white hover:bg-white/5 transition-all duration-300"
                style={{
                  border: '1px solid rgba(255,255,255,0.12)',
                }}
              >
                <Link to="/about" className="flex items-center">Our Story</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator — pulsing at bottom center */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <p className="text-[10px] uppercase tracking-[0.3em] font-medium" style={{ color: 'rgba(229, 212, 194, 0.4)' }}>
          Scroll down
        </p>
        <div className="w-5 h-8 rounded-full border border-[#e5d4c2]/25 flex justify-center pt-1.5">
          <div className="w-1 h-2 rounded-full bg-[#e5d4c2]/60 animate-bounce" />
        </div>
      </div>
    </section>

  );
}
