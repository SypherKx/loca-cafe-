import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GlobalItalianBackground from '@/components/GlobalItalianBackground';
import type { MenuItem } from '@/lib/store';

const categories = [
  { key: 'soup', label: 'Zuppe', subLabel: 'Soups' },
  { key: 'appetizers', label: 'Antipasti', subLabel: 'Appetizers & Salads' },
  { key: 'pizza', label: 'Pizze', subLabel: 'Wood-Fired Pizza' },
  { key: 'pasta', label: 'Primi Piatti', subLabel: 'Artisanal Pasta & Risotto' },
  { key: 'panini', label: 'Panini', subLabel: 'Baked Panini' },
  { key: 'hot', label: 'Caffè Caldo', subLabel: 'Hot Coffee' },
  { key: 'iced', label: 'Caffè Freddo', subLabel: 'Iced Coffee' },
  { key: 'cold', label: 'Classici Freddi', subLabel: 'Cold Brews & Classics' },
  { key: 'signature', label: 'Specialità di Luca', subLabel: "Luca's Signature" },
  { key: 'not-cocktails', label: 'Cocktail Analcolici', subLabel: 'Not Cocktails (Mocktails)' },
  { key: 'soft-beverages', label: 'Bevande', subLabel: 'Soft Beverages' },
  { key: 'dessert', label: 'Dolci', subLabel: 'Desserts' },
] as const;

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    const cached = localStorage.getItem('luca_menu_items');
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        console.error('Failed to parse cached menu items:', e);
      }
    }
    return [];
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<string>('');

  useEffect(() => {
    if (menuItems.length === 0) {
      import('@/lib/menu-data').then(({ menuItems: staticItems }) => {
        setMenuItems(staticItems);
        if (!localStorage.getItem('luca_menu_items')) {
          localStorage.setItem('luca_menu_items', JSON.stringify(staticItems));
        }
      });
    }
  }, [menuItems]);

  const query = searchQuery.toLowerCase().trim();

  const filtered = menuItems.filter((item) => {
    if (!query) return true;

    // 1. Direct name or description match
    if (item.name.toLowerCase().includes(query) || item.description.toLowerCase().includes(query)) {
      return true;
    }

    // 2. Category match (key, label, or subLabel)
    const categoryInfo = categories.find(cat => cat.key === item.category);
    if (categoryInfo) {
      if (
        categoryInfo.key.toLowerCase().includes(query) ||
        categoryInfo.label.toLowerCase().includes(query) ||
        categoryInfo.subLabel.toLowerCase().includes(query)
      ) {
        return true;
      }
    }

    // 3. Fallback exact category word check
    if (query === 'pasta' && item.category === 'pasta') return true;
    if (query === 'pizza' && item.category === 'pizza') return true;
    if (query === 'soup' && item.category === 'soup') return true;
    if (query === 'dessert' && item.category === 'dessert') return true;
    if (query === 'drinks' && (item.category === 'hot' || item.category === 'iced' || item.category === 'cold' || item.category === 'not-cocktails' || item.category === 'soft-beverages')) return true;

    return false;
  });

  const groupedItems = categories
    .map((cat) => ({
      ...cat,
      items: filtered.filter((item) => item.category === cat.key),
    }))
    .filter((group) => group.items.length > 0)
    .sort((a, b) => {
      if (!query) return 0; // no search → keep default order

      // Check if category itself matches the search query
      const aMatches = a.key.toLowerCase().includes(query) ||
                       a.label.toLowerCase().includes(query) ||
                       a.subLabel.toLowerCase().includes(query);
      const bMatches = b.key.toLowerCase().includes(query) ||
                       b.label.toLowerCase().includes(query) ||
                       b.subLabel.toLowerCase().includes(query);

      if (aMatches && !bMatches) return -1; // a goes first
      if (!aMatches && bMatches) return 1;  // b goes first
      return 0; // keep original order among equals
    });

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      // Offset for sticky navbar + sticky categories bar (64px + 52px = 116px)
      const offset = 120;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveTab(id);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#efdfce] text-[#311e0c] overflow-x-hidden">
      <GlobalItalianBackground page="menu" />
      <Navbar />

      {/* Hero section */}
      <div className="pt-28 pb-12 text-center bg-gradient-hero">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="container mx-auto px-4"
        >
          <p className="text-accent text-xs font-semibold tracking-[0.25em] uppercase mb-3">Luca's Restaurant</p>
          <h1 className="text-5xl md:text-6xl font-display font-bold italic tracking-tight mb-4 text-[#311e0c]">
            Il Menu
          </h1>
          <p className="text-sm md:text-base text-muted-foreground max-w-md mx-auto font-light">
            Speciality Italian and curated multi-cuisine dishes hand-crafted in Swaroop Nagar, Kanpur.
          </p>
        </motion.div>
      </div>

      {/* Sticky Categories Bar */}
      <div className="sticky top-16 z-40 bg-[#efdfce]/90 backdrop-blur-md border-y border-[#311e0c]/10 py-3 shadow-sm overflow-x-auto">
        <div className="container mx-auto px-4 flex items-center justify-start lg:justify-center gap-2 md:gap-4 min-w-max scrollbar-hide">
          {categories.map((cat) => {
            // Only show category tab if items matching search query exist in it
            const hasItems = groupedItems.some((g) => g.key === cat.key);
            if (!hasItems) return null;

            return (
              <button
                key={cat.key}
                onClick={() => scrollToSection(cat.key)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                  activeTab === cat.key
                    ? 'bg-[#311e0c] text-[#efdfce] shadow-md'
                    : 'text-[#311e0c]/60 hover:text-[#311e0c] hover:bg-[#311e0c]/5'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Search and Menu Content */}
      <div className="container mx-auto px-4 py-12 pb-32">
        {/* Minimalist Search Bar */}
        <div className="flex justify-center mb-16">
          <div className="relative w-full max-w-[420px] group">
            <input
              type="text"
              placeholder="Search pizza, pasta, appetizers, desserts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-b border-[#311e0c]/20 rounded-none pl-2 pr-10 py-3 text-base text-[#311e0c] focus:outline-none focus:border-[#311e0c] transition-all placeholder:text-[#311e0c]/30"
            />
            {searchQuery ? (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#311e0c]/60 hover:text-[#311e0c] transition-colors pointer-events-auto"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            ) : (
              <Search className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#311e0c]/40 group-focus-within:text-[#311e0c] transition-colors" />
            )}
          </div>
        </div>

        {/* Menu Book Container */}
        <div className="max-w-5xl mx-auto bg-[#f6ebdd]/40 border border-[#311e0c]/5 rounded-3xl p-6 md:p-16 shadow-2xl relative">
          
          {/* Decorative Corner Ornaments */}
          <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-[#311e0c]/10 rounded-tl-lg pointer-events-none" />
          <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-[#311e0c]/10 rounded-tr-lg pointer-events-none" />
          <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-[#311e0c]/10 rounded-bl-lg pointer-events-none" />
          <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-[#311e0c]/10 rounded-br-lg pointer-events-none" />

          <div className="space-y-24">
            {groupedItems.length > 0 ? (
              groupedItems.map((group) => (
                <section key={group.key} id={group.key} className="scroll-mt-32 space-y-10">
                  {/* Category Header */}
                  <div className="text-center">
                    <h2 className="font-display text-3xl md:text-4xl font-bold italic text-[#311e0c] mb-1">
                      {group.label}
                    </h2>
                    <p className="text-[10px] md:text-xs text-accent uppercase tracking-[0.25em] font-medium">
                      {group.subLabel}
                    </p>
                    <div className="w-12 h-[1px] bg-[#311e0c]/20 mx-auto mt-4"></div>
                  </div>

                  {/* List of Dishes */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
                    <AnimatePresence mode="popLayout">
                      {group.items.map((item) => (
                        <motion.div
                          layout
                          key={item.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="group"
                        >
                          <div className="flex justify-between items-baseline gap-2 mb-1">
                            <h3 className="font-display font-bold text-[#311e0c] text-base md:text-lg group-hover:text-accent transition-colors">
                              {item.name}
                            </h3>
                            <div className="flex-1 border-b border-dotted border-[#311e0c]/20 mx-2 min-w-[15px]"></div>
                            <span className="font-display font-semibold text-[#311e0c] text-base md:text-lg shrink-0">
                              ₹{item.price}
                            </span>
                          </div>
                          <p className="text-xs md:text-sm text-[#311e0c]/70 font-light italic leading-relaxed">
                            {item.description}
                          </p>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </section>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="text-center py-20 bg-[#311e0c]/3 rounded-3xl border border-[#311e0c]/5"
              >
                <div className="space-y-3">
                  <p className="text-xl text-[#311e0c] font-medium">Nessun Risultato</p>
                  <p className="text-[#311e0c]/60 font-light">We couldn't find any menu items matching "<span className="text-accent font-normal">{searchQuery}</span>"</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
