
import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, FileCode, Figma, Terminal, Database, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Toolbox: React.FC = () => {
  const { t } = useApp();

  const tools = [
    { name: 'VS Code', icon: FileCode, desc: 'Main Editor' },
    { name: 'Figma', icon: Figma, desc: 'Design' },
    { name: 'Terminal', icon: Terminal, desc: 'PowerShell / Bash' },
    { name: 'Chrome', icon: Monitor, desc: 'Debugging' },
    { name: 'Vercel', icon: Database, desc: 'Hosting' },
    { name: 'PowerToys', icon: Zap, desc: 'Productivity' },
  ];

  return (
    <div className="mt-20 pb-10">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-display mb-4">
        {t.about.toolbox.title}
      </h2>
      <p className="text-slate-600 dark:text-slate-400 mb-8">
        {t.about.toolbox.desc}
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {tools.map((tool, index) => (
          <motion.div
            key={tool.name}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 hover:border-primary/30 transition-colors group"
          >
            <tool.icon className="w-8 h-8 mb-3 text-slate-400 group-hover:text-primary transition-colors" />
            <h3 className="font-medium text-slate-900 dark:text-white text-sm">{tool.name}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-500">{tool.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Toolbox;
