import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const initialCTARef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    // Standard video configuration for scroll-scrubbing
    video.muted = true;
    video.playsInline = true;
    video.controls = false;
    video.pause();

    let tl: gsap.core.Timeline | null = null;

    const setupTimeline = () => {
      const duration = video.duration;
      if (!duration || isNaN(duration)) return;

      // Reset video start position
      video.currentTime = 0;

      // GSAP ScrollTrigger timeline
      tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=300%', // Pin screen height for 3 viewports
          scrub: 1.5, // Eased scrub timing
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Animate video playback currentTime directly on the timeline
      tl.to(video, {
        currentTime: duration,
        ease: 'none',
        duration: 3,
      }, 0);

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
        gsap.set(overlay, { opacity: 0 });

        tl.to(overlay, {
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
        }, 0.8);

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
    };

    // If metadata is already loaded (from preloader cache), init immediately
    if (video.readyState >= 1) {
      setupTimeline();
    } else {
      video.addEventListener('loadedmetadata', setupTimeline);
    }

    return () => {
      video.removeEventListener('loadedmetadata', setupTimeline);
      if (tl) {
        tl.kill();
      }
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-[#1B110A]">
      {/* Video for scroll scrubbing */}
      <video
        ref={videoRef}
        src="/hero-video.mp4"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ display: 'block' }}
        preload="auto"
        muted
        playsInline
        webkit-playsinline="true"
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
