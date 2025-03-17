
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchProducts } from '@/utils/mockData';
import { Product } from '@/types';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';

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
      setProducts(results);
      setIsLoading(false);
    } else {
      setProducts([]);
      setIsLoading(false);
    }
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <section>
          <h1 className="text-2xl font-semibold mb-4">
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
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                We couldn't find any products matching your search.
              </p>
              <p className="text-muted-foreground">
                Try using different keywords or browse our categories.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Search;
