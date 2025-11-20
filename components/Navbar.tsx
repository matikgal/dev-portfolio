
import React, { useState, useEffect } from 'react';
import { Home, User, FolderGit2, Mail, Sun, Moon, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Navbar: React.FC = () => {
  const location = useLocation();
  const { theme, toggleTheme, language, toggleLanguage, t } = useApp();
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: t.nav.home, path: '/', icon: Home, id: 'home' },
    { name: t.nav.about, path: '/about', icon: User, id: 'about' },
    { name: t.nav.projects, path: '/projects', icon: FolderGit2, id: 'projects' },
    { name: t.nav.contact, path: '/contact', icon: Mail, id: 'contact' },
  ];

  return (
    <>
      {/* --- DESKTOP NAVBAR --- */}
      <div className="hidden md:block fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-fit px-4">
        <nav className="flex items-center gap-1 p-1.5 bg-white/60 dark:bg-neutral-900/50 backdrop-blur-2xl border border-white/20 dark:border-white/5 rounded-full shadow-2xl shadow-slate-200/50 dark:shadow-black/50 transition-colors duration-300 ring-1 ring-black/5 dark:ring-white/5">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            const isHovered = hoveredSection === link.id;
            const showText = isActive || isHovered;

            return (
              <Link
                key={link.id}
                to={link.path}
                onMouseEnter={() => setHoveredSection(link.id)}
                onMouseLeave={() => setHoveredSection(null)}
                className={`relative flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-300 cursor-pointer no-underline`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-white dark:bg-white/10 border border-slate-200 dark:border-white/5 rounded-full shadow-sm"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}

                <link.icon 
                  className={`relative z-10 w-4 h-4 transition-colors ${
                    isActive 
                      ? 'text-slate-900 dark:text-white' 
                      : isHovered 
                        ? 'text-slate-700 dark:text-slate-200' 
                        : 'text-slate-500 dark:text-slate-400'
                  }`} 
                  strokeWidth={2} 
                />

                <AnimatePresence>
                  {showText && (
                    <motion.span
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 'auto', opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className={`relative z-10 whitespace-nowrap overflow-hidden text-sm font-medium ${
                        isActive ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-200'
                      }`}
                    >
                      <span className="pl-1">{link.name}</span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            );
          })}

          <div className="w-px h-5 bg-slate-300/50 dark:bg-white/10 mx-1" />

          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full hover:bg-white/50 dark:hover:bg-white/5 text-slate-500 dark:text-slate-400 transition-colors"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={toggleLanguage}
            className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-white/50 dark:hover:bg-white/5 text-xs font-mono font-bold text-slate-600 dark:text-slate-400 transition-colors"
            aria-label="Toggle Language"
          >
            {language.toUpperCase()}
          </button>
        </nav>
      </div>

      {/* --- MOBILE NAVBAR --- */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="fixed top-4 right-4 z-[60] p-3 rounded-full bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border border-slate-200 dark:border-white/10 shadow-lg text-slate-900 dark:text-white active:scale-95 transition-all"
        >
           {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
              animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
              exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="fixed inset-0 z-50 bg-slate-50/95 dark:bg-black/95 backdrop-blur-3xl flex flex-col items-center justify-center p-6"
            >
              <nav className="flex flex-col items-center gap-8 w-full max-w-sm">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                    className="w-full"
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center justify-center gap-4 p-4 rounded-2xl text-xl font-display font-medium transition-all ${
                        location.pathname === link.path 
                          ? 'bg-slate-200 dark:bg-white/10 text-slate-900 dark:text-white' 
                          : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <link.icon className="w-6 h-6" />
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                
                {/* Mobile Settings */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center gap-6 mt-8 p-4 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 w-full justify-center"
                >
                  <button onClick={toggleTheme} className="flex flex-col items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                    <div className="p-3 rounded-full bg-slate-100 dark:bg-white/10">
                      {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </div>
                    <span>Motyw</span>
                  </button>
                  <div className="w-px h-10 bg-slate-200 dark:bg-white/10" />
                  <button onClick={toggleLanguage} className="flex flex-col items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                     <div className="w-11 h-11 flex items-center justify-center rounded-full bg-slate-100 dark:bg-white/10 font-mono font-bold">
                        {language.toUpperCase()}
                     </div>
                     <span>Język</span>
                  </button>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Navbar;
