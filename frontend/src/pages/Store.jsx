import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { productService } from '../services/productService';
import { Skeleton } from "@/components/ui/skeleton";
import { Search, SlidersHorizontal, PackageOpen } from "lucide-react";
import { useLanguage } from '../components/LanguageProvider';
import ProductCard from '../components/store/ProductCard';

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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex flex-col overflow-hidden shadow-sm bg-card rounded-[2rem] h-[340px]">
              <Skeleton className="w-full h-48 sm:h-56 rounded-none" />
              <div className="p-5 flex-grow flex flex-col gap-2">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-full mt-1" />
                <div className="mt-auto pt-2 flex items-end justify-between">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-4 w-12" />
                </div>
              </div>
            </div>
          ))}
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
            <ProductCard key={product._id} product={product} />
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
