
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import CommandPalette from './components/CommandPalette';
import Preloader from './components/Preloader';
import Footer from './components/Footer';
import NotFound from './components/NotFound';
import { AppProvider, useApp } from './context/AppContext';
import { CheckCircle2, XCircle, Info } from 'lucide-react';

// ScrollToTop Component
// Automatically scrolls window to top when pathname changes
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Use 'instant' behavior to avoid fighting with page transitions
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", 
    });
  }, [pathname]);

  return null;
};

// Toast Container
const ToastContainer = () => {
  const { toasts } = useApp();
  return (
    <div className="fixed bottom-4 right-4 z-[200] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-white/10 shadow-xl min-w-[280px]"
          >
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-green-500" />}
            {toast.type === 'error' && <XCircle className="w-5 h-5 text-red-500" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-blue-500" />}
            <span className="text-sm font-medium text-slate-900 dark:text-white">{toast.message}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

// AnimatedRoutes
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Hero />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

function AppContent() {
    const [loading, setLoading] = useState(true);

    if (loading) {
        return <Preloader onComplete={() => setLoading(false)} />;
    }

    return (
      <HashRouter>
        <ScrollToTop />
        <CommandPalette />
        <ToastContainer />
        
        {/* Background Grid */}
        <div className="fixed inset-0 z-0 bg-grid pointer-events-none" />
        
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          
          <main className="max-w-3xl mx-auto px-6 sm:px-8 md:px-12 w-full flex-1 flex flex-col">
            <AnimatedRoutes />
          </main>

          <Footer />
        </div>
      </HashRouter>
    );
}

function App() {
  return (
    <AppProvider>
        <AppContent />
    </AppProvider>
  );
}

export default App;
