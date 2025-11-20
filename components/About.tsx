import React from 'react';
import { motion } from 'framer-motion';
import Skills from './Skills';
import Timeline from './Timeline';
import Toolbox from './Toolbox';
import { useApp } from '../context/AppContext';

const About: React.FC = () => {
  const { t } = useApp();

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="pt-32 pb-20"
    >
      <div className="max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-8 font-display">{t.about.title}</h1>
        
        <div className="prose dark:prose-invert prose-slate max-w-none mb-16">
          <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
            {t.about.p1}
          </p>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
            {t.about.p2}
          </p>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            {t.about.p3}
          </p>
        </div>

        <Skills />
        
        <Timeline />
        
        <Toolbox />
      </div>
    </motion.section>
  );
};

export default About;