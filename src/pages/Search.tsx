
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Product } from '@/types';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import { Search as SearchIcon, FilterX } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { useNotifications } from '@/contexts/NotificationContext';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { addNotification } = useNotifications();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      
      try {
        let productQuery = supabase
          .from('products')
          .select(`
            id,
            name,
            description,
            category,
            image_url,
            brand,
            model,
            rating,
            review_count,
            created_at,
            prices(
              id,
              price,
              currency,
              product_link,
              last_updated
            )
          `);
        
        // Apply search filter if query exists
        if (query) {
          productQuery = productQuery.or(
            `name.ilike.%${query}%,description.ilike.%${query}%,brand.ilike.%${query}%,category.ilike.%${query}%,model.ilike.%${query}%`
          );
        }

        const { data, error } = await productQuery;

        if (error) {
          console.error('Error fetching products:', error);
          toast({
            variant: "destructive",
            title: "Failed to load products",
            description: error.message
          });
          addNotification({
            title: "Search Error",
            message: "Failed to load products. Please try again.",
            type: "error"
          });
          setProducts([]);
        } else if (data) {
          // Transform the Supabase data to match our Product type
          const transformedProducts: Product[] = data.map(item => ({
            id: item.id.toString(),
            name: item.name,
            description: item.description || '',
            category: item.category || '',
            imageUrl: item.image_url || '',
            brand: item.brand || '',
            model: item.model || '',
            prices: (item.prices || []).map(price => ({
              id: price.id.toString(),
              storeId: 'store1', // We'll need to map this properly later
              price: price.price,
              currency: price.currency || 'USD',
              priceDate: price.last_updated || new Date().toISOString(),
              url: price.product_link
            })),
            dateAdded: item.created_at || new Date().toISOString(),
            ...(item.rating && { rating: item.rating }),
            ...(item.review_count && { reviewCount: item.review_count })
          }));
          
          setProducts(transformedProducts);
          
          if(query && transformedProducts.length === 0) {
            addNotification({
              title: "No Results",
              message: `We couldn't find any products matching "${query}"`,
              type: "info"
            });
          } else if(query && transformedProducts.length > 0) {
            addNotification({
              title: "Search Results",
              message: `Found ${transformedProducts.length} products matching "${query}"`,
              type: "success"
            });
          }
        }
      } catch (error) {
        console.error('Error in fetchProducts:', error);
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description: "Failed to load products. Please try again."
        });
        addNotification({
          title: "Error",
          message: "Something went wrong with your search. Please try again.",
          type: "error"
        });
        setProducts([]);
      } finally {
        // Add a small delay to show loading animation
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    };

    fetchProducts();
  }, [query, toast, addNotification]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <section>
          <h1 className="text-2xl font-semibold mb-6 fade-in">
            {query ? (
              products.length > 0 
                ? `Search results for "${query}"`
                : `No results found for "${query}"`
            ) : 'All Products'}
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
                <button 
                  onClick={() => navigate('/')}
                  className="btn-hover-effect inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90"
                >
                  <SearchIcon className="h-4 w-4 mr-2" />
                  Browse All Products
                </button>
                <button
                  onClick={() => navigate('/deals')}
                  className="btn-hover-effect inline-flex items-center justify-center px-4 py-2 border border-primary text-primary rounded-md shadow-sm text-sm font-medium bg-white hover:bg-primary/5"
                >
                  View Today's Deals
                </button>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Search;
