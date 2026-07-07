import React from 'react';
import { motion } from 'framer-motion';

import mobileImg from '../../assets/mobile.png';
import { useLanguage } from '../LanguageProvider';

const HeroSection = () => {
  const { t } = useLanguage();
  return (
    <section className="bg-background min-h-[calc(100vh-4rem)] flex flex-col justify-center overflow-hidden relative transition-colors duration-300">
      <div className="flex-1 flex items-center justify-center w-full py-20 pb-32">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between relative z-10 gap-4 lg:gap-6">
          
          {/* LEFT */}
          <div className="flex-1 max-w-xl text-center md:text-left mt-6 md:mt-0 w-full">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight leading-[1.2]"
            >
              <span className="block whitespace-nowrap">Chip-Level Mobile Repair</span>
              <span className="block text-primary whitespace-nowrap">Done by Professionals.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-slate-500 dark:text-slate-400 text-lg sm:text-xl leading-relaxed mb-8 max-w-lg mx-auto md:mx-0 font-medium"
            >
              From dead phones to motherboard repairs, we diagnose and repair at the component level.
            </motion.p>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="flex flex-col gap-2 mb-10 text-sm font-semibold text-slate-700 dark:text-slate-300 mx-auto md:mx-0 text-left max-w-max"
            >
              <li className="flex items-center gap-2">✔ Chip-Level Repair</li>
              <li className="flex items-center gap-2">✔ Motherboard Repair</li>
              <li className="flex items-center gap-2">✔ IC Repair</li>
            </motion.ul>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex gap-3 justify-center md:justify-start"
            >
              <a 
                href="https://wa.me/917477090100?text=Hi%20MobileCareTech,%20I%20would%20like%20to%20book%20a%20repair%20for%20my%20device." 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <button className="flex items-center gap-3 bg-primary hover:bg-primary/90 text-white font-medium px-8 py-3.5 text-sm rounded shadow-lg shadow-primary/30 transition-all hover:-translate-y-0.5">
                  GET REPAIRED <span>→</span>
                </button>
              </a>
              <a href="/store">
                <button className="flex items-center gap-2 border border-border text-slate-700 dark:text-slate-300 hover:bg-muted font-medium px-8 py-3.5 text-sm rounded transition-all">
                  Store
                </button>
              </a>
            </motion.div>
          </div>

          {/* RIGHT — Medium-sized Advanced Repair Image */}
          <div className="flex-none w-full md:w-[550px] lg:w-[650px] mt-16 md:mt-0 relative z-20 mx-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2, type: 'spring' }}
              className="relative w-full flex justify-center"
            >
              <img 
                src={mobileImg} 
                alt="Advanced Chip-Level Phone Repair" 
                className="w-full max-w-[600px] h-auto object-contain" 
              />
            </motion.div>
          </div>
        </div>
      </div>
      {/* Premium Tech Bottom Border Design */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/4 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent blur-[2px]"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-primary shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>
        <div className="absolute bottom-[-3px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_10px_rgba(59,130,246,1)]"></div>
      </div>

    </section>
  );
};

export default HeroSection;
