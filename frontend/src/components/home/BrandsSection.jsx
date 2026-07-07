import React from 'react';

const brands = [
  { name: 'Apple', icon: '🍎' },
  { name: 'Samsung', icon: '📱' },
  { name: 'OnePlus', icon: '📱' },
  { name: 'Nothing', icon: '📱' },
  { name: 'Google', icon: '📱' },
  { name: 'Motorola', icon: '📱' },
  { name: 'Oppo', icon: '📱' },
  { name: 'Vivo', icon: '📱' },
  { name: 'Realme', icon: '📱' },
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

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-9 gap-4">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="flex flex-col items-center justify-center gap-3 py-6 px-3 border border-border rounded hover:border-primary/40 hover:bg-primary/5 transition-colors cursor-default"
            >
              <span className="text-2xl">{brand.icon}</span>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 tracking-wide">
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
