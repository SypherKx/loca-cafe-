import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Analytics } from "@vercel/analytics/react";
import React, { lazy, Suspense, useEffect } from "react";

import ScrollToTop from "./components/ScrollToTop.tsx";
import { menuItems } from "./lib/menu-data";

const Index = lazy(() => import("./pages/Index.tsx"));
const MenuPage = lazy(() => import("./pages/MenuPage.tsx"));
const AboutPage = lazy(() => import("./pages/AboutPage.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Disable native scroll restoration so manual ScrollToTop and GSAP ScrollTrigger work reliably
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Initialize essentials in localStorage on website load
    if (!localStorage.getItem("luca_menu_items")) {
      localStorage.setItem("luca_menu_items", JSON.stringify(menuItems));
    }
    if (!localStorage.getItem("luca_user_preferences")) {
      localStorage.setItem("luca_user_preferences", JSON.stringify({
        dietary: "all",
        theme: "light"
      }));
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Suspense fallback={
            <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#efdfce]">
              <div className="w-8 h-8 rounded-full border-2 border-[#311e0c] border-t-transparent animate-spin" />
            </div>
          }>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
        <Analytics />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

