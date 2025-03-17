
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchProducts } from '@/utils/mockData';
import { Product } from '@/types';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import { Search as SearchIcon, FilterX } from 'lucide-react';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (query) {
      setIsLoading(true);
      // Search for products
      const results = searchProducts(query);
      
      // Add a small delay to show loading animation
      setTimeout(() => {
        setProducts(results);
        setIsLoading(false);
      }, 500);
    } else {
      setProducts([]);
      setIsLoading(false);
    }
  }, [query]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <section>
          <h1 className="text-2xl font-semibold mb-6 fade-in">
            {products.length > 0 
              ? `Search results for "${query}"`
              : `No results found for "${query}"`
            }
          </h1>
          
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm scale-in">
              <FilterX className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
              <h2 className="text-xl font-semibold mb-2">We couldn't find any products matching your search</h2>
              <p className="text-muted-foreground mb-4 max-w-lg mx-auto">
                Try using different keywords or browse our categories.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
                <a href="/" className="btn-hover-effect inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90">
                  <SearchIcon className="h-4 w-4 mr-2" />
                  Browse All Products
                </a>
                <a href="/deals" className="btn-hover-effect inline-flex items-center justify-center px-4 py-2 border border-primary text-primary rounded-md shadow-sm text-sm font-medium bg-white hover:bg-primary/5">
                  View Today's Deals
                </a>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Search;
