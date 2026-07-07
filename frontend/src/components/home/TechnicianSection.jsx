import React from 'react';
import { motion } from 'framer-motion';
import technicianImg from '../../assets/technician.jpg';

const TechnicianSection = () => {
  return (
    <section className="py-20 px-4 bg-background transition-colors duration-300">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 lg:gap-20">
        
        {/* Left: Technician Image */}
        <div className="flex-1 w-full relative flex justify-center">
          <div className="relative w-full max-w-sm md:max-w-[400px]">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl"
            >
              <img 
                src={technicianImg} 
                alt="Our Expert Technician" 
                className="w-full h-auto object-cover max-h-[450px]"
              />
            </motion.div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/10 rounded-full -z-10 blur-2xl"></div>
          </div>
        </div>

        {/* Right: Text Content */}
        <div className="flex-1 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-6">
              Meet Our <span className="text-primary">Expert Technician</span>
            </h2>
            
            <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-8">
              With over <strong className="text-slate-900 dark:text-white">10+ years of dedicated experience</strong> in component-level micro-soldering and motherboard repair, we don't just replace parts—we find the root cause and fix it at the chip level.
            </p>

            <ul className="flex flex-col gap-4 text-slate-700 dark:text-slate-200 font-medium">
              <li className="flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">✓</span>
                Advanced Micro-soldering
              </li>
              <li className="flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">✓</span>
                Component-Level Diagnostics
              </li>
              <li className="flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">✓</span>
                Fast & Reliable Service
              </li>
            </ul>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default TechnicianSection;
