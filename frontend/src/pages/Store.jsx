import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { productService } from '../services/productService';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, SlidersHorizontal, PackageOpen } from "lucide-react";
import { useLanguage } from '../components/LanguageProvider';
import { config } from '../config';

const Store = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [page, setPage] = useState(1);

  // Map UI category names to Backend DB values (Repairs are excluded as they go to Home page)
  const categoryMap = {
    'All': 'ALL',
    'Phones': 'PHONE',
    'Accessories': 'ACCESSORY',
    'Parts': 'PART',
    'Laptops': 'LAPTOP'
  };
  const categories = Object.keys(categoryMap);

  const { data, isLoading: loading } = useQuery({
    queryKey: ['products', { category: categoryMap[activeCategory], search: searchQuery, page, excludeCategory: 'REPAIR' }],
    queryFn: () => productService.getAllProducts({
      category: categoryMap[activeCategory],
      search: searchQuery,
      page,
      limit: 10,
      excludeCategory: 'REPAIR'
    }),
  });

  const filteredProducts = data?.products || [];
  const pagination = data?.pagination;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-foreground tracking-tight">{t('store', 'title')}</h1>
          <p className="text-sm text-muted-foreground mt-1">{t('store', 'subtitle')}</p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
          <input
            type="text"
            placeholder={t('store', 'searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-muted/50 border border-border/50 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
          />
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-2 scrollbar-hide">
        <div className="flex items-center justify-center p-2 rounded-full bg-muted/50 text-muted-foreground border border-border/50 flex-shrink-0">
          <SlidersHorizontal className="w-4 h-4" />
        </div>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`
              flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors border
              ${activeCategory === category 
                ? 'bg-foreground text-background border-foreground' 
                : 'bg-background text-foreground border-border hover:bg-muted/50'
              }
            `}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-r-2 border-blue-600"></div>
          <p className="text-sm text-muted-foreground animate-pulse">{t('store', 'loading')}</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center px-4 bg-muted/20 rounded-3xl border border-dashed border-border/50">
          <PackageOpen className="w-16 h-16 text-muted-foreground/50 mb-4" />
          <h3 className="text-lg font-semibold text-foreground">{t('store', 'noProducts')}</h3>
          <p className="text-sm text-muted-foreground max-w-sm mt-1">
            {t('store', 'noProductsDesc')}
          </p>
          <button 
            onClick={() => {setSearchQuery(''); setActiveCategory('All'); setPage(1);}}
            className="mt-6 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            {t('store', 'clearFilters')}
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
          {filteredProducts.map((product) => (
            <Card key={product._id} className="flex flex-col overflow-hidden border border-border/60 shadow-sm hover:shadow-md transition-all duration-300 group bg-card rounded-2xl">
              
              {/* Image Container (Frameless) */}
              <div className="relative h-48 sm:h-56 overflow-hidden flex items-center justify-center p-1 md:p-2 mt-2">
                {product.imageUrls && product.imageUrls[0] ? (
                  <img 
                    src={product.imageUrls[0]} 
                    alt={product.name} 
                    className="w-full h-full object-contain drop-shadow-sm group-hover:scale-110 transition-transform duration-500 ease-out"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground/40">
                    <PackageOpen className="w-8 h-8 mb-2" />
                    <span className="text-[10px] font-medium uppercase tracking-wider">{t('store', 'noImage')}</span>
                  </div>
                )}
                
                {/* Condition Badge */}
                <div className="absolute top-0 left-0">
                  <Badge className="bg-background/95 text-foreground shadow-sm text-[9px] sm:text-[10px] font-bold border-none px-2.5 py-0.5 rounded-tl-none rounded-tr-xl rounded-br-xl rounded-bl-none border-r border-b border-border/50">
                    {product.condition || 'Used'}
                  </Badge>
                </div>
              </div>
              
              {/* Details Container */}
              <div className="p-3 flex-grow flex flex-col gap-1">
                <div className="flex justify-between items-start">
                  <div className="text-[9px] sm:text-[10px] text-muted-foreground font-bold tracking-wider uppercase">
                    {product.brand || product.category || 'Device'}
                  </div>
                </div>
                
                <h3 className="text-xs sm:text-sm font-bold leading-tight line-clamp-2 text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {product.name}
                </h3>

                {product.description && (
                  <p className="text-[10px] sm:text-xs text-muted-foreground line-clamp-2 mt-0.5 leading-snug">
                    {product.description}
                  </p>
                )}
                
                <div className="mt-auto pt-2 flex items-end justify-between">
                  <div className="text-base sm:text-lg font-black text-blue-600 dark:text-blue-400 leading-none">
                    ₹{product.price ? product.price.toLocaleString('en-IN') : 'N/A'}
                  </div>
                  
                  {product.stock > 0 ? (
                    <div className="text-[9px] sm:text-[10px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-900/20 px-1.5 py-0.5 rounded-md">
                      {product.stock} {t('store', 'left')}
                    </div>
                  ) : (
                    <div className="text-[9px] sm:text-[10px] text-red-600 dark:text-red-400 font-bold bg-red-50 dark:bg-red-900/20 px-1.5 py-0.5 rounded-md">
                      {t('store', 'outOfStock')}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Button */}
              <div className="p-3 pt-0 mt-1">
                <a 
                  href={`https://wa.me/${config.whatsappNumber}?text=Hi, I'm interested in buying:%0A%0A*${encodeURIComponent(product.name)}*%0A💰 Price: ₹${product.price ? product.price.toLocaleString('en-IN') : 'N/A'}%0A🏷️ Condition: ${product.condition || 'Used'}%0A%0AIs this available?`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2 bg-foreground text-background hover:bg-foreground/90 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-transform active:scale-95 shadow-sm"
                >
                  {t('store', 'buyWhatsApp')}
                </a>
              </div>
            </Card>
          ))}
        </div>

        {/* Pagination Controls */}
        {pagination && pagination.pages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-10">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-4 py-2 border border-border/60 rounded-xl disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm text-muted-foreground font-medium">
              Page {page} of {pagination.pages}
            </span>
            <button
              disabled={page === pagination.pages}
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 border border-border/60 rounded-xl disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
        </>
      )}
    </div>
  );
};

export default Store;
