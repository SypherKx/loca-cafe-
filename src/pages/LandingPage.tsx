import { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import Preloader from '@/components/Preloader';
import { Link } from 'react-router-dom';
import { ArrowRight, Coffee, Leaf, Award, Star, MapPin, Clock, Phone, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollCanvas from '@/components/ScrollCanvas';
import GlobalItalianBackground from '@/components/GlobalItalianBackground';
import heroCoffee from '@/assets/hero-coffee.jpg';
import pizzaOven from '@/assets/pizza-oven.png';
import cafeInterior from '@/assets/cafe-interior.jpg';
import pizzaImg from '@/assets/menu/pizza.png';
import pastaImg from '@/assets/menu/pasta.png';
import soupImg from '@/assets/menu/soup.png';
import mocktailImg from '@/assets/menu/mocktail.png';

function FadeIn({ children, className = '', delay = 0, direction = 'up' }: {
  children: React.ReactNode; className?: string; delay?: number; direction?: 'up' | 'left' | 'right' | 'none';
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const initial = direction === 'up' ? { y: 50 } : direction === 'left' ? { x: -60 } : direction === 'right' ? { x: 60 } : {};

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...initial }}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────── HERO ─────────────────── */
function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section ref={ref} className="relative min-h-[110vh] flex items-center overflow-hidden bg-gradient-hero">
      {/* Background Glows & Typography */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Glow behind main text */}
        <div className="absolute top-[5%] left-[0%] w-[800px] h-[800px] rounded-full blur-[120px] animate-pulse" style={{ backgroundColor: 'rgba(255, 140, 66, 0.25)', animationDuration: '4s' }} />
        {/* Glow behind coffee cup */}
        <div className="absolute top-[10%] right-[-10%] w-[800px] h-[800px] rounded-full blur-[140px] animate-pulse" style={{ backgroundColor: 'rgba(212, 107, 37, 0.3)', animationDuration: '6s' }} />

        {/* Animated Background Text - Top */}
        <div className="absolute top-[2%] w-full overflow-visible whitespace-nowrap opacity-100">
          <p className="outline-text-animated text-[140px] lg:text-[280px] font-display italic leading-none transform -rotate-[6deg] origin-left pl-6">
            Cucina Italiana
          </p>
        </div>

        {/* Animated Background Text - Bottom */}
        <div className="absolute bottom-[-5%] w-full overflow-visible whitespace-nowrap opacity-100">
          <p className="outline-text-animated text-[140px] lg:text-[280px] font-display italic leading-none transform -rotate-[6deg] origin-right text-right pr-6" style={{ animationDelay: '3s' }}>
            Forno a Legna
          </p>
        </div>

        {/* Floating blurred beans simulated */}
        <div className="absolute top-[18%] right-[25%] w-12 h-16 rounded-full blur-[4px] rotate-[20deg]" style={{ backgroundColor: 'rgba(74, 45, 25, 0.8)' }} />
        <div className="absolute top-[28%] right-[8%] w-8 h-12 rounded-full blur-[2px] rotate-[65deg]" style={{ backgroundColor: 'rgba(60, 34, 16, 0.9)' }} />
        <div className="absolute bottom-[22%] left-[40%] w-20 h-28 rounded-full blur-[6px] -rotate-[15deg]" style={{ backgroundColor: 'rgba(86, 49, 24, 0.7)' }} />


      </div>

      <motion.div style={{ opacity: heroOpacity }} className="relative z-10 container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:grid-rows-[auto_auto] items-center gap-10 lg:gap-8 pt-24 lg:pt-0 w-full">
          
          {/* 1. TOP TEXT (Mobile Top, Desktop Top-Left) */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:col-start-1 lg:row-start-1 lg:self-end lg:pr-8 mx-auto lg:mx-0 max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mb-6"
            >
              <img src="/logo.png" alt="LUCA Cafe Logo" className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover shadow-2xl shadow-accent/20" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full glass text-[11px] font-semibold tracking-[0.15em] uppercase text-accent/90"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Speciality Italian & Multi-Cuisine
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[3.2rem] sm:text-6xl lg:text-7xl xl:text-8xl font-display font-bold leading-[1.05] mb-6"
            >
              Where Taste
              <br />
              <span className="text-[#E6A87C] italic font-medium tracking-wide">Meets Passion</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-muted-foreground/90 text-base sm:text-lg lg:text-xl max-w-md lg:max-w-lg mb-4 leading-relaxed font-light"
            >
              Wood-fired Italian specialties, gourmet multi-cuisine menus, and artisan coffee. Open for breakfast and dinner in Kanpur.
            </motion.p>
          </div>

          {/* 2. IMAGE (Mobile Middle, Desktop Right Span-2) */}
          <motion.div
            style={{ scale: imageScale }}
            className="flex justify-center relative w-full lg:col-start-2 lg:row-start-1 lg:row-span-2 pt-4 pb-2 lg:py-0"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.6, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative scale-95 sm:scale-100"
            >
              {/* Glow behind cup */}
              <div className="absolute inset-0 blur-[80px] bg-[#D46B25]/20 blob animate-glow" />

              <div className="relative animate-float">
                <img
                  src={heroCoffee}
                  alt="Premium artisan latte"
                  width={520}
                  height={520}
                  className="relative blob w-72 h-72 sm:w-80 sm:h-80 lg:w-[460px] lg:h-[460px] object-cover shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                />
                {/* Steam wisps */}
                <div className="absolute -top-6 left-1/3 w-16 h-20 bg-white/5 rounded-full blur-xl steam-animation" />
                <div className="absolute -top-4 left-1/2 w-12 h-16 bg-white/5 rounded-full blur-lg steam-animation" style={{ animationDelay: '1s' }} />
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4 }}
                className="absolute -right-2 sm:-right-8 top-1/4 glass-strong rounded-2xl px-5 py-3.5 shadow-xl backdrop-blur-md"
              >
                <p className="text-sm text-foreground font-semibold">Speciality Italian</p>
                <p className="text-[11px] text-[#D46B25] font-medium tracking-wider uppercase mt-0.5">Wood-Fired Oven</p>
              </motion.div>

              {/* Floating price tag */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.6 }}
                className="absolute -left-2 sm:-left-8 bottom-1/4 glass-strong rounded-2xl px-5 py-3.5 shadow-xl backdrop-blur-md"
              >
                <p className="text-[11px] text-[#D46B25] font-medium tracking-wider uppercase mb-0.5">Open Daily From</p>
                <p className="text-xl font-bold text-foreground">11:00 AM</p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* 3. BOTTOM CONTENT (Mobile Bottom, Desktop Bottom-Left) */}
          <div className="flex flex-col items-center lg:items-start lg:col-start-1 lg:row-start-2 lg:self-start w-full gap-8 mt-2 lg:mt-0">
            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="flex items-center gap-5 justify-center lg:justify-start"
            >
              <div className="flex -space-x-3">
                {['AK','PS','RM','VG'].map((initial, i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-[#2A1B14] border-2 border-background flex items-center justify-center text-[10px] font-medium text-muted-foreground shadow-sm">
                    {initial}
                  </div>
                ))}
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-1 mb-1">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-[#D46B25] text-[#D46B25]" />)}
                </div>
                <p className="text-xs text-muted-foreground">Loved by <span className="text-foreground font-medium">2,400+</span> happy diners</p>
              </div>
            </motion.div>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex flex-row gap-4 justify-center lg:justify-start w-full sm:w-auto px-4 sm:px-0 pb-10 lg:pb-0"
            >
              <Button asChild className="flex-1 sm:flex-none text-[15px] font-semibold px-6 sm:px-8 py-7 rounded-full bg-gradient-to-r from-[#D78B5D] to-[#A4532B] text-white hover:opacity-90 border-0 shadow-lg shadow-[#D46B25]/20 transition-all duration-300">
                <Link to="/menu" className="flex items-center justify-center">
                  Order Now <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button variant="glass" className="flex-1 sm:flex-none text-[15px] font-medium px-6 sm:px-8 py-7 rounded-full border border-white/10 hover:bg-white/5 transition-all duration-300" asChild>
                <Link to="/about" className="flex items-center justify-center">Our Story</Link>
              </Button>
            </motion.div>
          </div>

        </div>
      </motion.div>
    </section>
  );
}

/* ─────────────── MARQUEE BANNER ─────────────── */
function MarqueeBanner() {
  const words = ['Wood-Fired Pizza', '·', 'Gourmet Italian', '·', 'Multi-Cuisine', '·', 'Artisanal Coffee', '·', 'Fresh Pasta', '·', 'Gourmet Desserts', '·'];
  const doubled = [...words, ...words];

  return (
    <div className="py-6 overflow-hidden border-y border-border/30 bg-card/30">
      <div className="animate-scroll flex whitespace-nowrap">
        {doubled.map((word, i) => (
          <span key={i} className="mx-4 text-sm font-light tracking-widest uppercase" style={{ color: word === '·' ? 'rgba(49, 30, 12, 0.4)' : '#311e0c' }}>
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─────────────── PHILOSOPHY ─────────────── */
function PhilosophySection() {
  return (
    <section className="py-28 lg:py-36 relative overflow-hidden">
      <div className="absolute top-20 right-0 w-[400px] h-[400px] blob-2 bg-accent/3 animate-drift pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left: Large statement */}
          <div className="lg:col-span-5">
            <FadeIn>
              <img src="/logo.png" alt="LUCA Cafe Logo" className="w-12 h-12 rounded-full mb-6 object-cover opacity-90" />
              <p className="text-accent text-xs font-medium tracking-[0.25em] uppercase mb-6">Our Philosophy</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold leading-tight mb-6">
                Culinary is an art.<br />
                <span className="text-muted-foreground font-light italic">We craft the experience.</span>
              </h2>
              <div className="w-16 h-0.5 bg-gradient-to-r from-accent to-transparent mb-6" />
              <p className="text-muted-foreground leading-relaxed text-lg font-light">
                Every dish tells a story. From hand-stretched sourdough pizzas baked in our custom oven to authentic Italian pastas and global multi-cuisine menus, we select premium ingredients to create unforgettable moments.
              </p>
            </FadeIn>
          </div>

          {/* Right: Offset image + floating cards */}
          <div className="lg:col-span-7 relative">
            <FadeIn delay={0.2} direction="right">
              <div className="relative ml-0 lg:ml-12">
                <img
                  src={pizzaOven}
                  alt="Wood-fired oven pizza baking"
                  loading="lazy"
                  width={700}
                  height={500}
                  className="w-full h-[350px] lg:h-[450px] object-cover blob-3"
                />
                {/* Overlapping stat cards */}
                <div className="absolute -bottom-6 -left-6 lg:-left-16 glass-strong rounded-2xl p-5 max-w-[200px]">
                  <p className="text-3xl font-display font-bold text-accent mb-1">48 Hrs</p>
                  <p className="text-xs text-muted-foreground">Slow fermented sourdough for a perfect crust</p>
                </div>
                <div className="absolute -top-4 -right-4 glass-strong rounded-2xl p-4">
                  <div className="flex items-center gap-2">
                    <Leaf className="w-4 h-4 text-green-400" />
                    <p className="text-xs text-muted-foreground">100% Sustainable</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── ELEGANT BEAN TRAIL ─────────────── */
const OutlineCulinaryShape = ({ x, y, size, rotate, opacity, blur, isPasta }: { x: number; y: number; size: number; rotate: number; opacity: number; blur: number; isPasta: boolean }) => (
  <div
    className="absolute pointer-events-none"
    style={{ 
      left: `${x}%`, 
      top: `${y}%`, 
      transform: `rotate(${rotate}deg)`, 
      opacity,
      filter: blur ? `blur(${blur}px)` : 'none',
    }}
  >
    {isPasta ? (
      <svg viewBox="0 0 50 40" width={size} height={size * 0.8}>
        <path d="M6 10 C10 14, 18 18, 25 20 C32 18, 40 14, 44 10 L44 30 C40 26, 32 22, 25 20 C18 22, 10 26, 6 30 Z" fill="none" stroke="#311e0c" strokeWidth="1.5" strokeOpacity="0.25" />
        <path d="M25 10 L25 30" fill="none" stroke="#311e0c" strokeWidth="1.2" strokeOpacity="0.25" />
        <path d="M21 13 L21 27" fill="none" stroke="#311e0c" strokeWidth="1.2" strokeOpacity="0.25" />
        <path d="M29 13 L29 27" fill="none" stroke="#311e0c" strokeWidth="1.2" strokeOpacity="0.25" />
        <path d="M6 10 L4 12 L6 14 L4 16 L6 18 L4 20 L6 22 L4 24 L6 26 L4 28 L6 30" fill="none" stroke="#311e0c" strokeWidth="1.5" strokeOpacity="0.25" />
        <path d="M44 10 L46 12 L44 14 L46 16 L44 18 L46 20 L44 22 L46 24 L44 26 L46 28 L44 30" fill="none" stroke="#311e0c" strokeWidth="1.5" strokeOpacity="0.25" />
      </svg>
    ) : (
      <svg viewBox="0 0 40 40" width={size} height={size}>
        <path d="M20 2 C32 8, 38 22, 28 34 C20 40, 10 32, 6 22 C2 12, 8 2, 20 2 Z" fill="none" stroke="#311e0c" strokeWidth="1.5" strokeOpacity="0.25" />
        <path d="M20 2 C20 15, 23 25, 28 34" fill="none" stroke="#311e0c" strokeWidth="1.2" strokeOpacity="0.25" />
        <path d="M14 12 C18 15, 20 18, 20 20" fill="none" stroke="#311e0c" strokeWidth="1.2" strokeOpacity="0.25" />
        <path d="M26 22 C23 24, 21 26, 20 27" fill="none" stroke="#311e0c" strokeWidth="1.2" strokeOpacity="0.25" />
      </svg>
    )}
  </div>
);

function ItalianCulinaryTrail() {
  const shapes = [
    // Top-right dense cluster
    { x: 82, y: -8, size: 38, rotate: 20, opacity: 0.7, blur: 0 },
    { x: 88, y: -2, size: 28, rotate: -30, opacity: 0.4, blur: 2 },
    { x: 75, y: -4, size: 44, rotate: 50, opacity: 0.8, blur: 0 },
    { x: 80, y: 5, size: 32, rotate: -15, opacity: 0.5, blur: 1 },
    { x: 92, y: 2, size: 50, rotate: 80, opacity: 0.2, blur: 4 },
    { x: 72, y: -12, size: 22, rotate: -50, opacity: 0.35, blur: 3 },
    
    // Flowing diagonally down — mid section
    { x: 70, y: 10, size: 40, rotate: 30, opacity: 0.7, blur: 0 },
    { x: 65, y: 6, size: 30, rotate: -40, opacity: 0.4, blur: 2 },
    { x: 62, y: 18, size: 46, rotate: 55, opacity: 0.8, blur: 0 },
    { x: 58, y: 12, size: 26, rotate: 15, opacity: 0.5, blur: 1.5 },
    { x: 67, y: 25, size: 34, rotate: -65, opacity: 0.3, blur: 3 },
    { x: 54, y: 22, size: 42, rotate: 35, opacity: 0.7, blur: 0 },
    { x: 48, y: 16, size: 24, rotate: -25, opacity: 0.4, blur: 2.5 },
    
    // Continuing flow — lower section  
    { x: 45, y: 32, size: 36, rotate: 85, opacity: 0.6, blur: 1 },
    { x: 40, y: 42, size: 48, rotate: -15, opacity: 0.8, blur: 0 },
    { x: 38, y: 28, size: 28, rotate: 45, opacity: 0.4, blur: 2 },
    { x: 32, y: 38, size: 32, rotate: -55, opacity: 0.5, blur: 1.5 },
    { x: 28, y: 48, size: 40, rotate: 10, opacity: 0.7, blur: 0 },
    { x: 24, y: 35, size: 24, rotate: 65, opacity: 0.3, blur: 3 },
    { x: 20, y: 45, size: 36, rotate: -30, opacity: 0.6, blur: 1 },
    
    // Scattered atmospheric
    { x: 60, y: 38, size: 55, rotate: 75, opacity: 0.12, blur: 5 },
    { x: 50, y: -5, size: 52, rotate: -45, opacity: 0.12, blur: 4 },
    { x: 30, y: 20, size: 30, rotate: 120, opacity: 0.2, blur: 3 },
    { x: 78, y: 35, size: 28, rotate: -85, opacity: 0.25, blur: 2.5 },
    { x: 85, y: 50, size: 65, rotate: 15, opacity: 0.08, blur: 6 },
    { x: 15, y: 55, size: 44, rotate: 95, opacity: 0.15, blur: 4 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {shapes.map((shape, i) => (
        <OutlineCulinaryShape key={i} {...shape} isPasta={i % 2 === 0} />
      ))}
    </div>
  );
}

/* ─────────────── FEATURES ─────────────── */
function FeaturesSection() {
  const features = [
    { icon: Flame, title: 'Wood-Fired Specialties', desc: 'Sourdough pizzas and fresh bread baked to perfection in our traditional stone oven', num: '01' },
    { icon: Award, title: 'Gourmet Multi-Cuisine', desc: 'An extensive, hand-crafted selection of speciality Italian and global culinary delights', num: '02' },
    { icon: Coffee, title: 'Artisanal Coffee & Drinks', desc: 'Premium bean selection, custom brews, and refreshing signature mocktails made to order', num: '03' },
  ];

  return (
    <section className="py-28 lg:py-36 section-flow relative">
      <ItalianCulinaryTrail />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <FadeIn className="max-w-xl mb-20">
          <img src="/logo.png" alt="LUCA Cafe Logo" className="w-12 h-12 rounded-full mb-6 object-cover opacity-90" />
          <p className="text-accent text-xs font-medium tracking-[0.25em] uppercase mb-4">Why LUCA Café</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold">
            What makes us <span className="italic text-gradient-warm">different</span>
          </h2>
        </FadeIn>

        <div className="space-y-0">
          {features.map((f, i) => (
            <FadeIn key={f.title} delay={i * 0.12}>
              <div className="group flex flex-col sm:flex-row items-start gap-6 sm:gap-10 py-10 border-b border-border/30 hover:border-accent/30 transition-colors duration-500">
                <span className="text-xs text-accent/40 font-mono tracking-wider mt-1">{f.num}</span>
                <div className="w-12 h-12 rounded-2xl bg-accent/5 flex items-center justify-center shrink-0 group-hover:bg-accent/10 transition-colors duration-500">
                  <f.icon className="w-5 h-5 text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-display font-semibold mb-2 text-foreground group-hover:text-accent transition-colors duration-500">{f.title}</h3>
                  <p className="text-muted-foreground font-light leading-relaxed max-w-lg">{f.desc}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground/30 group-hover:text-accent group-hover:translate-x-2 transition-all duration-500 hidden sm:block mt-1" />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── FEATURED MENU ─────────────── */
function FeaturedMenuSection() {
  const items = [
    { name: 'Margherita Pizza', price: 425, image: pizzaImg, tag: 'Wood-Fired Signature' },
    { name: 'Penne Alfredo', price: 425, image: pastaImg, tag: 'Artisanal Pasta' },
    { name: 'Minestrone Soup', price: 265, image: soupImg, tag: 'Healthy Classic' },
    { name: 'New York Sour', price: 345, image: mocktailImg, tag: "Luca's Mocktail" },
  ];

  return (
    <section className="py-28 lg:py-36 relative overflow-hidden">
      <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] blob bg-accent/3 animate-drift pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-16">
          <FadeIn>
            <p className="text-accent text-xs font-medium tracking-[0.25em] uppercase mb-4">The Menu</p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold">
              Curated <span className="italic font-light">for you</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <Button variant="glass" className="rounded-full" asChild>
              <Link to="/menu">View Full Menu <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
          </FadeIn>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {items.map((item, i) => (
            <FadeIn key={item.name} delay={i * 0.1}>
              <Link to="/menu" className="group block">
                <div className="organic-card bg-card hover-lift overflow-hidden">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      width={400}
                      height={500}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />

                    {item.tag && (
                      <span className="absolute top-2 left-2 sm:top-4 sm:left-4 text-[8px] sm:text-[10px] font-medium tracking-wider uppercase px-2 py-0.5 sm:px-3 sm:py-1 rounded-full glass text-accent">
                        {item.tag}
                      </span>
                    )}

                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5">
                      <h3 className="font-display text-sm sm:text-lg font-semibold text-foreground mb-0.5 sm:mb-1">{item.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-accent font-bold text-sm sm:text-lg">₹{item.price}</span>
                        <span className="text-[10px] sm:text-xs text-muted-foreground group-hover:text-accent transition-colors">
                          Order →
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>

        {/* Explore Full Menu Button for Mobile */}
        <div className="mt-8 flex justify-center sm:hidden">
          <Button variant="glass" className="rounded-full w-full py-6 text-sm font-medium" asChild>
            <Link to="/menu" className="flex items-center justify-center">
              Explore Our Full Menu <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── EXPERIENCE / PARALLAX ─────────────── */
function ExperienceSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);

  return (
    <section ref={ref} className="relative py-0 overflow-hidden min-h-[80vh] flex items-center">
      <motion.div style={{ y }} className="absolute inset-0">
        <img
          src={cafeInterior}
          alt="Café interior"
          loading="lazy"
          width={1200}
          height={800}
          className="w-full h-[120%] object-cover"
        />
        <div className="absolute inset-0 bg-background/75 backdrop-blur-[2px]" />
      </motion.div>

      <motion.div style={{ y: textY }} className="relative z-10 container mx-auto px-4 lg:px-8 py-28">
        <div className="max-w-2xl">
          <FadeIn>
            <p className="text-accent text-xs font-medium tracking-[0.25em] uppercase mb-6">The Space</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight mb-8">
              More than<br />
              just a restaurant.
              <br />
              <span className="italic text-muted-foreground font-light">A culinary ritual.</span>
            </h2>
            <p className="text-muted-foreground text-lg font-light leading-relaxed mb-10 max-w-lg">
              Warm lights, elegant Italian-inspired interiors, and the aroma of fresh baking — LUCA is designed to be your culinary sanctuary in Kanpur. Come in, slow down, and savor the moment.
            </p>
            <Button variant="hero" size="lg" className="rounded-full px-8 py-6" asChild>
              <Link to="/about">Discover Our Story</Link>
            </Button>
          </FadeIn>
        </div>
      </motion.div>
    </section>
  );
}

/* ─────────────── TESTIMONIALS ─────────────── */
function TestimonialsSection() {
  const testimonials = [
    { text: "The wood-fired sourdough pizzas here are absolutely legendary. Authentic flavors right in Kanpur!", name: 'Ananya R.', role: 'Regular Dining Guest' },
    { text: "LUCA has the perfect balance of premium Italian food and incredible ambience. The pasta was superb.", name: 'Karthik M.', role: 'Italian Food Enthusiast' },
    { text: "Whether it is breakfast or a late-night dinner, LUCA never disappoints. Their service is top-notch.", name: 'Divya S.', role: 'Frequent Diner' },
  ];

  return (
    <section className="py-28 lg:py-36 section-flow">
      <div className="container mx-auto px-4 lg:px-8">
        <FadeIn className="text-center mb-20">
          <p className="text-accent text-xs font-medium tracking-[0.25em] uppercase mb-4">Kind Words</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold">
            What our <span className="italic font-light">community</span> says
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <FadeIn key={t.name} delay={i * 0.15}>
              <div className="organic-card bg-card/50 glass p-8 flex flex-col justify-between min-h-[280px]">
                <div>
                  <div className="flex gap-1 mb-5">
                    {[1,2,3,4,5].map(s => <Star key={s} className="w-3.5 h-3.5 fill-accent text-accent" />)}
                  </div>
                  <p className="text-foreground/90 font-light leading-relaxed text-[15px] italic">
                    "{t.text}"
                  </p>
                </div>
                <div className="mt-6 pt-5 border-t border-border/20">
                  <p className="text-sm font-medium text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── LOCATION ─────────────── */
function LocationSection() {
  return (
    <section className="py-28 lg:py-36 relative overflow-hidden">
      <div className="absolute top-10 -right-10 w-[250px] h-[250px] blob-3 bg-accent/3 animate-drift pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <FadeIn>
              <p className="text-accent text-xs font-medium tracking-[0.25em] uppercase mb-6">Find Us</p>
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-6">
                Come say <span className="italic">hello</span>
              </h2>

              <div className="space-y-5 mb-8">
                {[
                  { icon: MapPin, label: 'Madhu Sudhan Tower, 113/115A, Khalasi Line, Swaroop Nagar, Kanpur, Uttar Pradesh 208002' },
                  { icon: Clock, label: 'Tue – Sun: 11:00 AM – 12:00 Midnight (Closed Mondays) · Breakfast: 11:00 AM – 5:00 PM' },
                  { icon: Phone, label: '080762 21806' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-accent/5 flex items-center justify-center shrink-0 group-hover:bg-accent/10 transition-colors">
                      <item.icon className="w-4 h-4 text-accent" />
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed pt-2">{item.label}</p>
                  </div>
                ))}
              </div>

              {/* Reservations Widget */}
              <div className="pt-6 border-t border-border/30">
                <p className="text-foreground text-xs font-semibold uppercase tracking-wider mb-4">Bookings & Reservations</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: 'District', url: 'https://district.in' },
                    { label: 'Zomato', url: 'https://zomato.com' },
                    { label: 'Swiggy', url: 'https://swiggy.com' },
                    { label: 'EazyDiner', url: 'https://eazydiner.com' }
                  ].map((plat) => (
                    <a
                      key={plat.label}
                      href={plat.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium px-4 py-2.5 rounded-full border border-border bg-card/50 hover:bg-accent hover:text-white transition-all duration-300 pointer-events-auto"
                    >
                      {plat.label}
                    </a>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>

          <div className="lg:col-span-7">
            <FadeIn delay={0.2} direction="right">
              <div className="relative">
                <img
                  src={cafeInterior}
                  alt="Our café"
                  loading="lazy"
                  width={700}
                  height={450}
                  className="w-full h-[350px] lg:h-[420px] object-cover blob-2"
                />
                <div className="absolute inset-0 blob-2 bg-gradient-to-r from-background/30 to-transparent" />
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── FINAL CTA ─────────────── */
function CTASection() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-warm" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-[400px] h-[400px] blob bg-accent/10 animate-drift" />
        <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] blob-2 bg-foreground/5 animate-drift" style={{ animationDelay: '3s' }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <FadeIn>
          <img src="/logo.png" alt="LUCA Cafe Logo" className="w-20 h-20 rounded-full mx-auto mb-8 object-cover shadow-2xl" />
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight" style={{ color: '#e5d4c2' }}>
            Your perfect table<br />
            <span className="italic font-light">is waiting.</span>
          </h2>
          <p className="text-lg font-light mb-10 max-w-md mx-auto" style={{ color: 'rgba(229, 212, 194, 0.7)' }}>
            Reserve your spot or explore the menu. Authentic Italian, ready for you.
          </p>
          <Button variant="hero" size="lg" className="rounded-full px-10 py-6 text-base" asChild>
            <Link to="/menu">
              Explore The Menu <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─────────────── PAGE ─────────────── */
export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <Preloader onComplete={() => setIsLoading(false)} />
      
      {!isLoading && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative min-h-screen bg-background overflow-x-hidden"
        >
          <GlobalItalianBackground page="landing" />
          <Navbar />
          <ScrollCanvas />
          <MarqueeBanner />
          <PhilosophySection />
          <FeaturesSection />
          <FeaturedMenuSection />
          <ExperienceSection />
          <TestimonialsSection />
          <LocationSection />
          <CTASection />
          <Footer />
        </motion.div>
      )}
    </>
  );
}
