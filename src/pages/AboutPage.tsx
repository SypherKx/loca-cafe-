import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Clock, Phone, Coffee } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import cafeInterior from '@/assets/cafe-interior.jpg';
import handmadePasta from '@/assets/handmade-pasta.png';

function FadeIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 pt-24 pb-16">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="flex flex-col items-center mb-16"
         >
            <img src="/logo.png" alt="LUCA Cafe Logo" className="w-20 h-20 rounded-full mb-6 object-cover shadow-xl" />
            <p className="text-accent text-sm font-medium tracking-widest uppercase mb-3 text-center">Our Story</p>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground text-center">About LUCA Café</h1>
         </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <FadeIn>
            <img
              src={cafeInterior}
              alt="Café interior"
              loading="lazy"
              width={600}
              height={400}
              className="rounded-2xl w-full h-80 object-cover"
            />
          </FadeIn>
          <FadeIn delay={0.2}>
            <h2 className="text-2xl font-bold text-foreground mb-4">Where Every Meal Tells a Story</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              LUCA Café was born from a passion for authentic culinary experiences, blending traditional Italian craftsmanship with premium global flavors. We set out to create a warm, inviting sanctuary in the heart of Swaroop Nagar, Kanpur.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              From hand-kneaded sourdough pizzas baked in our signature stone oven to house-made pasta sauces, we source only the freshest ingredients to deliver authentic taste and premium quality in every bite.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <FadeIn delay={0.1} className="order-2 lg:order-1">
            <h2 className="text-2xl font-bold text-foreground mb-4">Crafted by Hand, Served with Heart</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Our culinary team consists of passionate chefs dedicated to the art of baking, grilling, and perfect flavor composition. From custom-crafted breakfast spreads to rich multi-cuisine main courses, we believe that cooking is an art.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We are committed to delivering premium quality dining. Every recipe is meticulously refined, and every guest is treated like family in our third-place bistro.
            </p>
          </FadeIn>
          <FadeIn delay={0.2} className="order-1 lg:order-2">
            <img
              src={handmadePasta}
              alt="Hand-crafted fresh pasta preparation"
              loading="lazy"
              width={600}
              height={400}
              className="rounded-2xl w-full h-80 object-cover"
            />
          </FadeIn>
        </div>

        <FadeIn>
          <div className="glass rounded-2xl p-8 md:p-12 text-center max-w-2xl mx-auto mb-16">
            <p className="text-2xl md:text-3xl font-light text-foreground italic leading-relaxed">
              "Good food is the foundation of genuine happiness. Every dish at LUCA is a tribute to Italian culinary tradition."
            </p>
            <p className="text-accent mt-4 font-medium">— The LUCA Team</p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            { icon: MapPin, title: 'Our Location', detail: 'Madhu Sudhan Tower, Swaroop Nagar, Kanpur' },
            { icon: Clock, title: 'Opening Hours', detail: 'Tue – Sun: 11 AM – 12 Midnight' },
            { icon: Phone, title: 'Call Us', detail: '080762 21806' },
          ].map((item, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="flex flex-col items-center text-center p-6 glass rounded-2xl h-full">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.detail}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
