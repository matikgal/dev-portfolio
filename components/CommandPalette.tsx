
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Home, User, FolderGit2, Mail, Sun, Moon, Globe, Copy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { CommandAction } from '../types';

const CommandPalette: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { t, toggleTheme, toggleLanguage, theme, showToast, language } = useApp();

  // Toggle with Keyboard Shortcut (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const actions: CommandAction[] = [
    { 
      id: 'home', 
      label: t.command.actions.goHome, 
      icon: Home, 
      action: () => navigate('/') 
    },
    { 
      id: 'about', 
      label: t.command.actions.goAbout, 
      icon: User, 
      action: () => navigate('/about') 
    },
    { 
      id: 'projects', 
      label: t.command.actions.goProjects, 
      icon: FolderGit2, 
      action: () => navigate('/projects') 
    },
    { 
      id: 'contact', 
      label: t.command.actions.goContact, 
      icon: Mail, 
      action: () => navigate('/contact') 
    },
    { 
      id: 'theme', 
      label: t.command.actions.toggleTheme, 
      icon: theme === 'dark' ? Sun : Moon, 
      action: toggleTheme 
    },
    { 
      id: 'lang', 
      label: t.command.actions.toggleLang, 
      icon: Globe, 
      action: toggleLanguage 
    },
    { 
      id: 'copy', 
      label: t.command.actions.copyEmail, 
      icon: Copy, 
      action: () => {
        navigator.clipboard.writeText('mateusz.galuszka21@gmail.com');
        showToast(t.contact.toast, 'success');
      } 
    },
  ];

  // Filter logic
  const filteredActions = actions.filter(action => 
    action.label.toLowerCase().includes(query.toLowerCase())
  );

  const handleAction = (action: () => void) => {
    action();
    setIsOpen(false);
    setQuery('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-slate-900/20 dark:bg-black/60 backdrop-blur-sm"
          />

          {/* Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-lg bg-white dark:bg-neutral-900 rounded-xl shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden flex flex-col"
          >
            {/* Search Bar */}
            <div className="flex items-center px-4 border-b border-slate-100 dark:border-white/5">
              <Search className="w-5 h-5 text-slate-400" />
              <input
                autoFocus
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.command.placeholder}
                className="w-full px-4 py-4 bg-transparent border-none outline-none text-slate-700 dark:text-slate-200 placeholder-slate-400 text-lg"
              />
              <div className="flex items-center gap-2">
                <kbd className="hidden md:inline-flex h-6 items-center gap-1 rounded border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 px-2 font-mono text-xs text-slate-500">
                  <span className="text-xs">ESC</span>
                </kbd>
              </div>
            </div>

            {/* Results */}
            <div className="max-h-[60vh] overflow-y-auto py-2 px-2">
              {filteredActions.length > 0 ? (
                <div className="space-y-1">
                  {filteredActions.map((action) => (
                    <button
                      key={action.id}
                      onClick={() => handleAction(action.action)}
                      className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-colors hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary group"
                    >
                      <action.icon className="w-5 h-5 text-slate-400 group-hover:text-primary" />
                      <span className="font-medium flex-1">
                         {action.label}
                      </span>
                      {action.id === 'theme' && <span className="text-xs text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">Toggle</span>}
                      {action.id === 'lang' && <span className="text-xs text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity font-mono uppercase">{language}</span>}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-slate-500 text-sm">
                  {t.command.noResults}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="hidden md:flex items-center justify-between px-4 py-2 bg-slate-50 dark:bg-white/5 border-t border-slate-100 dark:border-white/5 text-xs text-slate-400">
              <div className="flex gap-4">
                 <span>DevPortfolio v1.0</span>
              </div>
              <div className="flex items-center gap-2">
                 <span>{t.command.hint}</span>
                 <kbd className="flex h-5 w-5 items-center justify-center rounded border border-slate-200 dark:border-white/10 bg-white dark:bg-black font-sans">↑</kbd>
                 <kbd className="flex h-5 w-5 items-center justify-center rounded border border-slate-200 dark:border-white/10 bg-white dark:bg-black font-sans">↓</kbd>
                 <span>to navigate</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
