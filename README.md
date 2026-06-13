# LUCA Café & Forno a Legna 🍕☕

An elegant, premium Italian & multi-cuisine dining experience built with React, Vite, and Framer Motion. Featuring a custom frame-by-frame scroll canvas animation, persistent cart systems, and modern performance optimizations.

## ✨ Features

- **Premium Scroll Canvas Experience**: Custom HTML5 `ScrollCanvas` component driven by GSAP ScrollTrigger for smooth, high-fidelity frame scrub animations.
- **Fast Startup & Progressive Loading**: Progressive frame-caching system that mounts the page instantly by waiting on only 8 critical frames, while background-loading remaining frames asynchronously.
- **Service Worker Caching (Offline Support)**: Built-in Service Worker with custom Cache-First strategy for heavy images/WebP frames and Stale-While-Revalidate for application assets.
- **Section Lazy Loading**: Reusable viewport intersection observer component (`LazySection`) to defer off-screen component mounting, boosting initial page speeds.
- **Persistent Shopping Cart**: Persistent state synchronizer using Zustand middleware to save and restore cart items across reloads.
- **Modern Italian Aesthetic**: curating a premium design system with HSL colors, glassmorphic widgets, and fluid micro-animations.

## 🚀 Tech Stack

- **Frontend**: React 18 + Vite + TypeScript + Zustand
- **Animations**: GSAP (ScrollTrigger) & Framer Motion
- **Caching**: Service Worker API
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

## 🛠️ Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run dev server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

---
*Where taste meets passion. Crafted for a premium dining ritual.*
