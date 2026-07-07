import React from 'react';

import appleImg from '../../assets/apple.jpg';
import samsungImg from '../../assets/samsung.jpg';
import oneplusImg from '../../assets/oneplus.webp';
import nothingImg from '../../assets/nothing.jpg';
import googleImg from '../../assets/google.jpg';
import motorolaImg from '../../assets/motorola.jpg';
import oppoImg from '../../assets/oppo.webp';
import vivoImg from '../../assets/vivo.jpg';
import realmeImg from '../../assets/realme.webp';

const brands = [
  { name: 'Apple', icon: appleImg },
  { name: 'Samsung', icon: samsungImg },
  { name: 'OnePlus', icon: oneplusImg },
  { name: 'Nothing', icon: nothingImg },
  { name: 'Google', icon: googleImg },
  { name: 'Motorola', icon: motorolaImg },
  { name: 'Oppo', icon: oppoImg },
  { name: 'Vivo', icon: vivoImg },
  { name: 'Realme', icon: realmeImg },
];

const BrandsSection = () => {
  return (
    <section className="py-20 px-4 bg-background transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white text-center mb-4">
          Brands We Repair
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-center text-sm sm:text-base mb-12 max-w-md mx-auto">
          We service all major smartphone and device brands at the chip level.
        </p>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-9 gap-6">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="flex flex-col items-center justify-center gap-4 py-4 px-2 transition-transform hover:scale-105 cursor-default"
            >
              <div className="w-24 h-24 flex items-center justify-center">
                <img src={brand.icon} alt={brand.name} className="max-w-full max-h-full object-contain mix-blend-multiply dark:mix-blend-normal" />
              </div>
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 tracking-wide">
                {brand.name}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default BrandsSection;
