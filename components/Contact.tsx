
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Copy, Check, Github, Linkedin } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Contact: React.FC = () => {
  const { t, showToast } = useApp();
  const [copied, setCopied] = useState(false);
  const email = "mateusz.galuszka21@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    showToast(t.contact.toast, 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="pt-32 pb-20 flex-1 flex flex-col items-center justify-center"
    >
      <div className="flex flex-col items-center justify-center text-center w-full mb-20">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="w-full px-2"
        >
          <h1 className="text-4xl md:text-7xl font-bold text-slate-900 dark:text-white mb-6 font-display text-gradient">
            {t.contact.title}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
            {t.contact.subtitle}
          </p>

          <div className="flex flex-col items-center gap-8 w-full">
            <button 
              onClick={handleCopy}
              className="group relative flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 px-6 py-4 md:px-8 md:py-5 w-full max-w-[90vw] md:max-w-auto md:w-auto bg-white dark:bg-white/5 backdrop-blur-sm border border-slate-200 dark:border-white/10 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/10 transition-all active:scale-95 hover:scale-105 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-primary/10 text-primary shrink-0">
                  <Mail className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <span className="text-sm sm:text-base md:text-xl text-slate-700 dark:text-slate-200 font-mono tracking-wide break-all">
                  {email}
                </span>
              </div>
              
              <div className="hidden md:block w-px h-6 bg-slate-200 dark:bg-white/10 mx-2" />
              
              <div className="flex items-center gap-2 text-xs md:text-sm text-slate-400 md:text-inherit">
                {copied ? (
                  <>
                    <Check className="w-4 h-4 md:w-5 md:h-5 text-green-500 dark:text-green-400" />
                    <span className="md:hidden text-green-500">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 md:w-5 md:h-5 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
                    <span className="md:hidden">Copy</span>
                  </>
                )}
              </div>
            </button>

            <div className="flex items-center gap-6">
              <a href="https://github.com/matikgal" target="_blank" rel="noreferrer" className="block p-3 rounded-full bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all border border-slate-200 dark:border-transparent hover:shadow-lg hover:scale-110">
                <Github className="w-6 h-6" />
              </a>
              
              <a href="https://www.linkedin.com/in/mateusz-ga%C5%82uszka-981900231/" target="_blank" rel="noreferrer" className="block p-3 rounded-full bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-all border border-slate-200 dark:border-transparent hover:shadow-lg hover:scale-110">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Contact;
