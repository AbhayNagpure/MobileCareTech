import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import technicianImg from '../../assets/technician.jpg';
import { useLanguage } from '../LanguageProvider';

const HeroSection = () => {
  const { t } = useLanguage();
  return (
    <section className="bg-background min-h-[calc(100vh-4rem)] flex flex-col justify-between overflow-hidden relative transition-colors duration-300 pt-10">
      <div className="flex-1 flex items-center justify-center w-full pb-10">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between relative z-10">
          
          {/* LEFT */}
          <div className="flex-1 max-w-xl text-center md:text-left mt-6 md:mt-0 w-full">
            <motion.h1 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground mb-4 md:mb-5 tracking-tight px-2 sm:px-0"
            >
              <span className="block mb-1 sm:mb-2">{t('hero', 'title1')}</span>
              <span className="text-primary">{t('hero', 'title2')}</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8 max-w-xs sm:max-w-md mx-auto md:mx-0 px-2 sm:px-0 font-medium"
            >
              {t('hero', 'subtitle')}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start mb-10 w-full px-4 sm:px-0 max-w-xs sm:max-w-none mx-auto md:mx-0"
            >
              <a 
                href="https://wa.me/917477090100?text=Hi%20MobileCareTech,%20I%20would%20like%20to%20book%20a%20repair%20for%20my%20device." 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-6 py-5 text-base rounded-2xl shadow-lg shadow-primary/20 transition-all hover:-translate-y-1">
                  {t('hero', 'bookRepair')}
                </Button>
              </a>
              <Link to="/store" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-border text-muted-foreground hover:bg-muted hover:text-foreground px-6 py-5 text-base rounded-2xl transition-all">
                  {t('hero', 'shopDevices')}
                </Button>
              </Link>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4 sm:gap-6 justify-center md:justify-start text-sm font-medium text-foreground/80 pt-6"
            >
              <div className="flex items-center gap-1.5 text-primary">• <span className="text-foreground/90">{t('hero', 'guarantee')}</span></div>
              <div className="flex items-center gap-1.5 text-primary">• <span className="text-foreground/90">{t('hero', 'sameDay')}</span></div>
              <div className="flex items-center gap-1.5 text-primary">• <span className="text-foreground/90">{t('hero', 'trainedStaff')}</span></div>
            </motion.div>
          </div>

          {/* RIGHT — Realistic Image */}
          <div className="flex-none w-full md:w-[450px] lg:w-[500px] mt-10 md:mt-0 relative z-20">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-background bg-muted">
              <img 
                src={technicianImg} 
                alt="Mobile Repair Technician" 
                className="w-full h-[300px] md:h-[400px] lg:h-[450px] object-cover hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-md rounded-xl p-2 px-3 shadow-lg border border-border">
                <p className="text-sm font-semibold text-foreground leading-none">2000+</p>
                <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mt-0.5">{t('hero', 'phonesFixed')}</p>
              </div>
              <div className="absolute bottom-1 right-2 bg-background/90 backdrop-blur-md rounded-xl p-2.5 pr-4 flex items-center gap-3 shadow-lg border border-border">
                <div>
                  <h4 className="text-sm font-semibold text-foreground leading-tight">{t('hero', 'expertTech')}</h4>
                  <p className="text-[11px] text-muted-foreground">{t('hero', 'yearsWorking')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
