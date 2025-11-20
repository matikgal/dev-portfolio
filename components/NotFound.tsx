import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, AlertTriangle } from 'lucide-react';
import { useApp } from '../context/AppContext';

const NotFound: React.FC = () => {
  const { t } = useApp();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="mb-8 p-6 rounded-full bg-red-500/5 text-red-500 border border-red-500/20"
      >
        <AlertTriangle className="w-12 h-12" />
      </motion.div>
      
      <h1 className="text-6xl md:text-9xl font-bold font-display text-slate-200 dark:text-white/5 mb-4">
        {t.notFound.title}
      </h1>
      
      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">
        {t.notFound.subtitle}
      </h2>
      
      <p className="text-slate-600 dark:text-slate-400 max-w-md mb-8">
        {t.notFound.desc}
      </p>
      
      <Link 
        to="/"
        className="flex items-center gap-2 px-6 py-3 bg-primary text-slate-900 font-bold rounded-full hover:bg-primary/90 transition-colors"
      >
        <Home className="w-4 h-4" />
        {t.notFound.button}
      </Link>
    </div>
  );
};

export default NotFound;