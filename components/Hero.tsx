
import React, { useState, useEffect } from 'react';
import { Github, Linkedin, ArrowRight, Terminal, X, Folder, Code, CheckCircle2, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { projectsData } from './Projects'; 
import { useApp } from '../context/AppContext';
import SpotlightCard from './SpotlightCard';
import { Project } from '../types';

// Custom Brand Icons
const ReactIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="-10.5 -9.45 21 18.9" fill="currentColor" {...props}>
    <circle cx="0" cy="0" r="2" fill="currentColor"></circle>
    <g stroke="currentColor" strokeWidth="1" fill="none">
      <ellipse rx="10" ry="4.5"></ellipse>
      <ellipse rx="10" ry="4.5" transform="rotate(60)"></ellipse>
      <ellipse rx="10" ry="4.5" transform="rotate(120)"></ellipse>
    </g>
  </svg>
);

const TSIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M4 2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" stroke="none" fill="currentColor" className="opacity-20"/>
    <path d="M4 2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" stroke="currentColor" fill="none" />
    <path d="M8 8h8" />
    <path d="M12 8v8" />
    <path d="M16 16c1.1 0 2-.9 2-2s-.9-2-2-2h-1" />
    <path d="M15 12v4" />
  </svg>
);

const NextIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 180 180" fill="currentColor" {...props}>
    <mask id="mask0_408_134" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
      <circle cx="90" cy="90" r="90" fill="black" />
    </mask>
    <g mask="url(#mask0_408_134)">
      <circle cx="90" cy="90" r="90" fill="currentColor" fillOpacity="0.1" />
      <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="currentColor" />
      <rect x="115" y="54" width="12" height="72" fill="currentColor" />
    </g>
  </svg>
);

const TailwindIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
  </svg>
);

const Hero: React.FC = () => {
  const { t, language } = useApp();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const featuredProjects = projectsData.slice(0, 2);

  const techStack = [
    { name: "React", icon: ReactIcon },
    { name: "TypeScript", icon: TSIcon },
    { name: "Next.js", icon: NextIcon },
    { name: "Tailwind", icon: TailwindIcon },
  ];

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-24 md:pt-32"
    >
      {/* --- HERO INTRO --- */}
      <section className="flex flex-col items-start min-h-[60vh] justify-center mb-24">
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 font-medium uppercase tracking-wider">
            {t.hero.status}
          </span>
        </motion.div>

        {/* Main Heading Area */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="text-2xl md:text-3xl text-slate-600 dark:text-slate-300 font-medium font-display">
              {t.hero.greeting}
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white font-display">
              <span className="text-gradient">{t.hero.name}</span> <span className="inline-block animate-wave origin-[70%_70%]">👋</span>
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3"
          >
             <div className="p-2 bg-primary/10 rounded-xl text-primary hidden md:block">
                <Terminal className="w-6 h-6 md:w-8 md:h-8" />
             </div>
             <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white font-display">
               {t.hero.role}
             </h2>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed mb-10"
        >
          {t.hero.description}
        </motion.p>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap gap-4 mb-16"
        >
          <a
            href="https://github.com/matikgal"
            target="_blank"
            rel="noopener noreferrer"
            className="relative group flex items-center gap-3 px-7 py-3.5 bg-slate-900 dark:bg-white text-white dark:text-black rounded-full font-medium transition-all duration-300 hover:shadow-[0_10px_20px_-10px_rgba(0,0,0,0.5)] dark:hover:shadow-[0_10px_20px_-10px_rgba(255,255,255,0.3)] hover:scale-105"
          >
            <Github className="w-5 h-5" />
            <span>{t.hero.buttons.github}</span>
          </a>
          
          <a
            href="https://www.linkedin.com/in/mateusz-ga%C5%82uszka-981900231/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-7 py-3.5 bg-transparent border border-slate-200 dark:border-white/20 text-slate-700 dark:text-white rounded-full font-medium transition-all duration-300 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 hover:scale-105"
          >
            <Linkedin className="w-5 h-5 transition-colors" />
            <span>{t.hero.buttons.linkedin}</span>
          </a>
        </motion.div>

        {/* Mini Tech Stack */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="space-y-4"
        >
          <h2 className="text-xs font-mono text-slate-500 uppercase tracking-widest">{t.hero.currentStack}</h2>
          <div className="flex flex-wrap gap-4">
            {techStack.map((tech, i) => (
              <div key={tech.name} className="group flex items-center gap-2 text-slate-600 dark:text-slate-300 bg-white/50 dark:bg-white/5 px-4 py-2 rounded-xl border border-slate-200 dark:border-white/5 shadow-sm dark:shadow-none transition-all hover:border-primary/30 hover:bg-primary/5">
                <tech.icon className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" />
                <span className="text-sm font-medium">{tech.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* --- FEATURED PROJECTS --- */}
      <section className="mb-24">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white font-display">{t.hero.viewWork}</h2>
          <Link to="/projects" className="group text-sm font-medium text-primary flex items-center gap-1 transition-all hover:gap-2">
            {t.hero.viewAll} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid gap-8">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <SpotlightCard className="group cursor-default">
                <div className="p-6 md:p-8 h-full flex flex-col md:flex-row gap-8 items-start">
                   <div className="flex-1 order-2 md:order-1">
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary transition-colors font-display">{project.title}</h3>
                      <p className="text-slate-600 dark:text-slate-400 mb-6 line-clamp-2 leading-relaxed cursor-default">{project.description[language]}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.slice(0,3).map(tag => (
                          <span key={tag} className="text-[11px] uppercase tracking-wider font-bold font-mono px-2.5 py-1 rounded-md bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/5 whitespace-nowrap cursor-default">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <button 
                        onClick={() => setSelectedProject(project)}
                        className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white hover:text-primary dark:hover:text-primary transition-colors group/btn"
                      >
                         {t.projects.readMore}
                         <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                      </button>
                   </div>
                   <div className="md:w-64 w-full h-48 md:h-40 bg-slate-100 dark:bg-white/5 rounded-xl overflow-hidden relative shadow-inner order-1 md:order-2 cursor-pointer" onClick={() => setSelectedProject(project)}>
                      <img 
                        src={project.imageUrl} 
                        alt={project.title} 
                        className="w-full h-full object-cover opacity-90 dark:opacity-70 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                   </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </section>

       {/* --- PROJECT DETAILS MODAL (Shared with Projects.tsx) --- */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-4 sm:py-8">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-slate-900/40 dark:bg-black/80 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-white/10 flex flex-col overflow-hidden"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/80 dark:bg-black/50 text-slate-500 hover:text-slate-900 dark:hover:text-white backdrop-blur transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="overflow-y-auto flex-1 h-full">
                {/* Header Image */}
                <div className="relative h-48 sm:h-64 md:h-80 w-full bg-slate-100 dark:bg-white/5 shrink-0">
                  <img 
                    src={selectedProject.imageUrl} 
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-neutral-900 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full">
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white font-display mb-4">
                      {selectedProject.title}
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map(tag => (
                          <span key={tag} className="text-xs font-bold font-mono px-3 py-1.5 rounded-full bg-white/50 dark:bg-black/50 backdrop-blur-md text-slate-900 dark:text-white border border-white/20 dark:border-white/10 cursor-default">
                            {tag}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>

                {/* Scrollable Content */}
                <div className="p-6 md:p-10 grid md:grid-cols-[2fr,1fr] gap-12">
                  <div className="space-y-10">
                      <div>
                        <h3 className="text-lg font-bold text-primary mb-3 flex items-center gap-2 uppercase tracking-wider font-mono">
                          <Code className="w-5 h-5" /> {t.projects.modal.challenge}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg cursor-default">
                          {selectedProject.challenge ? selectedProject.challenge[language] : selectedProject.description[language]}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-primary mb-3 flex items-center gap-2 uppercase tracking-wider font-mono">
                          <CheckCircle2 className="w-5 h-5" /> {t.projects.modal.solution}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg cursor-default">
                          {selectedProject.solution ? selectedProject.solution[language] : "Standard solution description goes here..."}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">{t.projects.modal.features}</h3>
                        <ul className="grid gap-3">
                          {selectedProject.features && selectedProject.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-400 cursor-default">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                                <span>{feature[language]}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                  </div>

                  {/* Sidebar Actions */}
                  <div className="flex flex-col gap-4">
                      <div className="p-6 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5">
                        <h4 className="font-bold text-slate-900 dark:text-white mb-4">Links</h4>
                        <div className="space-y-3">
                            {selectedProject.demoUrl && (
                              <a 
                                href={selectedProject.demoUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-slate-900 font-bold rounded-xl hover:bg-primary/90 transition-colors"
                              >
                                <ExternalLink className="w-4 h-4" />
                                Live Demo
                              </a>
                            )}
                            <a 
                              href={selectedProject.repoUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center justify-center gap-2 w-full py-3 bg-white dark:bg-transparent border border-slate-200 dark:border-white/20 text-slate-700 dark:text-white font-medium rounded-xl hover:bg-slate-50 dark:hover:bg-white/10 transition-colors"
                            >
                              <Github className="w-4 h-4" />
                              GitHub Repo
                            </a>
                        </div>
                      </div>
                  </div>
                </div>
                
                <div className="p-6 border-t border-slate-100 dark:border-white/5 text-center md:hidden">
                  <button onClick={() => setSelectedProject(null)} className="text-slate-500 font-medium">
                    {t.projects.modal.close}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Hero;
