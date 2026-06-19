import React, { useState } from 'react';
import { PackageOpen, MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { config } from '../../config';
import { useLanguage } from '../LanguageProvider';

const ProductCard = ({ product }) => {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formattedPrice = product.price ? product.price.toLocaleString('en-IN') : 'N/A';
  const whatsappLink = `https://wa.me/${config.whatsappNumber}?text=Hi, I'm interested in buying:%0A%0A*${encodeURIComponent(product.name)}*%0A💰 Price: ₹${formattedPrice}%0A🏷️ Condition: ${product.condition || 'Used'}%0A%0AIs this available?`;

  // Disable scroll when modal is open
  React.useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [isModalOpen]);

  return (
    <>
      {/* The Simplified Card */}
      <div 
        onClick={() => setIsModalOpen(true)}
        className="cursor-pointer group relative flex flex-col bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 dark:border-slate-800"
      >
        <div className="relative w-full h-52 sm:h-60 bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden border-b border-slate-100 dark:border-slate-800">
          {product.imageUrls && product.imageUrls[0] ? (
            <img 
              src={product.imageUrls[0]} 
              alt={product.name} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500">
              <PackageOpen className="w-10 h-10 mb-2 stroke-[1.5]" />
              <span className="text-[10px] uppercase tracking-widest font-medium">No Image</span>
            </div>
          )}
        </div>
        
        <div className="p-5 flex flex-col flex-grow justify-center items-center text-center">
          <span className="text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 font-bold mb-1">
            {product.brand || product.category || 'Device'}
          </span>
          <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 leading-snug line-clamp-2 mb-2">
            {product.name}
          </h3>
          <span className="text-lg sm:text-xl font-black text-slate-900 dark:text-white leading-none mt-auto">
            ₹{formattedPrice}
          </span>
        </div>
      </div>

      {/* The Modal Overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              {/* Close Button */}
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 z-20 p-2 bg-white/50 dark:bg-black/50 backdrop-blur-md rounded-full text-slate-900 dark:text-white hover:bg-white dark:hover:bg-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="overflow-y-auto custom-scrollbar flex-grow">
                {/* Modal Image */}
                <div className="relative w-full h-64 sm:h-80 bg-white dark:bg-slate-800/20 flex items-center justify-center p-6 border-b border-slate-100 dark:border-slate-800">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="backdrop-blur-md bg-white/90 dark:bg-black/60 text-slate-900 dark:text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm border border-black/5 dark:border-white/10 tracking-wide uppercase">
                      {product.condition || 'Used'}
                    </span>
                  </div>

                  {product.imageUrls && product.imageUrls[0] ? (
                    <img 
                      src={product.imageUrls[0]} 
                      alt={product.name} 
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-slate-300 dark:text-slate-600">
                      <PackageOpen className="w-12 h-12 mb-2 stroke-[1.5]" />
                      <span className="text-[10px] uppercase tracking-widest font-medium">No Image</span>
                    </div>
                  )}
                </div>

                {/* Modal Content */}
                <div className="p-6 sm:p-8 flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 font-bold mb-1">
                    {product.brand || product.category || 'Device'}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 leading-tight mb-4">
                    {product.name}
                  </h2>

                  {product.description && (
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
                      {product.description}
                    </p>
                  )}

                  <div className="flex items-end justify-between mb-8 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-slate-400 font-medium mb-1 uppercase tracking-wide">Price</span>
                      <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-none">
                        ₹{formattedPrice}
                      </span>
                    </div>
                    
                    {product.stock > 0 ? (
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/20 px-3 py-1.5 rounded-full">
                        {product.stock} {t('store', 'left')}
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-500/20 px-3 py-1.5 rounded-full">
                        {t('store', 'outOfStock')}
                      </span>
                    )}
                  </div>

                  {/* Modal CTA */}
                  <a 
                    href={whatsappLink}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-sm sm:text-base font-semibold py-4 rounded-full transition-transform active:scale-[0.98] shadow-md"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>{t('store', 'buyWhatsApp')}</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductCard;
