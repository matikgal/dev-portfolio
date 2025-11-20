import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';

const Timeline: React.FC = () => {
  const { t } = useApp();
  const steps = t.about.timeline.steps;

  return (
    <div className="mt-20">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-display mb-10">
        {t.about.timeline.title}
      </h2>
      
      <div className="relative border-l border-slate-200 dark:border-white/10 ml-3 space-y-12">
        {steps.map((step: any, index: number) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="relative pl-8"
          >
            {/* Dot */}
            <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-white dark:ring-black" />
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mb-2">
              <span className="text-xs font-mono font-bold px-2 py-1 rounded bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/5 w-fit">
                {step.year}
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {step.title}
              </h3>
            </div>
            
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              {step.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;