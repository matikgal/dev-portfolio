import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import SpotlightCard from './SpotlightCard';

const Skills: React.FC = () => {
  const { t } = useApp();

  const skillCategories = [
    {
      title: t.about.skillCats.core,
      skills: ["HTML5", "CSS3", "JavaScript (ES6+)", "TypeScript"]
    },
    {
      title: t.about.skillCats.frameworks,
      skills: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "Redux"]
    },
    {
      title: t.about.skillCats.tools,
      skills: ["Git", "VS Code", "Figma", "Vercel", "npm/pnpm"]
    }
  ];

  return (
    <div className="mt-12 pt-12 border-t border-slate-200 dark:border-white/5">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-sm font-mono text-primary mb-8 uppercase tracking-widest">{t.about.skillsTitle}</h2>

        <div className="grid gap-10">
          {skillCategories.map((category, catIndex) => (
            <div key={category.title}>
              <h3 className="text-slate-800 dark:text-slate-200 font-medium mb-4 text-lg">{category.title}</h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, index) => (
                  <SpotlightCard 
                    key={skill}
                    className="!rounded-lg !bg-white dark:!bg-white/5"
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: (catIndex * 0.1) + (index * 0.05) }}
                      className="px-4 py-2 text-slate-600 dark:text-slate-300 text-sm font-medium relative z-10"
                    >
                      {skill}
                    </motion.div>
                  </SpotlightCard>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Skills;