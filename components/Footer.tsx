
import React, { useEffect, useState } from 'react';
import { Github, Linkedin, Cloud, CloudRain, Sun, Command } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Footer: React.FC = () => {
  const { t } = useApp();
  const [time, setTime] = useState<string>('');
  const [weather, setWeather] = useState<{ temp: number, code: number } | null>(null);

  // Clock
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Weather (Open-Meteo API for Warsaw)
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=52.2297&longitude=21.0122&current_weather=true');
        const data = await res.json();
        if (data.current_weather) {
            setWeather({
                temp: data.current_weather.temperature,
                code: data.current_weather.weathercode
            });
        }
      } catch (e) {
        console.error("Failed to fetch weather");
      }
    };
    fetchWeather();
  }, []);

  const getWeatherIcon = (code: number) => {
    if (code <= 3) return <Sun className="w-4 h-4 text-yellow-500" />;
    if (code <= 67) return <CloudRain className="w-4 h-4 text-blue-400" />;
    return <Cloud className="w-4 h-4 text-slate-400" />;
  };

  const handleCommandClick = () => {
    // Dispatch keyboard event to open command palette
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }));
  };

  return (
    <footer className="mt-auto">
      <div className="max-w-3xl mx-auto px-6 sm:px-8 md:px-12 w-full">
        <div className="border-t border-slate-200 dark:border-white/10 pt-8 pb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 md:gap-y-8">
                
                {/* Row 1: Socials (Left) & Time/Weather (Right) */}
                <div className="flex items-center justify-center md:justify-start">
                    <div className="flex gap-4">
                        <a href="https://github.com/matikgal" target="_blank" rel="noreferrer" className="p-2 -ml-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"><Github className="w-5 h-5"/></a>
                        <a href="https://www.linkedin.com/in/mateusz-ga%C5%82uszka-981900231/" target="_blank" rel="noreferrer" className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400 hover:text-blue-500 transition-colors"><Linkedin className="w-5 h-5"/></a>
                    </div>
                </div>
                
                <div className="flex items-center justify-center md:justify-end gap-8">
                    {/* Time Block */}
                    <div className="flex flex-col items-center md:items-end">
                        <span className="text-[10px] font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase mb-1">
                            {t.footer.time}
                        </span>
                        <span className="font-mono font-medium text-slate-700 dark:text-slate-200">
                            {time || '--:--'}
                        </span>
                    </div>

                    {/* Weather Block */}
                    <div className="flex flex-col items-center md:items-end">
                        <span className="text-[10px] font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase mb-1">
                            {t.footer.weather}
                        </span>
                        <div className="flex items-center gap-2 font-mono font-medium text-slate-700 dark:text-slate-200">
                            {weather && getWeatherIcon(weather.code)}
                            <span>{weather ? `${weather.temp}°C` : '--'}</span>
                        </div>
                    </div>
                </div>

                {/* Row 2: Command Hint (Left) & Signature (Right) */}
                <div className="flex items-center justify-center md:justify-start">
                     <button 
                        onClick={handleCommandClick}
                        className="flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10 transition-all group cursor-pointer"
                        title="Open Command Palette (Ctrl+K)"
                    >
                        <Command className="w-4 h-4 text-slate-500 dark:text-slate-400 group-hover:text-primary transition-colors" />
                        <span className="font-normal text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors text-xs">{t.footer.cmdHint}</span>
                        <div className="flex items-center gap-1 ml-1">
                            <kbd className="font-mono px-1.5 py-0.5 bg-slate-200 dark:bg-neutral-800 rounded border border-slate-300 dark:border-neutral-600 text-slate-700 dark:text-slate-200 text-[10px] font-bold shadow-sm min-w-[24px]">Ctrl</kbd>
                            <span className="text-slate-400 dark:text-slate-500 text-[10px] font-bold">+</span>
                            <kbd className="font-mono px-1.5 py-0.5 bg-slate-200 dark:bg-neutral-800 rounded border border-slate-300 dark:border-neutral-600 text-slate-700 dark:text-slate-200 text-[10px] font-bold shadow-sm min-w-[20px]">K</kbd>
                        </div>
                    </button>
                </div>

                <div className="flex items-center justify-center md:justify-end">
                   <h2 className="text-lg font-medium text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors duration-300 cursor-default font-display">
                        Mateusz Gałuszka<span className="text-primary">.</span>
                    </h2>
                </div>

                {/* Row 3: Copyright (Left) & Tech Stack (Right) */}
                <div className="flex items-center justify-center md:justify-start pt-4 md:pt-0">
                    <p className="text-xs text-slate-400 dark:text-slate-500">
                        © {new Date().getFullYear()} Mateusz Gałuszka.
                    </p>
                </div>

                <div className="flex items-center justify-center md:justify-end pt-0">
                     <p className="text-xs text-slate-400 dark:text-slate-500">
                        {t.contact.footer}
                    </p>
                </div>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
