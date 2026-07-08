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
        className="cursor-pointer group relative flex flex-col bg-white dark:bg-slate-900 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-slate-200 dark:border-slate-700"
      >
        <div className="relative w-full h-40 sm:h-48 bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden border-b border-slate-100 dark:border-slate-800">
          {product.imageUrls && product.imageUrls[0] ? (
            <img 
              src={product.imageUrls[0]} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500">
              <PackageOpen className="w-10 h-10 mb-2 stroke-[1.5]" />
              <span className="text-[10px] uppercase tracking-widest font-medium">No Image</span>
            </div>
          )}
        </div>
        
        <div className="p-4 flex flex-col flex-grow justify-between items-start text-left">
          <div className="w-full">
            <span className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold mb-1 block">
              {product.brand || product.category || 'Device'}
            </span>
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 leading-tight line-clamp-2 mb-2">
              {product.name}
            </h3>
          </div>
          <span className="text-base font-bold text-slate-900 dark:text-white mt-2">
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
              className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-lg overflow-hidden shadow-xl flex flex-col max-h-[90vh]"
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
                <div className="relative w-full h-56 sm:h-64 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-center p-6 border-b border-slate-200 dark:border-slate-700">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-white/90 dark:bg-slate-800/90 text-slate-800 dark:text-slate-200 text-xs px-2.5 py-1 rounded shadow-sm border border-slate-200 dark:border-slate-700 font-medium">
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
                    <div className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500">
                      <PackageOpen className="w-10 h-10 mb-2 stroke-[1.5]" />
                      <span className="text-xs font-medium">No Image</span>
                    </div>
                  )}
                </div>

                {/* Modal Content */}
                <div className="p-6 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div className="pr-4">
                      <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide font-medium mb-1 block">
                        {product.brand || product.category || 'Device'}
                      </span>
                      <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 leading-tight">
                        {product.name}
                      </h2>
                    </div>
                    <div className="text-right whitespace-nowrap">
                      <span className="text-xl font-bold text-slate-900 dark:text-white block">
                        ₹{formattedPrice}
                      </span>
                      {product.stock > 0 ? (
                        <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                          In Stock ({product.stock})
                        </span>
                      ) : (
                        <span className="text-xs text-red-600 dark:text-red-400 font-medium">
                          {t('store', 'outOfStock')}
                        </span>
                      )}
                    </div>
                  </div>

                  {product.description && (
                    <p className="text-sm text-slate-600 dark:text-slate-300 mb-6 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-4">
                      {product.description}
                    </p>
                  )}

                  {/* Modal CTA */}
                  <a 
                    href={whatsappLink}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-sm font-medium py-2.5 rounded transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
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
