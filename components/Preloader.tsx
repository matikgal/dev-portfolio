
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(onComplete, 500); // wait for exit animation
    }, 1500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isLoading ? 1 : 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-50 dark:bg-neutral-950"
      style={{ pointerEvents: isLoading ? 'auto' : 'none' }}
    >
      <div className="relative flex flex-col items-center gap-4">
        <svg
          className="w-32 h-32"
          viewBox="0 0 120 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M15 80 V30 L35 55 L55 30 V80 M95 30 H65 V80 H95 V55 H80"
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-slate-900 dark:text-white"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          <motion.circle
            cx="105"
            cy="80"
            r="6"
            fill="currentColor"
            className="text-primary"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.2, duration: 0.3, type: "spring" }}
          />
        </svg>
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="h-1 w-32 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden"
        >
            <motion.div 
                className="h-full bg-primary"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.3, ease: "easeInOut" }}
            />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Preloader;
